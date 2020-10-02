const chatList = document.getElementById('chat-form');

const socket = io();

// Message from server
socket.on('message', message => {
    outputMessage(message);
});

// Submit message
chatList.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get message text
    const msg = e.target.elements.msg.value; 

    // Emit message to server
    socket.emit('chatMessage', msg);
});

// Output message to DOM
function outputMessage(message) {
    const li = document.createElement('li');
    li.textContent = message;
    li.classList.add('message');
    document.getElementById('chat-field').appendChild(li);
}