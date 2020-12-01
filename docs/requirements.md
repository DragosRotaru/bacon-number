# Requirements

- Create a basic **API endpoint** that returns the **[Bacon number](https://en.wikipedia.org/wiki/Six_Degrees_of_Kevin_Bacon)** of any actor in [**The Movie Dataset**](https://www.kaggle.com/rounakbanik/the-movies-dataset).
- Write this assignment in **a language of your choice**.
- **Download** the [dataset](https://www.kaggle.com/rounakbanik/the-movies-dataset)
- **Preprocess** and manipulate the data as needed.
- **Store** the dataset in some kind of data store. This could be a collection of flat files or any database of your choice.
- Create a service that:

  1. exposes an **HTTP API endpoint** which, given an actor, returns **their degrees of separation from Kevin Bacon** (the Bacon number).
  2. exposes an **HTTP API endpoint** which accepts **information about new movies,** eg:

  ```json
  {
    "movie_name": ["actor one", "actor two"]
  }
  ```
