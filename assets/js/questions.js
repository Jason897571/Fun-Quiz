let questions_holder = document.querySelector(".question_holder")


function create_question(question_text, answer_text, answer_image_url) {
    /* Create question element */
    var question_text_element = document.createElement("h1");
    question_text_element.innerText = "Questions";
    question_text_element.className = "question_text";
    questions_holder.appendChild(question_text_element);

    /* create quesiton options holder */

    var question_options_holder = document.createElement("ul");
    question_options_holder.className = "question_options_holder";
    questions_holder.appendChild(question_options_holder);

    /* create question option */
    var question_option_element = document.createElement("li");
    question_option_element.className = "question_option";
    question_option_element.innerText = "Option 1";
    question_options_holder.appendChild(question_option_element);

    var question_option_element = document.createElement("li");
    question_option_element.className = "question_option";
    question_option_element.innerText = "Option 2";
    question_options_holder.appendChild(question_option_element);

    var question_option_element = document.createElement("li");
    question_option_element.className = "question_option";
    question_option_element.innerText = "Option 3";
    question_options_holder.appendChild(question_option_element);

    var question_option_element = document.createElement("li");
    question_option_element.className = "question_option";
    question_option_element.innerText = "Option 4";
    question_options_holder.appendChild(question_option_element);

}


