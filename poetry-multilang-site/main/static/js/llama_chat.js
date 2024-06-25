chat = document.getElementById("chat");
button_send_to_chat = document.getElementById("send-to-chat");
textarea_chat = document.getElementById("input-chat");
chat_circle =  document.getElementById("chat-circle");
chat_box = document.getElementById("container");
chat_box_toggle = document.getElementById("chat-box-toggle");

function add_message_me(datetime, message){
    var new_message = document.createElement("li");
    new_message.className = "me";
    new_message.innerHTML = `
        <div class="entete">
            <h3>${datetime}</h3>
            <h2>Vous</h2>
            <span class="status blue"></span>
        </div>
        <div class="triangle"></div>
        <div class="message">
           ${message}
        </div>
    `
    chat.append(new_message);
}

function add_message_llama3(datetime, message){
    var new_message = document.createElement("li");
    new_message.className = "Llama3";
    new_message.innerHTML = `
        <div class="entete">
            <h3>${datetime}</h3>
            <h2>llama3</h2>
            <span class="status green"></span>
        </div>
        <div class="triangle"></div>
        <div class="message">
           ${message}
        </div>
    `
     chat.append(new_message);
}

function getDate(){
    var date = new Date();
    var minute = date.getMinutes();
    var hour = date.getHours();
    var day = date.getDate();
    var month = date.getMonth();
    var year = date.getFullYear();
    return hour + "h" + minute + ", " + day + "/" + month + "/" + year
}

// button_send_to_chat.onclick = function (){
//     var date = getDate()
//     add_message_me(date, textarea_chat.value);
//     textarea_chat.value = "";
//     add_message_llama3(date, "coucou mon poulet")
// }

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

button_send_to_chat.onclick = function (){
    var date = getDate()
    add_message_me(date, textarea_chat.value);
    let message = textarea_chat.value
    textarea_chat.value = "";
    fetch('/main/get-response?' + new URLSearchParams({
        "input-chat": message,
    }).toString())
        .then(res => res.json())
        .then(res => {
            add_message_llama3(date,res.response);
        })
}

chat_circle.onclick = function (){
    chat_circle.toggleAttribute('scale');
    chat_box.toggleAttribute('scale');
    console.log(chat_box)
}

chat_box_toggle.onclick = function (){
    chat_circle.toggleAttribute('scale');
    chat_box.toggleAttribute('scale');
}
