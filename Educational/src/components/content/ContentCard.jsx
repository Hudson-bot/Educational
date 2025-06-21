import { FiEye, FiFile, FiVideo, FiDownload } from 'react-icons/fi';
import { FaRegFilePdf } from 'react-icons/fa';

const ContentCard = ({ item }) => {
  // Determine icon based on content type
  const getIcon = () => {
    if (item.type === 'video') return <FiVideo className="h-5 w-5 text-blue-500" />;
    if (item.type === 'research') return <FaRegFilePdf className="h-5 w-5 text-red-500" />;
    return <FiFile className="h-5 w-5 text-gray-500" />;
  };

  // Format date
  const formattedDate = new Date(item.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3 mb-3">
            <div className="p-2 bg-gray-100 rounded-lg">
              {getIcon()}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{item.title}</h3>
              <p className="text-xs text-gray-500">{formattedDate}</p>
            </div>
          </div>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {item.type}
          </span>
        </div>
        
        <p className="text-sm text-gray-600 mt-2 line-clamp-2">{item.description}</p>
        
        {item.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {item.tags.map((tag, index) => (
              <span key={index} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
      
      <div className="bg-gray-50 px-5 py-3 flex items-center justify-between border-t border-gray-200">
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <FiEye className="h-4 w-4" />
          <span>{item.views} views</span>
        </div>
        <a 
          href={`https://educational-yclh.onrender.com${item.fileUrl}`} 
          target="_blank" 
          rel="noreferrer"
          className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <FiDownload className="-ml-0.5 mr-1.5 h-4 w-4" />
          Download
        </a>
      </div>
    </div>
  );
};

export default ContentCard;