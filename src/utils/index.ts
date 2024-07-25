import axios from 'axios'

const API_KEY = import.meta.env.VITE_TMBD_KEY

export const moviesApi = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params: {
        api_key: API_KEY
    }
})

export const fetchToken = async () => {
    try{
        const {data} = await moviesApi.get('/authentication/token/new')

        const token = data.request_token

        if(data.success){
            console.log('IN HERE')
            localStorage.setItem('request_token', token)

            window.location.href = `https://www.themoviedb.org/authenticate/${token}?redirect_to=${window.location.origin}/approved`
        }

    } catch (error) {
        console.log('SORRY, YOUR TOKEN WAS NOT CREATED')
    }
    console.log('HERE')
} 
export const createSessionId = async () => {
    const token = localStorage.getItem('request_token');

    if(token){
        try {
            const {data: {session_id}} = await moviesApi.post('authentication/session/new', {
                request_token: token
            })

            localStorage.setItem('session_id', session_id)
            return session_id
        } catch (error) {
            console.log(error)
        }
    }
}