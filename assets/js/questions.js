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



view_score.addEventListener("click", function (){
    /* if the initial is empty, poping up warning */
    if(quiz_page_block.classList.contains("visible")){
        var is_empty = confirm("If you click 'Yes', you will lose all your quiz result. Are you sure you want to leave the quiz?");

        // initial is not empty
        if(is_empty){
            start_page_block.classList.replace("visible", "hidden")
            quiz_page_block.classList.replace("visible","hidden");
            result_page_block.classList.replace("visible","hidden");
            header_block.classList.replace("visible","hidden");
            score_page_block.classList.replace("hidden", "visible");
            show_score_result();
        }
        else{
            return
        }

    }



});

/* start button */
start_btn.addEventListener("click", function switch_to_quiz(){
    start_page_block.classList.replace("visible", "hidden")
    quiz_page_block.classList.replace("hidden", "visible")
    start_timer();
    display_question()
});



// timer
function start_timer(){
    timer = setInterval(function(){
        
        var seconds = time_left%60;
        var mins = Math.floor(time_left/60);

        time_element.innerHTML = mins + ":" + seconds;

        time_left--;

        if(time_left < 60){
            time_element.style.color = "red";
        }
        
        if(time_left < 0){
            clearInterval(timer);
            quiz_page_block.classList.replace("visible","hidden")
            result_page_block.classList.replace("hidden", "visible")
        }
    }, 1000);
}


/* create each quesiton and answers */
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

    create_question(question_text, options);

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

        // questions are enough 
        if(question_index < questions_data["multiple_question"].length){
            display_question();

        }
        else{// run out of questions
            
            quiz_page_block.classList.replace("visible","hidden");
            result_page_block.classList.replace("hidden", "visible");
            clearInterval(timer);
        }

    })

}

/* show the score for the current quiz */
show_score_result = function(){
    var score_rank = JSON.parse(localStorage.getItem("high_grade"))
    // show final score
    console.log(score);
    final_score_element.textContent = score;
    for(var i = 0; i < score_rank.length; i++){
        const li = document.createElement("li");
        li.textContent = `${i+1}` + ". " + score_rank[i].initials + " - " + score_rank[i].score;
        score_list.appendChild(li);
    }

}

// submit initals and score for final rank
submit_btn.addEventListener("click", function(event){
    event.preventDefault();

    if(initials_holder.value == ""){
        confirm("You initial cannot be empty!");
        return;
    }else{
        var initials = initials_holder.value.trim()
        result_page_block.classList.replace("visible","hidden");
        score_page_block.classList.replace("hidden", "visible");
        header_block.classList.replace("visible","hidden");
        
        var new_initials_score = {"initials":initials,"score":score}
        // get local data
    
        var exist_data = localStorage.getItem("high_grade")
    
        if(exist_data == null){
            localStorage.setItem("high_grade",JSON.stringify([new_initials_score]))
        }
        else{
            var data_array = JSON.parse(exist_data)
            data_array.push(new_initials_score)
            localStorage.setItem("high_grade", JSON.stringify(data_array))
        }
        
        show_score_result();
    }

    


})

// go back to main page
go_back_btn.addEventListener("click", function(){
    location.reload();
})

// clear all the scores
clear_btn.addEventListener("click", function(){
    score_list.classList.replace("visible","hidden");
    localStorage.clear()
})



/* check if local storage has questions data */
if(localStorage.getItem("question_data") == null){
    get_json_data();
}












