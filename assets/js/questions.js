let header_block = document.querySelector(".header");
let start_btn = document.querySelector("#start_btn");
let view_score = document.querySelector(".view_score");
let start_page_block = document.querySelector(".start_page");
let quiz_page_block = document.querySelector(".quiz_page");
let result_page_block = document.querySelector(".result_page");
let questions_text = document.querySelector(".question_text");
let option_1 = document.querySelector(".option_1");
let option_2 = document.querySelector(".option_2");
let option_3 = document.querySelector(".option_3");
let option_4 = document.querySelector(".option_4");
let time_element = document.getElementById("timer_number");
let right_number_element = document.querySelector("#correct");
let wrong_number_element = document.querySelector("#wrong");
let question_options_holder = document.querySelector(".question_options_holder");
let score_element = document.querySelector("#total_score");
let result_element = document.querySelector("#result");
let final_score_element = document.querySelector("#final_score");
let submit_btn = document.querySelector("#submit");
let initials_holder = document.querySelector("#initials");
let score_list = document.querySelector(".score_list");
let score_page_block = document.querySelector(".score_page");
let go_back_btn = document.querySelector("#go_back");
let clear_btn = document.querySelector("#clear");
const time_penality = 10;
var question_index = 0;
var right_number = 0;
var wrong_number = 0;
var score = 0;
var time_left = 300;
var timer;
const data = { 
  "multiple_question":[
    {
      "question": "What is the purpose of the 'alt' attribute in the HTML 'img' tag?",
      "options": ["Define alternative text for an image", "Align the image", "Set the image source", "Change the image size"],
      "correctAnswer": "Define alternative text for an image"
    },
    {
      "question": "In CSS, what does the 'margin' property control?",
      "options": ["Text spacing", "Border size", "Outer spacing around an element", "Inner spacing within an element"],
      "correctAnswer": "Outer spacing around an element"
    },
    {
      "question": "What does the 'NaN' value represent in JavaScript?",
      "options": ["Not a Number", "Negative And Null", "No Assignment", "Newly Assigned Number"],
      "correctAnswer": "Not a Number"
    },
    {
      "question": "Which HTML tag is used to create an unordered list?",
      "options": ["<ol>", "<li>", "<ul>", "<dl>"],
      "correctAnswer": "<ul>"
    },
    {
      "question": "What is the purpose of the CSS 'box-sizing' property?",
      "options": ["Adjust the size of the element's content box", "Define the element's display type", "Set the element's border color", "Control the element's visibility"],
      "correctAnswer": "Adjust the size of the element's content box"
    },
    {
      "question": "In JavaScript, what is the 'typeof' operator used for?",
      "options": ["Check the type of a variable", "Create a new variable", "Concatenate strings", "Perform arithmetic operations"],
      "correctAnswer": "Check the type of a variable"
    },
    {
      "question": "Which HTML tag is used to create a hyperlink?",
      "options": ["<a>", "<link>", "<href>", "<url>"],
      "correctAnswer": "<a>"
    },
    {
      "question": "What does the CSS 'position: absolute' property do?",
      "options": ["Align the element to the left", "Make the element invisible", "Position the element relative to its nearest positioned ancestor", "Float the element to the right"],
      "correctAnswer": "Position the element relative to its nearest positioned ancestor"
    },
    {
      "question": "In JavaScript, what is the purpose of the 'for...in' loop?",
      "options": ["Iterate over the properties of an object", "Create an infinite loop", "Iterate over the items of an array", "Perform a conditional loop"],
      "correctAnswer": "Iterate over the properties of an object"
    },
    {
      "question": "Which CSS property is used to set the background color of an element?",
      "options": ["bgcolor", "background-color", "color-background", "element-color"],
      "correctAnswer": "background-color"
    },
    {
      "question": "What does the HTML acronym 'DOCTYPE' stand for?",
      "options": ["Document Type", "Document Text", "Declaration of Type", "Document Template"],
      "correctAnswer": "Document Type"
    },
    {
      "question": "In CSS, what is the 'float' property used for?",
      "options": ["Change the font size", "Align text to the right", "Create a floating element", "Set the margin size"],
      "correctAnswer": "Create a floating element"
    },
    {
      "question": "What is the purpose of the JavaScript 'addEventListener' method?",
      "options": ["Change the document title", "Attach an event handler to an element", "Create a new element", "Define a variable"],
      "correctAnswer": "Attach an event handler to an element"
    },
    {
      "question": "Which HTML tag is used to define the structure of an HTML document?",
      "options": ["<head>", "<body>", "<structure>", "<html>"],
      "correctAnswer": "<html>"
    },
    {
      "question": "What does the CSS 'z-index' property control?",
      "options": ["Text alignment", "Layering of positioned elements", "Font size", "Margin size"],
      "correctAnswer": "Layering of positioned elements"
    },
    {
      "question": "In JavaScript, what is the purpose of the 'parseInt' function?",
      "options": ["Convert a string to an integer", "Create a new variable", "Round a floating-point number", "Check if a value is not a number"],
      "correctAnswer": "Convert a string to an integer"
    },
    {
      "question": "Which HTML tag is used to create a table?",
      "options": ["<table>", "<tr>", "<td>", "<th>"],
      "correctAnswer": "<table>"
    },
    {
      "question": "What does the CSS 'opacity' property control?",
      "options": ["Element visibility", "Text color", "Background color", "Element size"],
      "correctAnswer": "Element visibility"
    },
    {
      "question": "In JavaScript, what is the purpose of the 'localStorage' object?",
      "options": ["Store data locally in the user's browser", "Access server-side data", "Define global variables", "Perform mathematical operations"],
      "correctAnswer": "Store data locally in the user's browser"
    },
    {
      "question": "What does HTML stand for?",
      "options": ["Hyper Text Markup Language", "Highly Typed Modeling Language", "Hyperlink and Text Markup Language", "High Tech Modern Language"],
      "correctAnswer": "Hyper Text Markup Language"
    },
    {
      "question": "In CSS, what property is used to change the color of text?",
      "options": ["color", "text-color", "font-color", "text-style"],
      "correctAnswer": "color"
    },
    {
      "question": "What does the JavaScript 'document.getElementById()' function do?",
      "options": ["Returns the HTML content of an element", "Sets the value of an input element", "Finds an HTML element with a specified ID", "Creates a new HTML element"],
      "correctAnswer": "Finds an HTML element with a specified ID"
    },
    {
      "question": "Which HTML tag is used to create an ordered list?",
      "options": ["<ul>", "<li>", "<ol>", "<dl>"],
      "correctAnswer": "<ol>"
    },
    {
      "question": "What is the purpose of the CSS 'margin' property?",
      "options": ["Set the outer spacing around an element", "Define the font size of an element", "Change the text color", "Control the visibility of an element"],
      "correctAnswer": "Set the outer spacing around an element"
    },
    {
      "question": "In JavaScript, what does the 'var' keyword do?",
      "options": ["Declare a variable", "Create a loop", "Define a function", "Perform arithmetic operations"],
      "correctAnswer": "Declare a variable"
    },
    {
      "question": "Which HTML tag is used to create a hyperlink?",
      "options": ["<a>", "<link>", "<href>", "<url>"],
      "correctAnswer": "<a>"
    },
    {
      "question": "What does the CSS 'position: relative' property do?",
      "options": ["Align the element to the left", "Make the element invisible", "Position the element relative to its normal position", "Float the element to the right"],
      "correctAnswer": "Position the element relative to its normal position"
    },
    {
      "question": "In JavaScript, what is the purpose of the 'if...else' statement?",
      "options": ["Declare a function", "Create a loop", "Perform conditional execution", "Define a variable"],
      "correctAnswer": "Perform conditional execution"
    },
    {
      "question": "Which CSS property is used to set the background color of an element?",
      "options": ["bgcolor", "background-color", "color-background", "element-color"],
      "correctAnswer": "background-color"
    }
  ]
}

