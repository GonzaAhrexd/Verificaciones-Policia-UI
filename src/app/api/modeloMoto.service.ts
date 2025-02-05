import axios from './axios'

export const addModelo = async (modelo: any) => {
    try{
        await axios.post(`/ModelosMotos/${modelo.MarcaNombre}`,modelo)
    }catch(e){
        console.log(e)
    }   
}

export const deleteModelo = async (id: number) => {
    try{
        await axios.delete(`/ModelosMotos/${id}`)
    }catch(e){
        console.log(e)
    }
}

export const editModelo = async (modelo: any) => {
    try{
        await axios.put(`/ModelosMotos/${modelo.Id}`,modelo)
    }catch(e){
        console.log(e)
    }
}
