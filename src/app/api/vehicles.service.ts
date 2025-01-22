import axios from './axios'

export const getVehicles = async () => {
    try {
        const response = await axios.get('/Vehicles')
        return response.data
    } catch (error) {
        console.error(error)
    }
    }

export const getVehicleByMake = async (make: string) => {
    try {
        const response = await axios.get(`/Vehicles/${make}`)
        return response.data
    } catch (error) {
        console.error(error)
    }
    }

export const getMotorcycles = async () => {
    try {
        const response = await axios.get('/Vehicles/motorcycles')
        return response.data.data
    } catch (error) {
        console.error(error)
    }
    }

export const getMotoByMake = async (make: string) => {
    try {
        const response = await axios.get(`/Vehicles/motorcycles/${make}`)
        return response.data
    } catch (error) {
        console.error(error)
    }
    }
    