view_score.addEventListener("click", function show_score () {
  
  //in the start page
  if (start_page_block.classList.contains("visible")) {
    start_page_block.classList.replace("visible", "hidden");
    score_page_block.classList.replace("hidden", "visible");
    show_score_result();
    removeEventListener("click",show_score)
  }


  // during the quiz
  if (quiz_page_block.classList.contains("visible") || result_page_block.classList.contains("visible")) {
    /* if the initial is empty, poping up warning */
    var is_empty = confirm(
      "If you click 'Yes', you will lose all your quiz result. Are you sure you want to leave the quiz?"
    );

    // initial is not empty
    if (is_empty) {
      start_page_block.classList.replace("visible", "hidden");
      quiz_page_block.classList.replace("visible", "hidden");
      result_page_block.classList.replace("visible", "hidden");
      header_block.classList.replace("visible", "hidden");
      score_page_block.classList.replace("hidden", "visible");
      show_score_result();
      removeEventListener("click",show_score)
    } else {
      return;
    }
  }
});


// switch page from start to quiz
var switch_to_quiz = function(){
  start_page_block.classList.replace("visible", "hidden");
  quiz_page_block.classList.replace("hidden", "visible");
  start_timer();
  display_question();
  removeEventListener("click",switch_to_quiz)
}

