import React, { useEffect, useState } from 'react';
import axios from '../../utils/axios';
import { FiSearch, FiCalendar, FiBookmark, FiExternalLink, FiVideo, FiUser, FiFile } from 'react-icons/fi';
import { FaRegStar, FaStar, FaRegHeart, FaHeart } from 'react-icons/fa';

const AllContent = () => {
  // Files state
  const [files, setFiles] = useState([]);
  const [searchFiles, setSearchFiles] = useState('');
  const [isLoadingFiles, setIsLoadingFiles] = useState(true);
  const [fileError, setFileError] = useState(null);

  // Videos state
  const [videos, setVideos] = useState([]);
  const [searchVideos, setSearchVideos] = useState('');
  const [isLoadingVideos, setIsLoadingVideos] = useState(true);
  const [videoError, setVideoError] = useState(null);

  // Fetch files from backend
  useEffect(() => {
    const fetchFiles = async () => {
      setIsLoadingFiles(true);
      setFileError(null);
      try {
        const response = await axios.get('/api/content/getAll');
        setFiles(response.data.filter(item => item.type === 'research')); 
      } catch (err) {
        setFileError("Failed to fetch files. Please try again later.");
        console.error(err);
      } finally {
        setIsLoadingFiles(false);
      }
    };
    fetchFiles();
  }, []);

  // Fetch videos from backend
  useEffect(() => {
    const fetchVideos = async () => {
      setIsLoadingVideos(true);
      setVideoError(null);
      try {
        const response = await axios.get('/api/content/getAll');
        setVideos(response.data.filter(item => item.type === 'video')); 
      } catch (err) {
        setVideoError("Failed to fetch videos. Please try again later.");
        console.error(err);
      } finally {
        setIsLoadingVideos(false);
      }
    };
    fetchVideos();
  }, []);

  // File filters
  const filteredFiles = files
    .filter(f => f.title.toLowerCase().includes(searchFiles.toLowerCase()))
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  // Video filters
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
    <div className="all-content p-6 max-w-6xl mx-auto space-y-12">
      {/* Files Section */}
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
                    </div>
                  </div>
                </div>
                <a
                  href={`${import.meta.env.VITE_API_URL}/uploads/${file.file}`}
                  download
                  className="mt-4 w-full inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Download File
                </a>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Videos Section */}
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
                  src={`${import.meta.env.VITE_API_URL}/uploads/${video.file}`}
                  controls
                />
                <div className="p-4">
                  <h3 className="text-lg font-medium text-gray-800">{video.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{formatDate(video.createdAt)}</p>
                  <p className="text-sm text-gray-600 mt-1">{video.description}</p>
                  <a
                    href={`${import.meta.env.VITE_API_URL}/uploads/${video.file}`}
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