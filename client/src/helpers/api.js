const axios = require('axios');

const api = axios.create({
    baseUrl: 'http://localhost:3000/api/v1/'
})

export default api;