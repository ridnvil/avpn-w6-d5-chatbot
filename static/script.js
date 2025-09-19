document.addEventListener('DOMContentLoaded', () => {
    const chatForm = document.getElementById('chat-form');
    const userInput = document.getElementById('user-input');
    const chatBox = document.getElementById('chat-box');

    let conversationHistory = [];

    chatForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const userMessage = userInput.value.trim();
        if (!userMessage) {
            return;
        }

        addMessage(userMessage, 'user');
        userInput.value = '';

        // Add user message to history
        conversationHistory.push({ role: 'user', content: userMessage, message: userMessage });

        const thinkingMessage = addMessage('Thinking...', 'bot');

        try {
            const response = await fetch('http://localhost:3000/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    conversation: conversationHistory
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }

            const data = await response.json();

            if (data && data.data) {
                const botMessage = data.data;
                thinkingMessage.innerHTML = marked.parse(botMessage);
                // Add bot response to history
                conversationHistory.push({ role: 'model', content: botMessage, message: botMessage });
            } else {
                thinkingMessage.textContent = 'Sorry, no response received.';
                // Remove the last user message from history if the bot fails
                conversationHistory.pop();
            }
        } catch (error) {
            console.error('Error fetching AI response:', error);
            thinkingMessage.textContent = 'Failed to get response from server.';
            // Remove the last user message from history if the fetch fails
            conversationHistory.pop();
        }
    });

    function addMessage(message, sender) {
        const messageElement = document.createElement('div');
        // Note: The CSS uses .user-message and .bot-message
        const senderClass = sender === 'user' ? 'user-message' : 'bot-message';
        messageElement.className = `message ${senderClass}`;
        messageElement.textContent = message;
        chatBox.appendChild(messageElement);
        chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
        return messageElement;
    }
});
