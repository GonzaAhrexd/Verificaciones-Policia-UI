import axios from './axios'

export const getDepositos = async () => {
    const response = await axios.get('/Depositos')
    return response.data
    }

export const sendDepositos = async (data: any) => {
    const response = await axios.post('/Depositos', data)
    return response.data
    }