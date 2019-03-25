const path = require("path");
const express = require("express");
const hbs = require("hbs");
const friends = require("../public/js/friends");

const PORT = process.env.PORT || 8080;

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

app.get("", (req, res) => {
  res.render("index", {
    title: "Friend Finder",
    name: "Matt Faubel"
  });
});

app.post("/api/friends", (req, res) => {
  console.log(req.body.name);
  // console.log(res);
  // connection.query(
  //   "INSERT INTO friends (username, q1, q2, q3) VALUES (?, ?, ?, ?)",
  //   [req.body.name, req.body.q1, req.body.q2, req.body.q3],
  //   function(err, result) {
  //     if (err) {
  //       console.log(err);
  //     }
  //   }
  // );

  var username = req.body.name;
  var userAnswers = req.body.answers;

  var matchName = "";
  var matchPhoto = "";

  var totalDifference = Number.POSITIVE_INFINITY;

  friends.forEach(el => {
    var localDifference = 0;
    for (var i = 0; i < userAnswers.length; i++) {
      localDifference += Math.abs(el.scores[i] - userAnswers[i]);
    }
    if (localDifference < totalDifference) {
      totalDifference = localDifference;
      matchName = el.name;
      matchPhoto = el.photo;
      var friendIndex = i;
      console.log(matchName);
    }
  });
  res.json({ status: "OK", matchName: matchName, matchPhoto: matchPhoto });
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
