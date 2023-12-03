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
var question_index = 0;
var right_number = 0;
var wrong_number = 0;
var score = 0;
var time_left = 100;


// timer
function start_timer(){
    var timer = setInterval(function(){

        time_element.innerHTML = time_left;

        time_left--;
        
        if(time_left < 0){
            clearInterval(timer);
            jump_to_finish_page();
        }
    }, 1000);
}



function jump_to_finish_page(){
    window.location.href = "finish_page.html";
}

function create_question(question_text,options) {
    /* assign value to question text */
    questions_text.textContent = question_text;

    /* assign value to options text */
    option_1.textContent = options[0];
    option_2.textContent = options[1]; 
    option_3.textContent = options[2]; 
    option_4.textContent = options[3];

}

/* Json reader and store data into localStorage */
var get_json_data = function(){
    const quesiton_json_url = "./assets/json/question.json"

    fetch(quesiton_json_url)
    .then(response => response.json())
    .then(data => {        
        // Use the data from the JSON file
        localStorage.setItem("question_data", JSON.stringify(data));

    })
}


var display_question =function(){

    let questions_data = localStorage.getItem("question_data");
    questions_data = JSON.parse(questions_data);
    var single_question = questions_data["multiple_question"][question_index]
    var question_text = single_question["question"];
    var options = single_question["options"];
    var correct_answer = single_question["correctAnswer"];


    create_question(question_text, options, correct_answer);

    question_options_holder.addEventListener("click", function handle_option_click(event){
        

        if(event.target.textContent == correct_answer){
            console.log("correct answer")

            // update accumulated number of corrected questions
            right_number ++;
            right_number_element.textContent = right_number;
            
            //update total score
            score =  right_number * 10;
            score_element.textContent = score;

            // show result
            result_element.textContent = " Correct!";
            result_element.style.color = "green";
            
            
        }
        else{
            console.log("wrong answer")
            wrong_number ++;
            wrong_number_element.textContent = wrong_number;

            // show result
            result_element.textContent = " Wrong!";
            result_element.style.color = "red";

            // decrease the time due to wrong answer
            if(time_left > 5){
                time_left -= 5;
            }
            else{
                time_left = 0;
                console.log("end of questions")

            }

            
        }
        // remove the eventlistener since there will be another eventlisten to be added to the next question
        question_options_holder.removeEventListener("click", handle_option_click);

        question_index ++;

        if(question_index < questions_data["multiple_question"].length){
            display_question();

        }
        else{
            console.log("end of questions")
        }

    })

}

start_timer()

/* check if local storage has questions data */
if(localStorage.getItem("question_data") == null){
    get_json_data();
}


display_question()









