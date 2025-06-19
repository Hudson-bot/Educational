import React, { useEffect, useState } from 'react';
import axios from '../../utils/Js_axios';
import { FiSearch, FiCalendar, FiBookmark, FiExternalLink, FiVideo, FiUser, FiFile } from 'react-icons/fi';
import { FaRegStar, FaStar, FaRegHeart, FaHeart } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const AllContent = () => {
  const [files, setFiles] = useState([]);
  const [searchFiles, setSearchFiles] = useState('');
  const [isLoadingFiles, setIsLoadingFiles] = useState(true);
  const [fileError, setFileError] = useState(null);
  const [videos, setVideos] = useState([]);
  const [searchVideos, setSearchVideos] = useState('');
  const [isLoadingVideos, setIsLoadingVideos] = useState(true);
  const [videoError, setVideoError] = useState(null);
  const navigate = useNavigate();

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
              <span className="mr-2">&#8592;</span> Back to Dashboard
            </Link>
            <span className="text-xl font-semibold text-white">EduPortal</span>
          </div>
          <div className="flex items-center gap-4">
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
        console.error('Error fetching files:', err);
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
        const videos = response.data.filter(item => item.type === 'video');
        setVideos(videos);
      } catch (err) {
        setVideoError("Failed to fetch videos. Please try again later.");
        console.error('Error fetching videos:', err);
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

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-900 via-gray-900 to-black overflow-y-auto p-6">
      <NavBar />
      <section className="files">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Educational Files</h2>
          <p className="text-gray-600">Browse all educational materials</p>
        </div>
        <div className="filters mb-6">
          <div className="relative flex-grow max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search files..."
              value={searchFiles}
              onChange={e => setSearchFiles(e.target.value)}
              className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
          </div>
        </div>
        {isLoadingFiles ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : fileError ? (
          <div className="bg-red-50 border-l-4 border-red-500 p-4">
            <p className="text-sm text-red-700">{fileError}</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredFiles.map(file => (
              <div key={file._id} className="border rounded-lg p-4 bg-white shadow-sm">
                <div className="flex items-start justify-between">
                  <div className="flex items-center">
                    <FiFile className="h-8 w-8 text-blue-500 mr-3" />
                    <div>
                      <h3 className="text-lg font-medium text-gray-800">{file.title}</h3>
                      <p className="text-sm text-gray-500">{formatDate(file.createdAt)}</p>
                      <p className="text-sm text-gray-600 mt-1">{file.description}</p>
                      {file.tags && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {file.tags.map((tag, index) => (
                            <span key={index} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <a
                  href={`${import.meta.env.VITE_API_URL}/uploads/${file.fileUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 w-full inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  View Paper
                </a>
              </div>
            ))}
          </div>
        )}
      </section>
      <section className="videos">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Educational Videos</h2>
          <p className="text-gray-600">Browse all educational videos</p>
        </div>
        <div className="filters mb-6">
          <div className="relative flex-grow max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search videos..."
              value={searchVideos}
              onChange={e => setSearchVideos(e.target.value)}
              className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
          </div>
        </div>
        {isLoadingVideos ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : videoError ? (
          <div className="bg-red-50 border-l-4 border-red-500 p-4">
            <p className="text-sm text-red-700">{videoError}</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredVideos.map(video => (
              <div key={video._id} className="border rounded-lg overflow-hidden bg-white shadow-sm">
                <video 
                  className="w-full h-48 object-cover"
                  controls
                >
                  <source src={`${import.meta.env.VITE_API_URL}/uploads/${video.fileUrl}`} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="p-4">
                  <h3 className="text-lg font-medium text-gray-800">{video.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{formatDate(video.createdAt)}</p>
                  <p className="text-sm text-gray-600 mt-1">{video.description}</p>
                  {video.tags && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {video.tags.map((tag, index) => (
                        <span key={index} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <a
                    href={`${import.meta.env.VITE_API_URL}${video.fileUrl}`}
                    download
                    className="mt-4 w-full inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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
  );
};

export default AllContent;