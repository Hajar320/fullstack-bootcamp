from flask import Flask, render_template, request, jsonify
from openai import OpenAI
import os
from dotenv import load_dotenv
import re

load_dotenv()

app = Flask(__name__)

# Setup OpenAI client
client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=os.getenv("OPENROUTER_API_KEY")
)

def clean_markdown(text):
    """Remove markdown formatting from text"""
    # Remove bold **text**
    text = re.sub(r'\*\*(.*?)\*\*', r'\1', text)
    # Remove headers ###
    text = re.sub(r'#+\s*', '', text)
    # Remove table formatting |
    text = re.sub(r'\|', ' ', text)
    # Remove horizontal lines ---
    text = re.sub(r'-{3,}', '', text)
    # Remove code blocks ```
    text = re.sub(r'```.*?```', '', text, flags=re.DOTALL)
    # Clean up extra spaces
    text = re.sub(r'\n\s*\n', '\n\n', text)
    return text.strip()

def sky_bot(prompt: str) -> str:
    # Ask for plain text response
    enhanced_prompt = f"{prompt}\n\nPlease respond in plain text without markdown, tables, or code blocks."
    
    response = client.chat.completions.create(
        # Use one of these available free models:
        model="deepseek/deepseek-chat-v3.1:free",  # Available free model
        # model="huggingfaceh4/zephyr-7b-beta:free",  # Alternative
        # model="microsoft/wizardlm-2-8x22b:free",  # Another alternative
        messages=[{"role": "user", "content": enhanced_prompt}]
    )
    return response.choices[0].message.content

@app.route('/')
def home():
    return render_template('skybot.html')

@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json.get('message')
    
    try:
        bot_response = sky_bot(user_message)
        # Clean any remaining markdown
        clean_response = clean_markdown(bot_response)
        return jsonify({'response': clean_response})
    
    except Exception as e:
        return jsonify({'response': f"Error: {str(e)}"})

if __name__ == '__main__':
    app.run(debug=True)