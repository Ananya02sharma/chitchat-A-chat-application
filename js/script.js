const socket = io('http://localhost:8000');
const form = document.getElementById('input');
const messageinput = document.getElementById('messageinp');
const messagecontainer = document.querySelector(".container");
const append = (message,position)=>{
const messageElement = document.createElement('div')
messageElement.innerText = message;
messageElement.classList.add('message');
messageElement.classList.add(position);
messagecontainer.append(messageElement);

}
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageinput.value;
    append(`you:${message}`,'right');
    socket.emit('send',message);
    messageinput.value=''
})
const Name = prompt("enter your name");
socket.emit('new-user-joined', Name );
socket.on('user-joined',Name=>{
    append(`${Name} joined the chat`,'right');
})
socket.on('recieve',data=>{
    append(`${data.Name}:${data.message}`,'left')
})
socket.on('left',Name=>{
    append(`${Name}:left the chat`,'left')
})