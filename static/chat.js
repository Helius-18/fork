function chatEvent() {
    document.getElementById('chat_btn').addEventListener('click',reset_notification,true)
    document.getElementById("chat_form").addEventListener("submit", chat, true);
}

function reset_notification() {
    document.getElementById("badge").classList.add("d-none");
    document.getElementById("badge").innerText=0;
}

function chat(e) {
    e.preventDefault()
    message=document.getElementById("message").value;
    chatSocket.send(JSON.stringify({
        "kind":"chat",
        "message":message,
        "user":document.getElementById("username").innerText
    }));
    document.getElementById("message").value=""
}
function receivedChat(data) {
    if (!document.getElementById("offcanvasRight").classList.contains("show")) {
        document.getElementById("badge").classList.remove("d-none");
        document.getElementById("badge").innerText=parseInt(document.getElementById("badge").innerText)+1;
    }
    document.getElementById("toast-body").innerText="message from "+data.user+": "+data.message;
    toast.show();
    notify();
    document.getElementById("chat_body").innerHTML+="<p>"+data.user+": "+data.message+"</p>";
}