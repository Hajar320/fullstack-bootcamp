from flask import Flask, request, jsonify, render_template
from assistant import MoroccoFlightAssistant
import os

app = Flask(__name__)
assistant = MoroccoFlightAssistant()

@app.route("/")
def index():
    return render_template('index.html')

@app.route("/styles.css")
def styles():
    return render_template('styles.css')

@app.route("/script.js")
def script():
    return render_template('script.js')

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_message = data.get("message", "")
    reply = assistant.process_user_input(user_message)
    return jsonify({"reply": reply})

if __name__ == "__main__":
    app.run(debug=True)