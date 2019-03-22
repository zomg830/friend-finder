console.log("Client side javascript file is loaded");

var user = {
  name: null
};

var answers = [];
var counter = 0;

var questions = [
  {
    id: 0,
    num: "Question 1",
    content: "I like noodles"
  },
  {
    id: 1,
    num: "Question 2",
    content: "I like peas"
  },
  {
    id: 2,
    num: "Question 3",
    content: "I like tomatoes"
  },
  {
    id: 3,
    num: "Let's find some friends!",
    content: "Click the button to submit!"
  }
];

$("#answerButton").on("click", e => {
  if (counter === questions.length - 2) {
    $("#answerButton").hide();
    $("#question").hide();
    $("#submitButton").show();
    $("#nameInput").show();
  }
  answers.push(parseInt($("#question").val()));
  counter++;
  $("#question-num").html(questions[counter].num);
  $("#question-content").html(questions[counter].content);
});

$("#submitButton").on("click", e => {
  var userName = $("#nameInput").val();
  var userData = {
    name: userName,
    q1: answers[0],
    q2: answers[1],
    q3: answers[2]
  };
  console.log(userData);
  $.ajax("/api/friends", {
    type: "POST",
    data: userData
  }).then(function() {
    console.log("created new user");
    // Reload the page to get the updated list
    location.reload();
  });
});
