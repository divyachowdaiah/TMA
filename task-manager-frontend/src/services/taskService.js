import axios from 'axios';

const API_URL = 'http://localhost:5000/api/tasks';

export const getTasks = (status) => {
    return axios.get(`${API_URL}${status ? `?status=${status}` : ''}`);
};

export const getTaskById = (id) => {
    return axios.get(`${API_URL}/${id}`);
};

export const createTask = (task) => {
    return axios.post(API_URL, task);
};

export const updateTask = (id, task) => {
    return axios.put(`${API_URL}/${id}`, task);
};

export const deleteTask = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};
