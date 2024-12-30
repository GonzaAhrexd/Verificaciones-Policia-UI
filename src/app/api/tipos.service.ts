import axios from './axios';

export const getTipos = async () => {
  try {
    const response = await axios.get('/tipos');
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getTipo = async (id: number) => {
  try {
    const response = await axios.get(`/tipos/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createTipo = async (tipo: any) => {
  try {
    const response = await axios.post('/tipos', tipo);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const editTipo = async (id: number, tipo:any) => {
  try {
    const response = await axios.put(`/tipos/${tipo.id}`, tipo);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteTipo = async (id: any) => {
  try {
    const response = await axios.delete(`/tipos/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

