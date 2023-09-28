import axios from 'axios'

const api = axios.create({
    baseURL: "https://sunny-health.onrender.com"
})

export default api