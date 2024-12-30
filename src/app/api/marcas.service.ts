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

export const deleteMarcas = async (id: number) => {
    try {
        const response = await axios.delete(`/Marcas/${id}`)
        return response.data
    } catch (error) {
        return error
    }
}

export const editMarca = async (id: number, marca: any) => {
    try {
        const response = await axios.put(`/Marcas/${id}`, marca)
        return response.data
    } catch (error) {
        return error
    }
}