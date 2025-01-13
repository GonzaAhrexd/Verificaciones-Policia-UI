import axios from './axios'

export const getDepositos = async () => {
    const response = await axios.get('/Depositos')
    return response.data
}

export const sendDepositos = async (data: any) => {
    const response = await axios.post('/Depositos', data)
    return response.data
}

export const buscarDeposito = async (data: any) => {
    const response = await axios.get(`/Depositos/${data.Unidad}/${data.Desde}/${data.Hasta}`)
    return response.data
}


export const deleteDepositos = async (id: any) => {
    const response = await axios.delete(`/Depositos/${id}`)
    return response.data
}

export const editDeposito = async (data: any) => {
    const response = await axios.put(`/Depositos/${data.id}`, data)
    return response.data
}
