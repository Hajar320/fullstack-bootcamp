    class QuizGame {
        constructor() {
            this.questions = [];
            this.currentQuestionIndex = 0;
            this.score = 0;
            this.timer = null;
            this.timeLeft = 30;
            this.selectedOption = null;
            
            this.initializeElements();
            this.attachEventListeners();
        }

        initializeElements() {
            // Screens
            this.welcomeScreen = document.getElementById('welcome-screen');
            this.quizScreen = document.getElementById('quiz-screen');
            this.resultsScreen = document.getElementById('results-screen');
            
            // Buttons
            this.startBtn = document.getElementById('start-btn');
            this.submitBtn = document.getElementById('submit-btn');
            this.nextBtn = document.getElementById('next-btn');
            this.restartBtn = document.getElementById('restart-btn');
            
            // Display elements
            this.questionNumber = document.getElementById('question-number');
            this.questionText = document.getElementById('question-text');
            this.optionsContainer = document.getElementById('options-container');
            this.feedback = document.getElementById('feedback');
            this.scoreDisplay = document.getElementById('score');
            this.finalScore = document.getElementById('final-score');
            this.totalQuestions = document.getElementById('total-questions');
            this.timerDisplay = document.getElementById('timer');
            this.difficultySelect = document.getElementById('difficulty');
        }

        attachEventListeners() {
            this.startBtn.addEventListener('click', () => this.startQuiz());
            this.submitBtn.addEventListener('click', () => this.submitAnswer());
            this.nextBtn.addEventListener('click', () => this.nextQuestion());
            this.restartBtn.addEventListener('click', () => this.restartQuiz());
        }

        async loadQuestions() {
            try {
                const difficulty = this.difficultySelect.value;
                let url = '/api/questions';
                
                if (difficulty !== 'all') {
                    url = `/api/questions/difficulty/${difficulty}`;
                }
                
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Failed to fetch questions');
                }
                
                this.questions = await response.json();
                
                if (this.questions.length === 0) {
                    alert('No questions available for the selected difficulty.');
                    return false;
                }
                
                return true;
            } catch (error) {
                console.error('Error loading questions:', error);
                alert('Failed to load questions. Please try again.');
                return false;
            }
        }

        async startQuiz() {
            const questionsLoaded = await this.loadQuestions();
            if (!questionsLoaded) return;

            this.currentQuestionIndex = 0;
            this.score = 0;
            this.updateScore();
            
            this.showScreen(this.quizScreen);
            this.displayQuestion();
            this.startTimer();
        }

        displayQuestion() {
            if (this.currentQuestionIndex >= this.questions.length) {
                this.showResults();
                return;
            }

            const question = this.questions[this.currentQuestionIndex];
            this.questionNumber.textContent = `Question ${this.currentQuestionIndex + 1}/${this.questions.length}`;
            this.questionText.textContent = question.question;
            
            this.optionsContainer.innerHTML = '';
            this.feedback.className = 'feedback';
            this.feedback.style.display = 'none';
            this.selectedOption = null;
            
            // Shuffle options
            const shuffledOptions = [...question.options].sort(() => Math.random() - 0.5);
            
            shuffledOptions.forEach(option => {
                const optionElement = document.createElement('button');
                optionElement.className = 'option';
                optionElement.textContent = option.option;
                optionElement.addEventListener('click', () => this.selectOption(optionElement, option.option));
                this.optionsContainer.appendChild(optionElement);
            });

            this.submitBtn.disabled = true;
            this.submitBtn.style.display = 'block';
            this.nextBtn.style.display = 'none';
            this.timeLeft = 30;
            this.updateTimerDisplay();
        }

        selectOption(optionElement, optionValue) {
            // Remove selected class from all options
            document.querySelectorAll('.option').forEach(opt => {
                opt.classList.remove('selected');
            });
            
            // Add selected class to clicked option
            optionElement.classList.add('selected');
            this.selectedOption = optionValue;
            this.submitBtn.disabled = false;
        }

        async submitAnswer() {
            if (!this.selectedOption) return;

            const question = this.questions[this.currentQuestionIndex];
            
            try {
                const response = await fetch('/api/questions/check-answer', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        questionId: question.id,
                        selectedOption: this.selectedOption
                    })
                });

                if (!response.ok) {
                    throw new Error('Failed to check answer');
                }

                const result = await response.json();
                
                // Show feedback
                if (result.isCorrect) {
                    this.score++;
                    this.updateScore();
                    this.feedback.textContent = 'Correct! 🎉';
                    this.feedback.className = 'feedback correct';
                } else {
                    this.feedback.textContent = `Incorrect! The correct answer was: ${question.correct_answer}`;
                    this.feedback.className = 'feedback incorrect';
                }
                
                this.feedback.style.display = 'block';
                
                // Highlight correct and incorrect answers
                document.querySelectorAll('.option').forEach(opt => {
                    if (opt.textContent === question.correct_answer) {
                        opt.classList.add('correct');
                    } else if (opt.textContent === this.selectedOption && !result.isCorrect) {
                        opt.classList.add('incorrect');
                    }
                    opt.style.pointerEvents = 'none';
                });

                this.submitBtn.style.display = 'none';
                this.nextBtn.style.display = 'block';
                this.stopTimer();
                
            } catch (error) {
                console.error('Error submitting answer:', error);
                this.feedback.textContent = 'Error checking answer. Please try again.';
                this.feedback.className = 'feedback incorrect';
                this.feedback.style.display = 'block';
            }
        }

        nextQuestion() {
            this.currentQuestionIndex++;
            this.displayQuestion();
            this.startTimer();
        }

        showResults() {
            this.showScreen(this.resultsScreen);
            this.finalScore.textContent = this.score;
            this.totalQuestions.textContent = this.questions.length;
            this.stopTimer();
        }

        restartQuiz() {
            this.showScreen(this.welcomeScreen);
        }

        showScreen(screen) {
            document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
            screen.classList.add('active');
        }

        updateScore() {
            this.scoreDisplay.textContent = this.score;
        }

        startTimer() {
            this.stopTimer();
            this.timeLeft = 30;
            this.updateTimerDisplay();
            
            this.timer = setInterval(() => {
                this.timeLeft--;
                this.updateTimerDisplay();
                
                if (this.timeLeft <= 0) {
                    this.timeUp();
                }
            }, 1000);
        }

        stopTimer() {
            if (this.timer) {
                clearInterval(this.timer);
                this.timer = null;
            }
        }

        updateTimerDisplay() {
            this.timerDisplay.textContent = `Time: ${this.timeLeft}s`;
            
            if (this.timeLeft <= 10) {
                this.timerDisplay.style.background = '#dc3545';
                this.timerDisplay.style.color = 'white';
            } else {
                this.timerDisplay.style.background = '#ffc107';
                this.timerDisplay.style.color = '#212529';
            }
        }

        timeUp() {
            this.stopTimer();
            this.feedback.textContent = 'Time\'s up! Moving to next question.';
            this.feedback.className = 'feedback incorrect';
            this.feedback.style.display = 'block';
            
            const question = this.questions[this.currentQuestionIndex];
            document.querySelectorAll('.option').forEach(opt => {
                if (opt.textContent === question.correct_answer) {
                    opt.classList.add('correct');
                }
                opt.style.pointerEvents = 'none';
            });

            this.submitBtn.style.display = 'none';
            this.nextBtn.style.display = 'block';
        }
    }

    // Initialize the quiz game when the page loads
    document.addEventListener('DOMContentLoaded', () => {
        new QuizGame();
    });