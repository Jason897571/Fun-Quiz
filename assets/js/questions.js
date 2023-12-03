let start_btn = document.querySelector("#start_btn");
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
var time_left = 100;
var timer;


start_btn.addEventListener("click", function switch_to_quiz(){
    start_page_block.classList.replace("visible", "hidden")
    quiz_page_block.classList.replace("hidden", "visible")
    start_timer();
    display_question()
});



// timer
function start_timer(){
    timer = setInterval(function(){

        time_element.innerHTML = time_left;

        time_left--;
        
        if(time_left < 0){
            clearInterval(timer);
            quiz_page_block.classList.replace("visible","hidden")
            result_page_block.classList.replace("hidden", "visible")
        }
    }, 1000);
}


function create_question(question_text,options) {
    /* assign value to question text */
    questions_text.textContent = question_text;

    /* assign value to options text */
    option_1.textContent = "1." + options[0];
    option_2.textContent = "2." + options[1]; 
    option_3.textContent = "3." + options[2]; 
    option_4.textContent = "4." + options[3];

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
        
        // if the answer is correct
        if(event.target.textContent == correct_answer){
            
            // update accumulated number of correct questions
            right_number ++;
            right_number_element.textContent = right_number;
            
            //update total score
            score =  right_number * 10;
            score_element.textContent = score;

            // show result
            result_element.textContent = " Correct!";
            result_element.style.color = "green";
            
            
        }
        else{//if answer is incorrect
            // update accumulated number of incorrect questions
            wrong_number ++;
            wrong_number_element.textContent = wrong_number;

            // show result
            result_element.textContent = " Wrong!";
            result_element.style.color = "red";

            // decrease the time due to wrong answer
            if(time_left > time_penality){
                time_left -= time_penality;
            }
            else{
                time_left = 0;
                
            }
            
        }
        // remove the eventlistener since there will be another eventlisten to be added to the next question
        question_options_holder.removeEventListener("click", handle_option_click);

        question_index ++;

        // questions are enough questions_data["multiple_question"].length
        if(question_index < 10){
            display_question();

        }
        else{// run out of questions
            
            quiz_page_block.classList.replace("visible","hidden");
            result_page_block.classList.replace("hidden", "visible");
            clearInterval(timer);
        }

    })

}


submit_btn.addEventListener("click", function(event){
    event.preventDefault();
    var initials = initials_holder.value.trim()
    result_page_block.classList.replace("visible","hidden");
    score_page_block.classList.replace("hidden", "visible");

    const li = document.createElement("li");
    li.textContent = `1. ${initials} - ${score}`;
    score_list.appendChild(li);

})

go_back_btn.addEventListener("click", function(){
    location.reload();
})

clear_btn.addEventListener("click", function(){
    score_list.classList.replace("visible","hidden");
})



/* check if local storage has questions data */
if(localStorage.getItem("question_data") == null){
    get_json_data();
}












