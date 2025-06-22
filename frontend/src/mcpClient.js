import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

export const uploadFiles = (files) => {
    const formData = new FormData();
    files.forEach(file => formData.append('files', file));
    return axios.post(`${BASE_URL}/upload`, formData);
};

export const createFile = (filename, content) => {
    return axios.post(`${BASE_URL}/create`, { filename, content });
};

export const editFile = (filename, content) => {
    return axios.post(`${BASE_URL}/edit`, { filename, content });
};

export const deleteFile = (filename) => {
    return axios.post(`${BASE_URL}/delete`, { filename });
};
