// app.js
const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Hard-coded questions
const questions = [
    {
        id: 1,
        question: "What is the capital of France?",
        answer: "Paris",
        options: ["London", "Paris", "Berlin", "Madrid"]
    },
    {
        id: 2,
        question: "Which planet is known as the Red Planet?",
        answer: "Mars",
        options: ["Venus", "Mars", "Jupiter", "Saturn"]
    },
    {
        id: 3,
        question: "What is the largest mammal in the world?",
        answer: "Blue whale",
        options: ["Elephant", "Giraffe", "Blue whale", "Polar bear"]
    }
];

// Store user sessions in memory (simple approach)
let userSessions = {};

// Home page - Start quiz
app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>Simple Trivia Quiz</title>
        <style>
            body { 
                font-family: Arial, sans-serif; 
                max-width: 600px; 
                margin: 50px auto; 
                padding: 20px;
                background: #f0f8ff;
            }
            .container { 
                background: white; 
                padding: 30px; 
                border-radius: 10px; 
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                text-align: center;
            }
            h1 { color: #2c3e50; }
            .btn { 
                background: #3498db; 
                color: white; 
                padding: 15px 30px; 
                text-decoration: none; 
                border-radius: 5px; 
                display: inline-block;
                margin-top: 20px;
                font-size: 18px;
            }
            .btn:hover { background: #2980b9; }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>🎯 Simple Trivia Quiz</h1>
            <p>Test your knowledge with 3 fun questions!</p>
            <p>Click below to start the quiz:</p>
            <a href="/quiz" class="btn">Start Quiz</a>
        </div>
    </body>
    </html>
    `);
});

// Quiz page - Show current question
app.get('/quiz', (req, res) => {
    const sessionId = req.query.sessionId || 'session_' + Date.now();
    
    // Initialize session if new
    if (!userSessions[sessionId]) {
        userSessions[sessionId] = {
            currentQuestion: 0,
            score: 0,
            answers: []
        };
    }

    const session = userSessions[sessionId];
    
    // Check if quiz is completed
    if (session.currentQuestion >= questions.length) {
        return res.redirect(`/score?sessionId=${sessionId}`);
    }

    const question = questions[session.currentQuestion];
    
    res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>Question ${session.currentQuestion + 1}</title>
        <style>
            body { 
                font-family: Arial, sans-serif; 
                max-width: 600px; 
                margin: 50px auto; 
                padding: 20px;
                background: #f0f8ff;
            }
            .container { 
                background: white; 
                padding: 30px; 
                border-radius: 10px; 
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }
            h1 { color: #2c3e50; }
            .question { 
                font-size: 20px; 
                margin: 20px 0; 
                color: #34495e;
            }
            .options { 
                margin: 20px 0; 
                text-align: left;
            }
            .option { 
                display: block; 
                margin: 10px 0; 
                padding: 10px;
                background: #ecf0f1;
                border-radius: 5px;
                cursor: pointer;
            }
            .option:hover { background: #d5dbdb; }
            input[type="radio"] { margin-right: 10px; }
            .btn { 
                background: #3498db; 
                color: white; 
                padding: 12px 25px; 
                border: none; 
                border-radius: 5px; 
                cursor: pointer;
                font-size: 16px;
                margin-top: 15px;
            }
            .btn:hover { background: #2980b9; }
            .progress {
                background: #bdc3c7;
                height: 10px;
                border-radius: 5px;
                margin: 20px 0;
            }
            .progress-bar {
                background: #27ae60;
                height: 100%;
                border-radius: 5px;
                width: ${((session.currentQuestion) / questions.length) * 100}%;
            }
            .score {
                background: #f8f9fa;
                padding: 10px;
                border-radius: 5px;
                margin: 10px 0;
                text-align: center;
                font-weight: bold;
            }
            .feedback {
                padding: 15px;
                margin: 15px 0;
                border-radius: 5px;
                text-align: center;
                font-weight: bold;
            }
            .correct { background: #d4edda; color: #155724; border: 1px solid #c3e6cb; }
            .incorrect { background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Simple Trivia Quiz</h1>
            
            <div class="progress">
                <div class="progress-bar"></div>
            </div>
            
            <div class="score">
                Question ${session.currentQuestion + 1} of ${questions.length} | 
                Score: ${session.score}
            </div>

            ${req.query.feedback ? `
                <div class="feedback ${req.query.correct === 'true' ? 'correct' : 'incorrect'}">
                    ${req.query.feedback}
                </div>
            ` : ''}

            <div class="question">${question.question}</div>
            
            <form method="POST" action="/quiz">
                <input type="hidden" name="sessionId" value="${sessionId}">
                
                <div class="options">
                    ${question.options.map(option => `
                        <label class="option">
                            <input type="radio" name="answer" value="${option}" required>
                            ${option}
                        </label>
                    `).join('')}
                </div>
                
                <button type="submit" class="btn">Submit Answer</button>
            </form>
            
            <div style="margin-top: 20px;">
                <a href="/" style="color: #3498db;">Back to Home</a> | 
                <a href="/restart?sessionId=${sessionId}" style="color: #e74c3c;">Restart Quiz</a>
            </div>
        </div>
    </body>
    </html>
    `);
});

