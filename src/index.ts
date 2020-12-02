import fs from "fs";
import path from "path";
import express from "express";
import morgan from "morgan";
import * as csv from "fast-csv";
import JSON5 from "json5";
import { CastMember, KEVIN_BACON_ID, ID } from "./model";
import { BFS } from "./bfs";

// Database not required, storing in memory.
// file parsing currently takes ~35s. If this initialization time becomes an issue,
// then the mext simplest solution is to persist to disk in JSON format.
// another solution would be to store as hash maps in redis.
const idMap: Map<string, ID> = new Map();
const adjacencyMap: Map<ID, Set<ID>> = new Map();

console.time("load data");
fs.createReadStream(path.join(__dirname, "../credits.csv"))
  .pipe(csv.parse({ headers: true }))
  .on("error", (error) => console.error(error))
  .on("data", (row) => {
    try {
      // JSON stored in csv columns is invalid, changing None to null and using JSON5 lib instead of standard JSON.parse
      const castStr = row.cast.replace(/None/g, "null");
      const cast: CastMember[] = JSON5.parse(castStr);

      // generate adjacency lists and name-id map
      cast.forEach((actor) => {
        const adjacencySet = adjacencyMap.get(actor.id) || new Set();
        cast.forEach((actor) => adjacencySet.add(actor.id));
        adjacencySet.delete(actor.id);
        adjacencyMap.set(actor.id, adjacencySet);
        idMap.set(actor.name, actor.id);
      });
    } catch (error) {
      console.error(error.message);
    }
  })
  .on("end", () => {
    console.timeEnd("load data");
    console.log("# of actors: ", adjacencyMap.size);
    console.time("compute bfs");
    const distanceMap = BFS(adjacencyMap, KEVIN_BACON_ID);
    console.log("# of actors with bacon number: ", distanceMap.size);
    console.timeEnd("compute bfs");

    const port = process.env.PORT || 8000;
    const app = express();

    // Logging middleware
    app.use(morgan("tiny"));

    app.get("/", (req, res) => {
      const actor_name = req.query.actor_name;
      // invalid request
      if (typeof actor_name !== "string") {
        res.status(400).send();
        return;
      }

      const id = idMap.get(actor_name);
      // not found
      if (!id) {
        res.status(404).send();
        return;
      }

      const distance = distanceMap.get(id);
      res
        .status(200)
        .send({ bacon_number: typeof distance === "number" ? distance : null });
    });

    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  });
