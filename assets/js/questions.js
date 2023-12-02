let questions_holder = document.querySelector(".question_holder")


function create_question(question_text,options,correct_option) {
    /* Create question element */
    var question_text_element = document.createElement("h1");
    question_text_element.innerText = question_text;
    question_text_element.className = "question_text";
    questions_holder.appendChild(question_text_element);

    /* create quesiton options holder */

    var question_options_holder = document.createElement("ul");
    question_options_holder.className = "question_options_holder";
    questions_holder.appendChild(question_options_holder);

    /* create question option */

    var question_option_element = document.createElement("li");
    question_option_element.className = "question_option";
    question_option_element.innerText = options[0];
    question_options_holder.appendChild(question_option_element);

    var question_option_element = document.createElement("li");
    question_option_element.className = "question_option";
    question_option_element.innerText = options[1];
    question_options_holder.appendChild(question_option_element);

    var question_option_element = document.createElement("li");
    question_option_element.className = "question_option";
    question_option_element.innerText = options[2];
    question_options_holder.appendChild(question_option_element);

    var question_option_element = document.createElement("li");
    question_option_element.className = "question_option";
    question_option_element.innerText = options[3];
    question_options_holder.appendChild(question_option_element);

}


const quesiton_json_url = "./assets/json/question.json"

fetch(quesiton_json_url)
  .then(response => response.json())
  .then(data => {

    if(localStorage.getItem("question_data") == null){
        // Use the data from the JSON file
        localStorage.setItem("question_data", JSON.stringify(data));
    }else{
        return true;
    }

    
  })


var questions_data = localStorage.getItem("question_data");
questions_data = JSON.parse(questions_data);

for(var i = 0; i < questions_data["multiple_question"].length; i++){

    var single_question = questions_data["multiple_question"][i]

    var question_text = single_question["question"];
    var options = single_question["options"];
    var correct_answer = single_question["correct_answer"];
    
    create_question(question_text, options, correct_answer)

    
}







