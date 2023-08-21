# api-server-starter

# Client-Server Movie Database

This project is a Node.js server implementing a movie database. It uses MongoDB and Mongoose for database operations, and provides endpoints for creating, reading, updating, and deleting both movies and actors.

## Server Side

- `server/`
  - `DB/`
    - `mongoose.js`: This file contains the Mongoose setup, which is used to connect to the MongoDB database.
  - `models/`
    - `actor.js`: This file defines the schema for the Actor model.
    - `movie.js`: This file defines the schema for the Movie model.
  - `routes/`
    - `movies.js`: This file contains the logic for the server's endpoints related to movies.
    - `routes.js`: This file combines all the routes and exports them for use in the main server file.

## Setting Up

First, ensure that you have Node.js and MongoDB installed on your system.

Next, clone the repository and install its dependencies:

`git clone <repository_url>`
`cd <project_folder>`
`npm install`
Next, run the server:
`npm start`

## API Endpoints

`GET /movies/:id`: Fetch a specific movie by its ID.
`GET /movies`: Fetch all movies.
`POST /movies`: Create a new movie.
`PUT /movies/:id`: Update a specific movie by its ID.
`PUT /movies/:id/actor/:name`: Add an actor to a specific movie.
`DELETE /movies/:id/actor/:name`: Remove an actor from a specific movie.
`DELETE /movies/:id`: Delete a specific movie.
`GET /actors`: Fetch all actors.
`POST /actor/:name`: Add a new actor.

## Client Side

The client side of our application is designed to interact with the server-side endpoints, providing a user-friendly interface for our Movie-Actor Database API. The client side application is implemented using [insert your chosen frontend technology here], and includes the following key components:
