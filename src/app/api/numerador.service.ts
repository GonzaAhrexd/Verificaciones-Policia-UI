import axios from './axios';

export const getNumerador = async (id: string) => {
    try {
        const response = await axios.get(`/Numeradors/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const getNumeradors = async () => {
    try {
        const response = await axios.get('/Numeradors');
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const createNumerador = async (numerador: any) => {
    try {
        const response = await axios.post('/Numeradors', numerador);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const updateNumerador = async (numerador: any) => {
    try {
        const response = await axios.put(`/Numeradors/${numerador.id}`, numerador);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const deleteNumerador = async (id: string) => {
    try {
        const response = await axios.delete(`/Numeradors/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};