// Handle answer submission
app.post('/quiz', (req, res) => {
    const { sessionId, answer } = req.body;
    const session = userSessions[sessionId];
    
    if (!session) {
        return res.redirect('/');
    }

    const currentQuestion = questions[session.currentQuestion];
    const isCorrect = answer === currentQuestion.answer;
    
    // Update score
    if (isCorrect) {
        session.score++;
    }
    
    // Store answer
    session.answers.push({
        question: currentQuestion.question,
        userAnswer: answer,
        correctAnswer: currentQuestion.answer,
        isCorrect: isCorrect
    });
    
    // Move to next question
    session.currentQuestion++;
    
    // If there are more questions, show feedback and next question
    if (session.currentQuestion < questions.length) {
        const feedback = isCorrect ? 
            'Correct! 🎉 Well done!' : 
            `Incorrect! The correct answer was: ${currentQuestion.answer}`;
        
        return res.redirect(`/quiz?sessionId=${sessionId}&feedback=${encodeURIComponent(feedback)}&correct=${isCorrect}`);
    }
    
    // If no more questions, show score
    res.redirect(`/score?sessionId=${sessionId}`);
});

// Show final score
app.get('/score', (req, res) => {
    const sessionId = req.query.sessionId;
    const session = userSessions[sessionId];
    
    if (!session) {
        return res.redirect('/');
    }

    res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>Quiz Results</title>
        <style>
            body { 
                font-family: Arial, sans-serif; 
                max-width: 600px; 
                margin: 50px auto; 
                padding: 20px;
                background: #f0f8ff;
            }
            .container { 
                background: white; 
                padding: 30px; 
                border-radius: 10px; 
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                text-align: center;
            }
            h1 { color: #2c3e50; }
            .final-score {
                font-size: 2.5em;
                margin: 20px 0;
                color: #e74c3c;
                font-weight: bold;
            }
            .percentage {
                font-size: 1.5em;
                margin: 15px 0;
                color: #2c3e50;
            }
            .answer-review {
                text-align: left;
                margin: 30px 0;
            }
            .answer-item {
                padding: 15px;
                margin: 10px 0;
                border-radius: 5px;
                border-left: 4px solid;
            }
            .correct-answer { 
                background: #d4edda; 
                border-left-color: #28a745; 
            }
            .incorrect-answer { 
                background: #f8d7da; 
                border-left-color: #dc3545; 
            }
            .btn { 
                background: #3498db; 
                color: white; 
                padding: 12px 25px; 
                text-decoration: none; 
                border-radius: 5px; 
                display: inline-block;
                margin: 10px;
            }
            .btn:hover { background: #2980b9; }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>🎯 Quiz Completed!</h1>
            
            <div class="final-score">
                ${session.score} / ${questions.length}
            </div>
            
            <div class="percentage">
                ${Math.round((session.score / questions.length) * 100)}% Correct
            </div>
            
            <p>
                ${session.score === questions.length ? 'Perfect score! Amazing! 🎉' : 
                  session.score >= questions.length / 2 ? 'Good job! 👍' : 
                  'Keep practicing! 💪'}
            </p>
            
            <div class="answer-review">
                <h3>Your Answers:</h3>
                ${session.answers.map((answer, index) => `
                    <div class="answer-item ${answer.isCorrect ? 'correct-answer' : 'incorrect-answer'}">
                        <strong>Q${index + 1}: ${answer.question}</strong><br>
                        Your answer: ${answer.userAnswer}<br>
                        Correct answer: ${answer.correctAnswer}<br>
                        <strong>${answer.isCorrect ? '✅ Correct' : '❌ Incorrect'}</strong>
                    </div>
                `).join('')}
            </div>
            
            <div>
                <a href="/restart?sessionId=${sessionId}" class="btn">Play Again</a>
                <a href="/" class="btn">Back to Home</a>
            </div>
        </div>
    </body>
    </html>
    `);
});

// Restart quiz
app.get('/restart', (req, res) => {
    const sessionId = req.query.sessionId;
    
    if (userSessions[sessionId]) {
        userSessions[sessionId] = {
            currentQuestion: 0,
            score: 0,
            answers: []
        };
    }
    
    res.redirect(`/quiz?sessionId=${sessionId}`);
});

// Start server
app.listen(PORT, () => {
    console.log(`🎯 Simple Trivia Quiz running at http://localhost:${PORT}`);
});