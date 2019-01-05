var socket = io();
var chatInput = document.querySelector('#chat-input');
var chatContainer = document.querySelector('#chat-container');

//----------------------------------------------------------
//Emit chat message when enter key is pressed
//---------------------------------------------------------

chatInput.addEventListener('keydown', function (e) {
    if (e.keyCode == 13) {
        e.preventDefault();
        if (chatInput.value != "") {
            socket.emit("chat-message", chatInput.value);
            chatInput.value = "";
        }
    }
});


//----------------------------------------------------------
//Receive chat message from server
//---------------------------------------------------------
socket.on("chat-message", function (message) {
    chatContainer.innerHTML = chatContainer.innerHTML + message + '<br />';
});

//----------------------------------------------------------
//Receive new user has joined from server
//---------------------------------------------------------
socket.on("new-user", function (user) {
    chatContainer.innerHTML = user + "<br />";
})