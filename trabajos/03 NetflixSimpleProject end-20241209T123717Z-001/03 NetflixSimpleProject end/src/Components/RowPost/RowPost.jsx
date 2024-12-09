import { useEffect, useState } from 'react'
import './RowPost.css'
import {getMoviesByCategory, getVideos} from '../../service/movie-service' 
import YouTube from 'react-youtube'
import {imageUrl} from '../../Constants/Constants'

export default function RowPost(props) {
    const [movies, setMovies] = useState([]);
    const [urlId, setUrlId] = useState("");

    useEffect(() => {
        getMoviesByCategory(props.url).then(data => {
            setMovies(data.results)
        })
    },[])

    const opts = {
        height:"390",
        width:"100%",
        playerVars: { autoplay: 1 }
    }

    const handleOpen = (id) => {
        getVideos(id).then(data => {
            if(data.results.length!=0) setUrlId(data.results[0]);
        })
    }

    return(
        <div className="row">
            <h2>{props.title}</h2>
            <div className="posters">
                {movies.map(movie =>
                    <img key={movie.id}                      
                         className={props.isSmall?"smallPoster":"poster"}                 
                         src={`${imageUrl+movie.backdrop_path}`}
                         alt=""
                         onClick={() => handleOpen(movie.id)}
                    />
                )}
            </div>
            { urlId && <YouTube opts={opts} videoId = {urlId.key}/>}
        </div>
    )
}