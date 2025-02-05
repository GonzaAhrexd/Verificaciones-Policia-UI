import axios from './axios'

export const addModelo = async (modelo: any) => {
    try{
        await axios.post(`/ModelosAutos/${modelo.MarcaNombre}`,modelo)
    }catch(e){
        console.log(e)
    }   
}

export const eliminarModelo = async (id: any) => {
    try{
        await axios.delete(`/ModelosAutos/${id}`)
    }catch(e){
        console.log(e)
    }   
}

export const editModelo = async (modelo: any) => {
    try{
        await axios.put(`/ModelosAutos/${modelo.Id}`,modelo)
    }catch(e){
        console.log(e)
    }   
}