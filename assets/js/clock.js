let time_element = document.getElementById("timer_number");
let total_score_element = document.getElementById("total score");

var time_left = 10;

function start_timer(){
    var timer = setInterval(function(){
        time_left--;
        time_element.innerHTML = time_left;
        if(time_left < 0){
            clearInterval(timer);
            jump_to_finish_page();
        }
    }, 1000);
}



function jump_to_finish_page(){
    window.location.href = "finish_page.html";
}


start_timer()


