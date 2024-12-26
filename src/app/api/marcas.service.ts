import axios from './axios'

export const getMarcas = async () => {
    try {
        const response = await axios.get('/Marcas')
        return response.data
    } catch (error) {
        return error
    }
}


export const addMarcas = async (marca: any) => {
    try {
        const response = await axios.post('/Marcas', marca)
        return response.data
    } catch (error) {
        return error
    }
}