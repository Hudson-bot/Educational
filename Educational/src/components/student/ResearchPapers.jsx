// src/components/student/ResearchPapers.jsx
import React, { useState, useEffect } from 'react';
import { FiExternalLink, FiDownload, FiSearch } from 'react-icons/fi';
import { fetchArxivPapers, fetchCrossrefPapers } from '../../utils/researchApis';

const ResearchPapers = ({ onClose }) => {
  const [query, setQuery] = useState('');
  const [papers, setPapers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [source, setSource] = useState('arxiv');
  const [error, setError] = useState(null);

  const fetchPapers = async () => {
    if (!query.trim()) return;
    
    setIsLoading(true);
    setError(null);
    try {
      let results;
      if (source === 'arxiv') {
        results = await fetchArxivPapers(query);
      } else {
        results = await fetchCrossrefPapers(query);
      }
      setPapers(results);
    } catch (err) {
      setError('Failed to fetch papers. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query) fetchPapers();
    }, 500);
    return () => clearTimeout(timer);
  }, [query, source]);

  const formatDate = (dateString) => {
    if (!dateString) return 'Date not available';
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Research Papers</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          
          <div className="flex gap-4 mb-6">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search research papers..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
            </div>
            <select
              value={source}
              onChange={(e) => setSource(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            >
              <option value="arxiv">arXiv</option>
              <option value="crossref">Crossref</option>
            </select>
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : papers.length > 0 ? (
            <div className="space-y-4">
              {papers.map((paper) => (
                <div key={paper.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-medium text-gray-800 mb-1">{paper.title || 'Untitled Paper'}</h3>
                  <p className="text-sm text-gray-500 mb-2">
                    {paper.authors?.join(', ') || 'Authors not specified'} • {formatDate(paper.published)}
                  </p>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {paper.summary || paper.abstract || 'No abstract available'}
                  </p>
                  <div className="flex gap-2">
                    {paper.link && (
                      <a
                        href={paper.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors text-sm"
                      >
                        <FiExternalLink size={14} /> View
                      </a>
                    )}
                    {paper.pdf && (
                      <a
                        href={paper.pdf}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors text-sm"
                      >
                        <FiDownload size={14} /> PDF
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : query ? (
            <div className="text-center py-8 text-gray-500">
              No papers found for "{query}"
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              Enter a search term to find research papers
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResearchPapers;