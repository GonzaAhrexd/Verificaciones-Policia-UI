import axios from './axios'

export const getMarcasMotos = async () => {
    try {
        const response = await axios.get('/MarcasMotos')
        return response.data
    } catch (error) {
        console.error(error)
    }
    }

export const loadMarcasMotos = async () => {
    try {
        const response = await axios.get('/MarcasMotos')
        return response.data
    } catch (error) {
        console.error(error)
    }
    }

export const editMarcasMotos = async (marca: any) => {
        const response = await axios.put(`/MarcasMotos/${marca.id}`, marca)
        return response.data
    }

export const deleteMarcasMotos = async (id: number) => {
        const response = await axios.delete(`/MarcasMotos/${id}`)
        return response.data
    }

export const getModelosByMarcaMoto = async (marca: string) => {
    const response = await axios.get(`/MarcasMotos/Modelos/${marca}`)
    return response.data
}
