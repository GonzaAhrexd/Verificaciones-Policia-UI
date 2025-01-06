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
