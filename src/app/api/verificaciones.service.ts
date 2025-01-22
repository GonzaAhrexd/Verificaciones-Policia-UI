import axios from './axios'

export const getVerificaciones = async () => {
    const response = await axios.get('/Verificaciones')
    return response.data
}

export const sendVerificacion = async (verificacion: any) => {
    const response = await axios.post('/Verificaciones', verificacion)
    return response.data
}

