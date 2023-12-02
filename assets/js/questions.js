let questions_text = document.querySelector(".question_text")
let option_1 = document.querySelector(".option_1")
let option_2 = document.querySelector(".option_2")
let option_3 = document.querySelector(".option_3")
let option_4 = document.querySelector(".option_4")
let question_options_holder = document.querySelector(".question_options_holder")
var question_index = 1;

function create_question(question_text,options,correct_option) {
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

    var questions_data = localStorage.getItem("question_data");
    questions_data = JSON.parse(questions_data);
    var single_question = questions_data["multiple_question"][question_index]
    var question_text = single_question["question"];
    var options = single_question["options"];
    var correct_answer = single_question["correctAnswer"];


    create_question(question_text, options, correct_answer);

    question_options_holder.addEventListener("click", function handle_option_click(event){
        

        if(event.target.textContent == correct_answer){
            console.log("correct answer")
            
        }
        else{
            console.log("wrong answer")
            
        }

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


/* check if local storage has questions data */
if(localStorage.getItem("question_data") == null){
    get_json_data();
}


display_question()









