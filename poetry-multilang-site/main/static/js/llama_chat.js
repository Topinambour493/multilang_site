chat = document.getElementById("chat");
textarea_chat = document.getElementById("input-chat");
chat_circle =  document.getElementById("chat-circle");
chat_box = document.getElementById("container");
chat_box_toggle = document.getElementById("chat-box-toggle");

function add_message_user_in_web(datetime, message){
    var new_message = document.createElement("li");
    new_message.className = "user";
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

function add_message_llama3_in_web(datetime, message){
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

function add_message_in_conversation(message){
    let conversation = get_full_prompt()
    conversation.push(message)
    sessionStorage.setItem("conversation", JSON.stringify(conversation))
}

function add_message_llama3_in_conversation(datetime, message){
    let new_message = {"role": "Assistant", "datetime": datetime, "message": message}
    add_message_in_conversation(new_message)
}

function add_message_user_in_conversation(datetime, message){
    let new_message = {"role": "User", "datetime": datetime, "message": message}
    add_message_in_conversation(new_message)
}

function get_full_prompt(){
    return JSON.parse(sessionStorage.getItem("conversation"))
}

textarea_chat.onkeyup = async function (e){
    if (e.key !== 'Enter'){
        return
    }
    var date = getDate()
    add_message_user_in_web(date, textarea_chat.value);
    add_message_user_in_conversation(date, textarea_chat.value);
    chat.scrollTop = chat.scrollHeight - chat.clientHeight ;
    let message = textarea_chat.value
    textarea_chat.value = "";
    await fetch('/get-response?' + new URLSearchParams({
        "full-prompt": sessionStorage.getItem("conversation"),
    }).toString())
        .then(res => res.json())
        .then(res => {
            add_message_llama3_in_web(date,res.response);
            add_message_llama3_in_conversation(date,res.response);
        })
    chat.scrollTop = chat.scrollHeight - chat.clientHeight ;
}

function toggle_change(){
    chat_circle.toggleAttribute('scale');
    chat_box.toggleAttribute('scale');
    if (sessionStorage.getItem("chatbot-open") === "false")
        chatbot_open = "true"
    else
        chatbot_open = "false"
    sessionStorage.setItem("chatbot-open", chatbot_open)
    console.log(sessionStorage.getItem("chatbot-open"))
}

chat_circle.onclick = function (){
    toggle_change()
}


chat_box_toggle.onclick = function (){
    toggle_change()
}


if (sessionStorage.getItem("chatbot-open") === "true"){
    chat_circle.toggleAttribute('scale');
    chat_box.toggleAttribute('scale');
} else {
    sessionStorage.setItem("chatbot-open","false")
}

if (sessionStorage.getItem("conversation")){
    conversation = get_full_prompt()
    for (let i = 0; i < conversation.length; i++) {
      if (conversation[i]["role"] === "User"){
          add_message_user_in_web(getDate(conversation[i]["datetime"]) , conversation[i]["message"])
      } else if (conversation[i]["role"] === "Assistant"){
          add_message_llama3_in_web(getDate(conversation[i]["datetime"]) , conversation[i]["message"])
      }
    }
    chat.scrollTop = chat.scrollHeight - chat.clientHeight ;
} else {
    sessionStorage.setItem("conversation","[]")
}