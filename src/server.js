const path = require("path");
const express = require("express");
const hbs = require("hbs");

const PORT = 8080;

const app = express();

const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(publicDirectoryPath));

const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "rootroot",
  database: "friendsDB"
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});

app.get("", (req, res) => {
  res.render("index", {
    title: "Friend Finder",
    name: "Matt Faubel"
  });
});

app.post("/api/friends", (req, res) => {
  console.log(req.body.name);
  // console.log(res);
  connection.query(
    "INSERT INTO friends (username, q1, q2, q3) VALUES (?, ?, ?, ?)",
    [req.body.name, req.body.q1, req.body.q2, req.body.q3],
    function(err, result) {
      if (err) {
        console.log(err);
      }
    }
  );
});

app.get("/api/friends", (req, res) => {
  connection.query("SELECT * FROM friends", function(err, result) {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Matt Faubel"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Matt Faubel",
    helpText: "This is some helpful text"
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Matt Faubel",
    errorMessage: "404 error, page not found"
  });
});

app.listen(8080, () => {
  console.log(`Server is up on Port ${PORT}`);
});
