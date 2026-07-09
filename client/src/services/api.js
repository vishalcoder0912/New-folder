import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('edtech_admin_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || error.message || 'Request failed';
    return Promise.reject(new Error(message));
  }
);

export const endpoints = {
  settings: '/settings',
  sections: (page, all = false) => `/sections/${page}${all ? '?all=true' : ''}`,
  courses: (all = false) => `/courses${all ? '?all=true' : ''}`,
  events: (all = false) => `/events${all ? '?all=true' : ''}`,
  blogs: (all = false) => `/blogs${all ? '?all=true' : ''}`,
  mentors: (all = false) => `/mentors${all ? '?all=true' : ''}`,
  testimonials: (all = false) => `/testimonials${all ? '?all=true' : ''}`,
  faqs: (all = false) => `/faqs${all ? '?all=true' : ''}`,
  leads: '/leads',
  media: '/media'
};
