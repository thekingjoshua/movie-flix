import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const tmdbApiKey = import.meta.env.VITE_TMBD_KEY
// const page = 1

export const tmdbApi = createApi({
    reducerPath: 'tmdbApi',
    baseQuery: fetchBaseQuery({baseUrl: 'https://api.themoviedb.org/3'}), 
    endpoints: (builder) => ({
        //* Get Movies by [Type]
        getMovies: builder.query({
            query: ({genreIdOrCategoryName, page}) =>{
                console.log(page)
                // Get Movies by Category
                if(genreIdOrCategoryName && typeof genreIdOrCategoryName === 'string'){
                    return `movie/${genreIdOrCategoryName}?page=${page}&api_key=${tmdbApiKey}`
                }
                // Get Movies by Genre
                if(genreIdOrCategoryName && typeof genreIdOrCategoryName === 'number'){
                    return `discover/movie?with_genres=${genreIdOrCategoryName}&page=${page}&api_key=${tmdbApiKey}`

                }
                // Get Popular Movies
                return `movie/popular?page=${page}&api_key=${tmdbApiKey}`;
            } 
        }),
        // Get movie by [type]
        getGenres: builder.query({
            query: () => `genre/movie/list?api_key=${tmdbApiKey}`
        })
    })
})

export const {useGetMoviesQuery, useGetGenresQuery} = tmdbApi