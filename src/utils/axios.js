import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://educational-yclh.onrender.com/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default instance;
