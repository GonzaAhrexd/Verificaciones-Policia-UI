import axios from './axios';

export const sendEntrega = async (entrega: any) => {
    try {
        const response = await axios.post('/Entregas', entrega);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const buscarEntrega = async (entrega: any) => {
    try {
        const response = await axios.get(`/Entregas/${entrega.Unidad}/${entrega.Desde}/${entrega.Hasta}`);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}


export const deleteEntrega = async (id: string) => {
    try {
        const response = await axios.delete(`/Entregas/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const updateEntrega = async (id: number, entrega: any) => {
    try {
        const response = await axios.put(`/Entregas/${id}`, entrega);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}
