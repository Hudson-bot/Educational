import { useState, useEffect } from 'react';
import { FiX, FiUser, FiBook, FiPhone, FiMail, FiAward } from 'react-icons/fi';
import { createTeacher } from '../../utils/profileApi';

const TeacherDialog = ({ isOpen, onClose, onSave, initialTeacher }) => {
  const [teacherInfo, setTeacherInfo] = useState({
    name: '',
    specialty: '',
    phone: '',
    email: '',
    qualifications: '',
    department: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen && initialTeacher) {
      setTeacherInfo(initialTeacher);
    } else if (isOpen) {
      setTeacherInfo({
        name: '',
        specialty: '',
        phone: '',
        email: '',
        qualifications: '',
        department: ''
      });
    }
  }, [isOpen, initialTeacher]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeacherInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Validate required fields
      if (!teacherInfo.name || !teacherInfo.specialty || !teacherInfo.department) {
        throw new Error('Name, specialty and department are required');
      }

      // Call backend API
      const savedTeacher = await createTeacher(teacherInfo);
      
      // Notify parent component
      onSave(savedTeacher.data);
      
      // Show success message
      console.log('Teacher added successfully!');
      
      // Reset form and close
      setTeacherInfo({
        name: '',
        specialty: '',
        phone: '',
        email: '',
        qualifications: '',
        department: ''
      });
      onClose();
    } catch (error) {
      console.error('Error saving teacher:', error);
      alert(error.response?.data?.error || error.message || 'Failed to save teacher');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center border-b p-4">
          <h3 className="text-xl font-semibold text-gray-800">Add Teacher Information</h3>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700"
            disabled={isSubmitting}
          >
            <FiX size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 flex items-center">
              <FiUser className="mr-2 text-blue-500" /> Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={teacherInfo.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 flex items-center">
              <FiBook className="mr-2 text-blue-500" /> Specialty/Subject *
            </label>
            <input
              type="text"
              name="specialty"
              value={teacherInfo.specialty}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 flex items-center">
              <FiPhone className="mr-2 text-blue-500" /> Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={teacherInfo.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 flex items-center">
              <FiMail className="mr-2 text-blue-500" /> Email
            </label>
            <input
              type="email"
              name="email"
              value={teacherInfo.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 flex items-center">
              <FiAward className="mr-2 text-blue-500" /> Qualifications
            </label>
            <input
              type="text"
              name="qualifications"
              value={teacherInfo.qualifications}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="PhD, MSc, etc."
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Department *
            </label>
            <select
              name="department"
              value={teacherInfo.department}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              disabled={isSubmitting}
            >
              <option value="">Select Department</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Biology">Biology</option>
              <option value="Engineering">Engineering</option>
              <option value="Literature">Literature</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Save Teacher'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeacherDialog;