import generateQuestionsFromSkills from '../utils/openrouter.js';

export const generateQuestions = async (req, res) => {
  try {
    const { skills, interest } = req.body;

    if (!skills?.length || !interest) {
      return res.status(400).json({ message: 'Skills and interest are required' });
    }

    const prompt = `Generate 5 technical interview questions for someone skilled in ${skills.join(', ')} and interested in ${interest}. Provide only the questions in a bullet list format.`;
    
    const response = await generateQuestionsFromSkills(null, skills, prompt);

    // Convert to array
    const questions = response
      .split('\n')
      .filter((line) => line.trim())
      .map((line) => line.replace(/^\d+\.\s*/, '').replace(/^- /, '').trim())
      .filter(q => q); // Remove empty questions

    if (!questions.length) {
      throw new Error('No questions generated');
    }

    res.status(200).json({ questions });
  } catch (error) {
    console.error("Error generating questions:", {
      error: error.message,
      stack: error.stack,
      requestBody: req.body
    });
    res.status(500).json({ 
      message: 'Failed to generate questions',
      error: error.message 
    });
  }
};

export const generateFeedback = async (req, res) => {
  try {
    const { answers } = req.body;

    if (!answers || !Array.isArray(answers)){
      return res.status(400).json({ message: 'Answers array is required' });
    }

    const prompt = `Evaluate these interview answers and provide detailed feedback on strengths, weaknesses, and improvement suggestions:\n\n${answers.map(a => `Q: ${a.question}\nA: ${a.answer}`).join('\n\n')}`;

    const feedback = await generateQuestionsFromSkills(null, [], prompt);
    res.status(200).json({ feedback });
  } catch (error) {
    console.error("Error generating feedback:", {
      error: error.message,
      stack: error.stack,
      requestBody: req.body
    });
    res.status(500).json({ 
      message: 'Failed to generate feedback',
      error: error.message 
    });
  }
};