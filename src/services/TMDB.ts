import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const tmdbApiKey = import.meta.env.VITE_TMBD_KEY
const page = 1

export const tmdbApi = createApi({
    reducerPath: 'tmdbApi',
    baseQuery: fetchBaseQuery({baseUrl: 'https://api.themoviedb.org/3'}), 
    endpoints: (builder) => ({
        //* Get Movies by [Type]
        getMovies: builder.query({
            query: () => `movie/popular?page=${page}&api_key=${tmdbApiKey}`
        })
    })
})

export const {useGetMoviesQuery} = tmdbApi