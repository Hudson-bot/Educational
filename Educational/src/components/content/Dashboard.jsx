import { useEffect, useState } from 'react';
import api from '../../utils/axios';
import ContentCard from './ContentCard';
import { FiUploadCloud, FiLoader } from 'react-icons/fi';

const Dashboard = () => {
  const [uploads, setUploads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUploads = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const res = await api.get('/content/myuploads', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUploads(res.data);uygh
      } catch (err) {
        console.error('Failed to fetch uploads:', err);
        setError('Failed to load your content. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchUploads();
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-900 via-gray-900 to-black overflow-hidden min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Content Library</h1>
            <p className="text-gray-600 mt-1">All your uploaded videos and research papers</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">
              {uploads.length} {uploads.length === 1 ? 'item' : 'items'}
            </span>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <FiLoader className="animate-spin h-12 w-12 text-blue-500 mb-4" />
            <p className="text-gray-600">Loading your content...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        ) : uploads.length === 0 ? (
          <div className="text-center py-20 border-2 border-dashed border-gray-300 rounded-lg">
            <FiUploadCloud className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">No content uploaded yet</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by uploading your first video or research paper.</p>
            <div className="mt-6">
              <button className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Upload Content
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {uploads.map(item => (
              <ContentCard key={item._id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;