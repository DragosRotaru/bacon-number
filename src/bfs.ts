/**
 * Breadth-First Search  O(|E|+|V|)
 * https://en.wikipedia.org/wiki/Breadth-first_search
 */
export const BFS = (graph: Map<number, Set<number>>, start: number) => {
  if (!graph.get(start))
    throw new Error("start vertex must be in graph Adjacency Map");
  const queue = [start];
  const visited = new Set<number>([start]);
  const distances = new Map<number, number>([[start, 0]]);

  while (queue.length > 0) {
    const vertex = queue.shift() as number;
    const adjacencyList = [...(graph.get(vertex) as Set<number>)];
    for (var i = 1; i < adjacencyList.length; i++) {
      const neighbor = adjacencyList[i];
      if (!visited.has(neighbor)) {
        distances.set(neighbor, (distances.get(vertex) as number) + 1);
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
    // 5233.477ms using filter/forEach vs 5174.198ms using for loop with V = 198,930
    /* adjacencyList
      .filter((adjacent) => !visited.has(adjacent))
      .forEach((adjacent) => {
        distances.set(adjacent, (distances.get(vertex) as number) + 1);
        visited.add(adjacent);
        queue.push(adjacent);
      }); */
  }
  return distances;
};
