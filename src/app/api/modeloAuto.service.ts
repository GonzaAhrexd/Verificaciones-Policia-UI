import axios from './axios'

export const addModelo = async (modelo: any) => {
    try{
        await axios.post(`/ModelosAutos/${modelo.MarcaNombre}`,modelo)
    }catch(e){
        console.log(e)
    }   
}