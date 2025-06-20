import React, { useState, useEffect } from 'react';
import { FiSave, FiTrash2, FiFileText, FiLogOut, FiArrowLeft } from 'react-icons/fi';
import { MdFormatBold, MdFormatItalic, MdFormatListBulleted } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../utils/Js_axios';
import { useAuth } from '../../contexts/AuthContext';

const Notes = () => {
  const navigate = useNavigate();
  const [note, setNote] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await axios.get('/content/notes');
        setNote(response.data.data.content || '');
        setCharCount(response.data.data.content?.length || 0);
      } catch (err) {
        console.error('Error fetching note:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNote();
  }, []);

  const saveNote = async () => {
    try {
      setIsLoading(true);
      await axios.post('/content/notes', { content: note });
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2000);
    } catch (err) {
      console.error('Error saving note:', err);
      alert('Failed to save note. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const clearNote = async () => {
    if (window.confirm('Are you sure you want to clear your note?')) {
      try {
        setIsLoading(true);
        await axios.delete('/content/notes');
        setNote('');
        setCharCount(0);
      } catch (err) {
        console.error('Error clearing note:', err);
        alert('Failed to clear note. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleTextChange = (e) => {
    setNote(e.target.value);
    setCharCount(e.target.value.length);
  };

  const formatText = (format) => {
    let formattedText = note;
    switch(format) {
      case 'bold':
        formattedText = note + ' **bold text**';
        break;
      case 'italic':
        formattedText = note + ' *italic text*';
        break;
      case 'list':
        formattedText = note + '\n- List item';
        break;
      default:
        break;
    }
    setNote(formattedText);
    setCharCount(formattedText.length);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const NavBar = () => (
    <nav className="bg-white/10 backdrop-blur-sm border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Link 
              to="/student/dashboard"
              className="flex items-center text-white hover:text-gray-300 transition-colors"
            >
              <FiArrowLeft className="mr-2" /> Back to Dashboard
            </Link>
            <span className="text-xl font-semibold text-white">EduPortal</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center">
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900 via-gray-900 to-black flex items-center justify-center">
        <div className="text-white">Loading your notes...</div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-900 via-gray-900 to-black overflow-y-auto">
      <NavBar />
      <div className="min-h-full flex flex-col">
        <div className="max-w-3xl mx-auto w-full p-6 flex-grow">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <FiFileText className="mr-2" /> My Notes
            </h2>
            <div className="flex items-center space-x-2">
              <span className={`text-sm ${charCount > 1000 ? 'text-red-500' : 'text-gray-300'}`}>
                {charCount}/1000 chars
              </span>
              {isSaved && (
                <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                  Saved!
                </span>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
            <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 flex space-x-2">
              <button 
                onClick={() => formatText('bold')}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded"
                title="Bold"
              >
                <MdFormatBold />
              </button>
              <button 
                onClick={() => formatText('italic')}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded"
                title="Italic"
              >
                <MdFormatItalic />
              </button>
              <button 
                onClick={() => formatText('list')}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded"
                title="List"
              >
                <MdFormatListBulleted />
              </button>
            </div>

            <textarea
              value={note}
              onChange={handleTextChange}
              placeholder="Start typing your notes here..."
              className="w-full p-4 min-h-[300px] focus:outline-none resize-none"
            />
          </div>

          <div className="flex justify-end space-x-3 mt-4">
            <button
              onClick={clearNote}
              disabled={isLoading}
              className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
            >
              <FiTrash2 className="mr-2" /> Clear
            </button>
            <button
              onClick={saveNote}
              disabled={!note.trim() || isLoading}
              className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                note.trim() && !isLoading
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <FiSave className="mr-2" /> {isLoading ? 'Saving...' : 'Save Note'}
            </button>
          </div>

          <div className="mt-6 text-sm text-gray-300">
            <p>Tip: Use Markdown syntax for formatting (**, *, - for lists)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notes;