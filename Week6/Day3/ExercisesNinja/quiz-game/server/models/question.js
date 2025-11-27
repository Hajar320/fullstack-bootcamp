const db = require('../config/database');

class Question {
  static async getAll() {
    try {
      const questions = await db('questions')
        .select('*')
        .orderBy('id');
      
      return questions;
    } catch (error) {
      throw error;
    }
  }

  static async getQuestionsWithOptions() {
    try {
      const questions = await db('questions')
        .select('*')
        .orderBy('id');
      
      for (let question of questions) {
        const options = await db('questions_options as qo')
          .join('options as o', 'qo.option_id', 'o.id')
          .where('qo.question_id', question.id)
          .select('o.id', 'o.option');
        
        question.options = options;
      }
      
      return questions;
    } catch (error) {
      throw error;
    }
  }

  static async checkAnswer(questionId, selectedOption) {
    try {
      const question = await db('questions')
        .where({ id: questionId })
        .first();
      
      return question.correct_answer === selectedOption;
    } catch (error) {
      throw error;
    }
  }

  static async getByDifficulty(difficulty) {
    try {
      const questions = await db('questions')
        .where({ difficulty })
        .select('*')
        .orderBy('id');
      
      for (let question of questions) {
        const options = await db('questions_options as qo')
          .join('options as o', 'qo.option_id', 'o.id')
          .where('qo.question_id', question.id)
          .select('o.id', 'o.option');
        
        question.options = options;
      }
      
      return questions;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Question;