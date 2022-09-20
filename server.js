const express = require("express");
const PORT = 3001;
const mysql = require("mysql2");

const app = express();

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // MySQL password
    password: "",
    database: "movie_db",
  },
  console.log(`Connected to the movie_db database.`)
);

app.get("/api/movies", (req, res) => {
  db.query("SELECT * from movie", function (err, results) {
    res.json(results);
  });
});

app.post("/api/add-movie", (req, res) => {
  const params = [req.body.id, req.body.movie_name];
  db.query(
    "INSERT INTO movie (id, movie_name) VALUES (?, ?)",
    params,
    function (err, results) {
      if (results) {
        res.send("Movie added successfully");
      } else {
        res.send("Error while adding the movie");
      }
    }
  );
});

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
