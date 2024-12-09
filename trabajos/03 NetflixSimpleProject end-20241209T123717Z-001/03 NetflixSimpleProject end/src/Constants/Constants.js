// Base 
export const baseUrl='https://api.themoviedb.org/3'
export const API_KEY='ebb7d15b0175c53963e7e51eb45ffb66'
export const imageUrl='https://image.tmdb.org/t/p/original'

// URL's of API The Movie DB
export const trending=`trending/all/week?api_key=${API_KEY}&language=en-US`
export const originals=`discover/tv?api_key=${API_KEY}&with_networks=213`
export const action=`discover/movie?api_key=${API_KEY}&with_genres=28`
export const horror=`discover/movie?api_key=${API_KEY}&with_genres=27`
export const comedy=`discover/movie?api_key=${API_KEY}&with_genres=35`
export const romance=`discover/movie?api_key=${API_KEY}&with_genres=10749`
export const documentaries=`discover/movie?api_key=${API_KEY}&with_genres=99`