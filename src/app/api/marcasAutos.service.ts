import axios from './axios'

export const getMarcasAutos = async () => {
    try {
        const response = await axios.get('/MarcasAutos')
        return response.data
    } catch (error) {
        console.error(error)
    }
    }


export const loadMarcasAutos = async () => {
    try {
        const response = await axios.get('/MarcasAutos')
        return response.data
    } catch (error) {
        console.error(error)
    }
    }

export const editMarcasAutos = async (marca: any) => {
        const response = await axios.put(`/MarcasAutos/${marca.id}`, marca)
        return response.data
    }

export const deleteMarcasAutos = async (id: number) => {
        const response = await axios.delete(`/MarcasAutos/${id}`)
        return response.data
    }

export const getModelosByMarcas = async (marca: string) => {
    const response = await axios.get(`/MarcasAutos/Modelos/${marca}`)
    return response.data
}

