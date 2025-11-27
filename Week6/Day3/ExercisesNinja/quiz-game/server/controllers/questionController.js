const Question = require('../models/question');

class QuestionController {
  static async getAllQuestions(req, res) {
    try {
      const questions = await Question.getQuestionsWithOptions();
      res.json(questions);
    } catch (error) {
      console.error('Error fetching questions:', error);
      res.status(500).json({ error: 'Failed to fetch questions' });
    }
  }

  static async getQuestion(req, res) {
    try {
      const { id } = req.params;
      const questions = await Question.getQuestionsWithOptions();
      const question = questions.find(q => q.id === parseInt(id));
      
      if (!question) {
        return res.status(404).json({ error: 'Question not found' });
      }
      
      res.json(question);
    } catch (error) {
      console.error('Error fetching question:', error);
      res.status(500).json({ error: 'Failed to fetch question' });
    }
  }

  static async checkAnswer(req, res) {
    try {
      const { questionId, selectedOption } = req.body;
      
      if (!questionId || !selectedOption) {
        return res.status(400).json({ error: 'Question ID and selected option are required' });
      }
      
      const isCorrect = await Question.checkAnswer(questionId, selectedOption);
      res.json({ isCorrect });
    } catch (error) {
      console.error('Error checking answer:', error);
      res.status(500).json({ error: 'Failed to check answer' });
    }
  }

  static async getQuestionsByDifficulty(req, res) {
    try {
      const { difficulty } = req.params;
      const questions = await Question.getByDifficulty(difficulty);
      res.json(questions);
    } catch (error) {
      console.error('Error fetching questions by difficulty:', error);
      res.status(500).json({ error: 'Failed to fetch questions' });
    }
  }
}

module.exports = QuestionController;