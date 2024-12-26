import axios from 'axios';

const baseUrl = "http://localhost:5010/api"
// Creamos una instancia de axios con la URL base

const instance = axios.create({
    baseURL: baseUrl,
})

// Exportamos la instancia
export default instance