import React, { useEffect, useState } from 'react';
import axios from '../../utils/Js_axios';
import { FiSearch, FiFile, FiBookOpen, FiVideo } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import ResearchPapers from './ResearchPapers';

const AllContent = () => {
  const [files, setFiles] = useState([]);
  const [searchFiles, setSearchFiles] = useState('');
  const [isLoadingFiles, setIsLoadingFiles] = useState(true);
  const [fileError, setFileError] = useState(null);
  const [videos, setVideos] = useState([]);
  const [searchVideos, setSearchVideos] = useState('');
  const [isLoadingVideos, setIsLoadingVideos] = useState(true);
  const [videoError, setVideoError] = useState(null);
  const [showResearchPapers, setShowResearchPapers] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const NavBar = () => (
    <nav className="bg-white/10 backdrop-blur-sm border-b border-white/20 w-full">
      <div className="px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Link to="/student/dashboard" className="flex items-center text-white hover:text-gray-300 transition">
              <span className="mr-2">&#8592;</span> Back to Dashboard
            </Link>
            <span className="text-xl font-semibold text-white">EduPortal</span>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );

  useEffect(() => {
    const fetchFiles = async () => {
      setIsLoadingFiles(true);
      setFileError(null);
      try {
        const response = await axios.get('/content/all');
        const papers = response.data.filter(item => item.type === 'paper');
        setFiles(papers);
      } catch (err) {
        setFileError("Failed to fetch files. Please try again later.");
      } finally {
        setIsLoadingFiles(false);
      }
    };
    fetchFiles();
  }, []);

  useEffect(() => {
    const fetchVideos = async () => {
      setIsLoadingVideos(true);
      setVideoError(null);
      try {
        const response = await axios.get('/content/all');
        const vids = response.data.filter(item => item.type === 'video');
        setVideos(vids);
      } catch (err) {
        setVideoError("Failed to fetch videos. Please try again later.");
      } finally {
        setIsLoadingVideos(false);
      }
    };
    fetchVideos();
  }, []);

  const filteredFiles = files
    .filter(f => f.title.toLowerCase().includes(searchFiles.toLowerCase()))
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const filteredVideos = videos
    .filter(v => v.title.toLowerCase().includes(searchVideos.toLowerCase()))
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const formatDate = date =>
    new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-900 via-gray-900 to-black text-white  overflow-y-auto">
      <NavBar />

      <div className="px-4 py-8 w-full">
        {/* Research Papers Button */}
        <div className="flex justify-end mb-6">
          <button
            onClick={() => setShowResearchPapers(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg"
          >
            <FiBookOpen className="text-lg" /> Browse Research Papers
          </button>
        </div>

        {/* Files Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-2">Educational Files</h2>
          <p className="text-gray-300 mb-6">Browse all educational materials</p>

          <div className="relative w-full max-w-md mb-8">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search files..."
              value={searchFiles}
              onChange={e => setSearchFiles(e.target.value)}
              className="pl-10 w-full px-4 py-2 rounded-lg border border-gray-300 text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {isLoadingFiles ? (
            <div className="flex justify-center py-10">
              <div className="animate-spin h-10 w-10 border-t-2 border-b-2 border-blue-500 rounded-full"></div>
            </div>
          ) : fileError ? (
            <div className="bg-red-100 text-red-800 p-4 rounded">{fileError}</div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredFiles.map(file => (
                <div key={file._id} className="bg-white text-black rounded-lg p-4 shadow hover:shadow-lg transition">
                  <div className="flex items-start gap-3">
                    <FiFile className="text-blue-600 text-2xl mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold break-words">{file.title}</h3>
                      <p className="text-sm text-gray-600">{formatDate(file.createdAt)}</p>
                      <p className="text-sm mt-2">{file.description}</p>
                      {file.tags?.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {file.tags.map((tag, i) => (
                            <span key={i} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <a
                    href={`${import.meta.env.VITE_API_URL}/uploads/${file.fileUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                  >
                    View Paper
                  </a>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Videos Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-2">Educational Videos</h2>
          <p className="text-gray-300 mb-6">Browse all educational videos</p>

          <div className="relative w-full max-w-md mb-8">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search videos..."
              value={searchVideos}
              onChange={e => setSearchVideos(e.target.value)}
              className="pl-10 w-full px-4 py-2 rounded-lg border border-gray-300 text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {isLoadingVideos ? (
            <div className="flex justify-center py-10">
              <div className="animate-spin h-10 w-10 border-t-2 border-b-2 border-blue-500 rounded-full"></div>
            </div>
          ) : videoError ? (
            <div className="bg-red-100 text-red-800 p-4 rounded">{videoError}</div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredVideos.map(video => (
                <div key={video._id} className="bg-white text-black rounded-lg shadow hover:shadow-lg transition overflow-hidden">
                  <video className="w-full h-48 object-cover" controls>
                    <source src={`${import.meta.env.VITE_API_URL}/uploads/${video.fileUrl}`} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold break-words">{video.title}</h3>
                    <p className="text-sm text-gray-600">{formatDate(video.createdAt)}</p>
                    <p className="text-sm mt-1">{video.description}</p>
                    {video.tags?.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {video.tags.map((tag, i) => (
                          <span key={i} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <a
                      href={`${import.meta.env.VITE_API_URL}${video.fileUrl}`}
                      download
                      className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                      Download Video
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {showResearchPapers && <ResearchPapers onClose={() => setShowResearchPapers(false)} />}
    </div>
  );
};

export default AllContent;