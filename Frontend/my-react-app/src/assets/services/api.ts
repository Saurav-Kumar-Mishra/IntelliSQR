import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3002/api',
    withCredentials: true,
})

export const loginUser = async (data: { email: string; password: string }) => {
    const response = await api.post('/login', data)
    return response.data
}

export const registerUser = async (data: {
    email: string
    password: string
}) => {
    const response = await api.post('/register', data)
    return response.data
}

export const homePage = async () => {
    try {
        const response = await api.get('/home')
        return response.data
    } catch (error) {
        console.error('Error fetching user data:', error)
        throw error
    }
}
