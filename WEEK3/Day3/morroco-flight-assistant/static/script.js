class ChatApp {
    constructor() {
        this.messages = document.getElementById('chat-messages');
        this.input = document.getElementById('user-input');
        this.sendBtn = document.getElementById('send-button');
        this.typing = document.getElementById('typing-indicator');
        this.suggestions = document.querySelectorAll('.suggestion');
        
        this.init();
    }

    init() {
        this.sendBtn.addEventListener('click', () => this.send());
        this.input.addEventListener('keypress', (e) => e.key === 'Enter' && this.send());
        
        this.suggestions.forEach(suggestion => {
            suggestion.addEventListener('click', () => {
                this.input.value = suggestion.getAttribute('data-query');
                this.send();
            });
        });

        this.input.focus();
    }

    addMessage(text, isUser = false) {
        const msg = document.createElement('div');
        msg.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
        msg.innerHTML = text.replace(/\n/g, '<br>');
        this.messages.appendChild(msg);
        this.scrollToBottom();
    }

    showTyping() {
        this.typing.style.display = 'flex';
        this.scrollToBottom();
    }

    hideTyping() {
        this.typing.style.display = 'none';
    }

    scrollToBottom() {
        this.messages.scrollTop = this.messages.scrollHeight;
    }

    async send() {
        const text = this.input.value.trim();
        if (!text) return;

        this.addMessage(text, true);
        this.input.value = '';
        this.showTyping();

        try {
            const response = await fetch('/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: text })
            });
            
            const data = await response.json();
            this.hideTyping();
            this.addMessage(data.reply);
        } catch (error) {
            this.hideTyping();
            this.addMessage("Sorry, I'm having connection issues. Please try again.");
        }
    }
}

// Start the app
document.addEventListener('DOMContentLoaded', () => new ChatApp());