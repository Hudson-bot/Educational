// src/utils/profileApi.js
import axios from './Js_axios';

export const getProfile = async () => {
  try {
    // Remove '/api' prefix, use '/profile' so it becomes '/api/v1/profile'
    const response = await axios.get('/profile');
    return response.data;
  } catch (error) {
    console.error('Error fetching profile:', error);
    throw error;
  }
};

export const updateProfile = async (profileData) => {
  try {
    // Remove '/api' prefix, use '/profile' so it becomes '/api/v1/profile'
    const response = await axios.put('/profile', profileData);
    return response.data;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};
export const createTeacher = async (teacherData) => {
  try {
    const response = await axios.post('/teachers', teacherData);
    return response.data;
  } catch (error) {
    console.error('Error creating teacher:', error);
    throw error;
  }
};

export const getTeachers = async () => {
  try {
    const response = await axios.get('/teachers');
    return response.data;
  } catch (error) {
    console.error('Error fetching teachers:', error);
    throw error;
  }
};

export const deleteTeacher = async (id) => {
  try {
    const response = await axios.delete(`/teachers/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting teacher:', error);
    throw error;
  }
};