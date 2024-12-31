import axios from './axios'

export const getValores = async () => {
    try {
        const response = await axios.get('/Valores')
        return response.data
    } catch (error) {
        console.error(error)
    }
    }

export const createValor = async (valor: any) => {
    try {
        const response = await axios.post('/Valores', valor)
        return response.data
    } catch (error) {
        console.error(error)
    }
    }

export const updateValor = async (valor: any) => {
    try {
        const response = await axios.put(`/Valores/${valor.id}`, valor)
        return response.data
    } catch (error) {
        console.error(error)
    }
    }

export const deleteValor = async (id: string) => {
    try {
        const response = await axios.delete(`/Valores/${id}`)
        return response.data
    } catch (error) {
        console.error(error)
    }
    }

export const getValor = async (id: string) => {
    try {
        const response = await axios.get(`/Valores/${id}`)
        return response.data
    } catch (error) {
        console.error(error)
    }
    }

    