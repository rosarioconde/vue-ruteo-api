import axios from 'axios';
const API_URL = 'https://jsonplaceholder.typicode.com/posts';

export const getPosts = () => axios.get(API_URL)
export const getPostsById = (id) => axios.get(`${API_URL}/${id}`);
export const createPost = (data) => axios.post(API_URL, data);