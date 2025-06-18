import React, { useState, useEffect } from 'react';
import { FiSave, FiTrash2, FiFileText, FiEye, FiX } from 'react-icons/fi';
import { MdFormatBold, MdFormatItalic, MdFormatListBulleted } from 'react-icons/md';
import axios from '../../utils/axios';
import { useAuth } from '../../contexts/AuthContext';

const Notes = () => {
  const [note, setNote] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [savedNotes, setSavedNotes] = useState([]);
  const [showSavedNotes, setShowSavedNotes] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('/notes');
        setNote(response.data.data.content || '');
        setCharCount(response.data.data.content?.length || 0);
      } catch (err) {
        console.error('Error fetching note:', err);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) fetchNote();
  }, [user]);

  const fetchSavedNotes = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('/notes/history');
      setSavedNotes(response.data);
      setShowSavedNotes(true);
    } catch (err) {
      console.error('Error fetching saved notes:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const loadSavedNote = (content) => {
    setNote(content);
    setCharCount(content.length);
    setShowSavedNotes(false);
  };

  const saveNote = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post('/notes', { content: note });
      if (response.data.success) {
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 2000);
      } else {
        throw new Error('Failed to save note');
      }
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
        await axios.delete('/notes');
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

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-900 via-gray-900 to-black overflow-y-auto">
      <div className="min-h-full flex flex-col">
        <div className="max-w-3xl mx-auto w-full p-6 flex-grow">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <FiFileText className="mr-2" /> My Notes
            </h2>
            <div className="flex items-center space-x-4">
              <button
                onClick={fetchSavedNotes}
                className="flex items-center px-3 py-1 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <FiEye className="mr-2" /> View Saved
              </button>
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

          {showSavedNotes ? (
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Your Saved Notes</h3>
                <button 
                  onClick={() => setShowSavedNotes(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FiX size={20} />
                </button>
              </div>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {savedNotes.length > 0 ? (
                  savedNotes.map((savedNote, index) => (
                    <div 
                      key={index}
                      className="p-3 border border-gray-200 rounded hover:bg-gray-50 cursor-pointer"
                      onClick={() => loadSavedNote(savedNote.content)}
                    >
                      <div className="text-sm text-gray-500 mb-1">
                        {new Date(savedNote.updatedAt).toLocaleString()}
                      </div>
                      <div className="line-clamp-2">
                        {savedNote.content.substring(0, 100)}...
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-500 py-4">
                    No saved notes found
                  </div>
                )}
              </div>
            </div>
          ) : (
            <>
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
                  onChange={(e) => {
                    setNote(e.target.value);
                    setCharCount(e.target.value.length);
                  }}
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
            </>
          )}

          <div className="mt-6 text-sm text-gray-300">
            <p>Tip: Use Markdown syntax for formatting (**, *, - for lists)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notes;