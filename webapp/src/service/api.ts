import axios from "axios";

const apiUrl = 'http://localhost:5215'

const api = axios.create({
    baseURL: apiUrl
});

export default api