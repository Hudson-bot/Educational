import React, { useState } from 'react';
import Modal from 'react-modal';
import { v4 as uuidv4 } from 'uuid';
import axios from '../../utils/axios';

Modal.setAppElement('#root');

const InterviewBot = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [interest, setInterest] = useState('');
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [answers, setAnswers] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const skillOptions = [
    'JavaScript', 'Python', 'Data Structures',
    'React', 'Node.js', 'DBMS', 'AI', 'ML'
  ];

  const toggleSkill = (skill) => {
    setSelectedSkills((prev) =>
      prev.includes(skill)
        ? prev.filter((s) => s !== skill)
        : [...prev, skill]
    );
  };

  const handleStartInterview = async () => {
    if (!interest || selectedSkills.length === 0) {
      setError('Please select skills and enter area of interest');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      const res = await axios.post('/interview/generate', {
        skills: selectedSkills,
        interest,
      });

      if (!res.data?.questions) {
        throw new Error('Invalid response format from server');
      }

      setQuestions(res.data.questions);
      setIsModalOpen(false);
    } catch (err) {
      console.error('API Request Failed:', {
        url: err.config?.url,
        status: err.response?.status,
        data: err.response?.data
      });
      setError(err.response?.data?.message || 'Failed to generate questions. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswerSubmit = async () => {
    if (!userAnswer.trim()) {
      setError('Please provide an answer');
      return;
    }

    const updatedAnswers = [
      ...answers,
      {
        question: questions[currentQuestionIndex],
        answer: userAnswer.trim()
      }
    ];
    setAnswers(updatedAnswers);
    setUserAnswer('');
    setError('');

    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      await analyzeAnswers(updatedAnswers);
    }
  };

  const analyzeAnswers = async (answers) => {
    setIsLoading(true);
    try {
      const res = await axios.post('/interview/feedback', { answers });
      setFeedback(res.data.feedback || 'No feedback available');
      setShowFeedback(true);
    } catch (err) {
      console.error('Feedback Error:', {
        message: err.message,
        response: err.response?.data
      });
      setError(err.response?.data?.message || 'Failed to analyze answers');
    } finally {
      setIsLoading(false);
    }
  };

  const resetInterview = () => {
    setQuestions([]);
    setAnswers([]);
    setCurrentQuestionIndex(0);
    setShowFeedback(false);
    setFeedback('');
    setUserAnswer('');
    setError('');
  };

  return (
    <div className="max-w-2xl mx-auto p-5">
      {questions.length === 0 && !showFeedback && (
        <button
          className={`bg-green-600 text-white px-6 py-3 rounded-lg shadow hover:bg-green-700 transition-colors ${
            isLoading ? 'opacity-70 cursor-not-allowed' : ''
          }`}
          onClick={() => setIsModalOpen(true)}
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Start Interview'}
        </button>
      )}

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Skill Selection"
        className="bg-white p-6 rounded-lg shadow-xl max-w-md mx-auto mt-20 outline-none"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center pt-20"
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Choose Skills and Interest</h2>
        
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded">
            <p className="font-bold">Error:</p>
            <p>{error}</p>
          </div>
        )}

        <div className="flex flex-wrap gap-2 mb-4">
          {skillOptions.map((skill) => (
            <button
              key={uuidv4()}
              onClick={() => toggleSkill(skill)}
              className={`px-3 py-1 rounded-full border ${
                selectedSkills.includes(skill)
                  ? 'bg-green-100 border-green-500 text-green-800'
                  : 'bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {skill}
            </button>
          ))}
        </div>

        <input
          type="text"
          placeholder="Your Area of Interest (e.g., Web Development, Data Science)"
          value={interest}
          onChange={(e) => setInterest(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />

        <button
          onClick={handleStartInterview}
          className={`w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors ${
            isLoading ? 'opacity-70 cursor-not-allowed' : ''
          }`}
          disabled={isLoading}
        >
          {isLoading ? 'Generating Questions...' : 'Generate Questions'}
        </button>
      </Modal>

      {questions.length > 0 && !showFeedback && (
        <div className="bg-gray-50 p-6 rounded-lg shadow-md mt-6">
          <div className="text-sm font-semibold text-gray-500 mb-2">
            Question {currentQuestionIndex + 1} of {questions.length}
          </div>
          
          <h3 className="text-xl font-medium text-gray-800 mb-4">
            {questions[currentQuestionIndex]}
          </h3>
          
          <textarea
            rows={5}
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Type your answer here..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 my-3 rounded">
              {error}
            </div>
          )}
          
          <button
            onClick={handleAnswerSubmit}
            className={`mt-4 bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors ${
              isLoading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : 
              currentQuestionIndex + 1 < questions.length ? 'Next Question' : 'Submit Answers'}
          </button>
        </div>
      )}

      {showFeedback && (
        <div className="bg-blue-50 p-6 rounded-lg shadow-md mt-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Interview Feedback</h3>
          <div className="whitespace-pre-wrap text-gray-700 mb-6 leading-relaxed">
            {feedback}
          </div>
          <button 
            onClick={resetInterview}
            className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition-colors"
          >
            Start New Interview
          </button>
        </div>
      )}
    </div>
  );
};

export default InterviewBot;