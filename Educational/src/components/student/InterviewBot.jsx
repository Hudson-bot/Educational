import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { v4 as uuidv4 } from 'uuid';
import axios from '../../utils/axios';
import SpeechRecognition, {
  useSpeechRecognition
} from 'react-speech-recognition';

Modal.setAppElement('#root');

const InterviewBot = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [interest, setInterest] = useState('');
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(60);
  const [timerId, setTimerId] = useState(null);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      alert('Your browser does not support speech recognition.');
    }
  }, [browserSupportsSpeechRecognition]);

  useEffect(() => {
    if (questions.length > 0 && !showFeedback) {
      // Start timer when questions are loaded or when moving to next question
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleAnswerSubmit();
            return 60;
          }
          return prev - 1;
        });
      }, 1000);
      setTimerId(timer);
      setTimeLeft(60);

      return () => clearInterval(timer);
    }
  }, [currentQuestionIndex, questions]);

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
      setError(err.response?.data?.message || 'Failed to generate questions.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswerSubmit = async () => {
    clearInterval(timerId);

    if (!transcript.trim()) {
      setError('Please speak an answer first');
      return;
    }

    const updatedAnswers = [
      ...answers,
      {
        question: questions[currentQuestionIndex],
        answer: transcript.trim()
      }
    ];

    setAnswers(updatedAnswers);
    resetTranscript();
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
    resetTranscript();
    setError('');
  };

  return (
    <div className="max-w-2xl mx-auto p-5">
      {questions.length === 0 && !showFeedback && (
        <button
          className="bg-green-600 text-white px-6 py-3 rounded-lg shadow hover:bg-green-700 transition-colors"
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
          placeholder="Your Area of Interest (e.g., Web Development)"
          value={interest}
          onChange={(e) => setInterest(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />

        <button
          onClick={handleStartInterview}
          className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors"
          disabled={isLoading}
        >
          {isLoading ? 'Generating...' : 'Generate Questions'}
        </button>
      </Modal>

      {questions.length > 0 && !showFeedback && (
        <div className="bg-gray-50 p-6 rounded-lg shadow-md mt-6 relative">
          <div className="flex justify-between items-center mb-2">
            <div className="text-sm font-semibold text-gray-500">
              Question {currentQuestionIndex + 1} of {questions.length}
            </div>
            <div className={`text-sm font-bold ${timeLeft <= 10 ? 'text-red-600' : 'text-gray-600'}`}>
              Time left: {timeLeft}s
            </div>
          </div>

          <h3 className="text-xl font-medium text-gray-800 mb-4">
            {questions[currentQuestionIndex]}
          </h3>

          <textarea
            rows={5}
            value={transcript}
            placeholder="Your spoken answer will appear here..."
            readOnly
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100"
          />

          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => {
                resetTranscript();
                SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
              }}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              type="button"
            >
              🎤 {listening ? 'Listening...' : 'Speak'}
            </button>

            <button
              onClick={() => {
                SpeechRecognition.stopListening();
                handleAnswerSubmit();
              }}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
              disabled={isLoading}
            >
              {isLoading ? 'Submitting...' : 'Submit Answer'}
            </button>
          </div>

          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mt-3 rounded">
              {error}
            </div>
          )}
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
