document.addEventListener('DOMContentLoaded', () => {
    const socket = io();
    const messageForm = document.getElementById('message-form');
    const messageInput = document.getElementById('message-input');
    const messagesDiv = document.getElementById('messages');
    
    // Generate a random username
    const username = 'User_' + Math.floor(Math.random() * 1000);
    
    messageForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      if (messageInput.value.trim()) {
        const message = {
          text: messageInput.value,
          user: username,
          time: new Date().toLocaleTimeString()
        };
        
        // Send message to server
        socket.emit('chat message', message);
        
        // Clear input
        messageInput.value = '';
      }
    });
    
    // Listen for messages
    socket.on('chat message', (msg) => {
      const messageElement = document.createElement('div');
      messageElement.classList.add('message');
      
      // Check if message is from current user
      if (msg.user === username) {
        messageElement.classList.add('sent');
      } else {
        messageElement.classList.add('received');
      }
      
      messageElement.innerHTML = `
        <strong>${msg.user}</strong> <span class="time">${msg.time}</span><br>
        ${msg.text}
      `;
      
      messagesDiv.appendChild(messageElement);
      
      // Add clear div after message
      const clearDiv = document.createElement('div');
      clearDiv.classList.add('clear');
      messagesDiv.appendChild(clearDiv);
      
      // Scroll to bottom
      messagesDiv.scrollTop = messagesDiv.scrollHeight;
    });
  });