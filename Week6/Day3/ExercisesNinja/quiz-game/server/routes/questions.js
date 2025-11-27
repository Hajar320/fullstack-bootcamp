const express = require('express');
const router = express.Router();
const QuestionController = require('../controllers/questionController');

// Get all questions with options
router.get('/', QuestionController.getAllQuestions);

// Get specific question with options
router.get('/:id', QuestionController.getQuestion);

// Get questions by difficulty
router.get('/difficulty/:difficulty', QuestionController.getQuestionsByDifficulty);

// Check if answer is correct
router.post('/check-answer', QuestionController.checkAnswer);

module.exports = router;