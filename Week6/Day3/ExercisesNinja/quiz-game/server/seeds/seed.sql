
TRUNCATE TABLE questions_options, options, questions RESTART IDENTITY CASCADE;

-- Insert questions

INSERT INTO questions (question, correct_answer, difficulty) VALUES 

('What is the capital of France?', 'Paris', 'easy'),
('Which planet is known as the Red Planet?', 'Mars', 'easy'),
('What is 2 + 2?', '4', 'easy'),
('Who wrote ''Romeo and Juliet''?', 'William Shakespeare', 'medium'),
('What is the largest ocean on Earth?', 'Pacific Ocean', 'medium');

-- Insert options
INSERT INTO options (option) VALUES 
('Paris'), ('London'), ('Berlin'), ('Rome'),
('Mars'), ('Jupiter'), ('Venus'), ('Saturn'),
('3'), ('4'), ('5'), ('6'),
('William Shakespeare'), ('Charles Dickens'), ('Jane Austen'),
('Pacific Ocean'), ('Atlantic Ocean'), ('Indian Ocean'), ('Arctic Ocean');

-- Link questions with options
INSERT INTO questions_options (question_id, option_id) VALUES 
(1, 1), (1, 2), (1, 3), (1, 4),
(2, 5), (2, 6), (2, 7), (2, 8),
(3, 9), (3, 10), (3, 11), (3, 12),
(4, 13), (4, 14), (4, 15), (5, 16),
(5, 17), (5, 18), (5, 19);