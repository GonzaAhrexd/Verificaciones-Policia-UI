import axios from './axios'


export const getUnidades = async () => {
    try {
        const response = await axios.get('/Unidades');
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const getUnidad = async (id: number) => {
    try {
        const response = await axios.get(`/Unidades/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const createUnidad = async (unidad: any) => {
    try {
        const response = await axios.post('/Unidades', unidad);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const updateUnidad = async (unidad: any) => {
    try {
        const response = await axios.put('/Unidades', unidad);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const deleteUnidad = async (id: number) => {
    try {
        const response = await axios.delete(`/Unidades/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}