/* start button */
start_btn.addEventListener("click", switch_to_quiz);

// timer
function start_timer() {
  timer = setInterval(function () {
    let seconds = time_left % 60;
    let mins = Math.floor(time_left / 60);

    time_element.innerHTML = mins + ":" + seconds;

    time_left--;

    if (time_left < 60) {
      time_element.style.color = "red";
    }

    // when the time is up, show the result page
    if (time_left < 0) {
      clearInterval(timer);
      quiz_page_block.classList.replace("visible", "hidden");
      result_page_block.classList.replace("hidden", "visible");
    }
  }, 1000);
}

/* create each quesiton and answers */
function create_question(question_text, options) {
  /* assign value to question text */
  questions_text.textContent = question_text;

  /* assign value to options text */
  option_1.textContent = options[0];
  option_2.textContent = options[1];
  option_3.textContent = options[2];
  option_4.textContent = options[3];
}


var display_question = function () {
  let questions_data = localStorage.getItem("question_data");
  questions_data = JSON.parse(questions_data);
  let single_question = questions_data["multiple_question"][question_index];
  let question_text = single_question["question"];
  let options = single_question["options"];
  let correct_answer = single_question["correctAnswer"];

  // pass data to create questions and options
  create_question(question_text, options);

  question_options_holder.addEventListener(
    "click",
    function handle_option_click(event) {
      // if the answer is correct
      if (event.target.textContent == correct_answer) {
        // update accumulated number of correct questions
        right_number++;
        right_number_element.textContent = right_number;

        //update total score
        score = right_number * 10;
        score_element.textContent = score;

        // show result
        result_element.textContent = " Correct!";
        result_element.style.color = "green";
      } else {
        //if answer is incorrect
        // update accumulated number of incorrect questions
        wrong_number++;
        wrong_number_element.textContent = wrong_number;

        // show result
        result_element.textContent = " Wrong!";
        result_element.style.color = "red";

        // decrease the time due to wrong answer
        if (time_left > time_penality) {
          time_left -= time_penality;
        } else {
          time_left = 0;
        }
      }
      // remove the eventlistener since there will be another eventlisten to be added to the next question
      question_options_holder.removeEventListener("click", handle_option_click);

      question_index++;

      // questions are enough
      if (question_index < questions_data["multiple_question"].length) {
        display_question();
      } else {
        // run out of questions

        quiz_page_block.classList.replace("visible", "hidden");
        result_page_block.classList.replace("hidden", "visible");
        clearInterval(timer);
      }
    }
  );
};

/* show the score for the current quiz */
show_score_result = function () {
  var score_rank = JSON.parse(localStorage.getItem("high_grade"));
  // show final score
  console.log(score);
  final_score_element.textContent = score;
  for (var i = 0; i < score_rank.length; i++) {
    const li = document.createElement("li");
    li.textContent =
      `${i + 1}` + ". " + score_rank[i].initials + " - " + score_rank[i].score;
    score_list.appendChild(li);
  }
};

// submit initals and score for final rank
var submit_score = function (event) {
  event.preventDefault();

  if (initials_holder.value == "") {
    confirm("You initial cannot be empty!");
    return;
  } else {
    var initials = initials_holder.value.trim();
    result_page_block.classList.replace("visible", "hidden");
    score_page_block.classList.replace("hidden", "visible");
    header_block.classList.replace("visible", "hidden");

    var new_initials_score = { initials: initials, score: score };
    // get local data

    var exist_data = localStorage.getItem("high_grade");

    if (exist_data == null) {
      localStorage.setItem("high_grade", JSON.stringify([new_initials_score]));
    } else {
      var data_array = JSON.parse(exist_data);
      data_array.push(new_initials_score);
      localStorage.setItem("high_grade", JSON.stringify(data_array));
    }

    show_score_result();
    removeEventListener("click", submit_score);
  }
}


submit_btn.addEventListener("click", submit_score);

// go back to main page
go_back_btn.addEventListener("click", function go_back () {
  location.reload();
  removeEventListener("click", go_back);
});

// clear all the scores
clear_btn.addEventListener("click", function clear_data () {
  score_list.classList.replace("visible", "hidden");
  localStorage.clear();
  removeEventListener("click", clear_data);
});

//import questions data to local storage
localStorage.setItem("question_data", JSON.stringify(data));
