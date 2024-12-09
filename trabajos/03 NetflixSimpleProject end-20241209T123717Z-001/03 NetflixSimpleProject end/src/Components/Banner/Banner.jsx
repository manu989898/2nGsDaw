import { useState } from 'react'
import styles from './Banner.module.css'
import {getMoviesByCategory, getVideos} from '../../service/movie-service'
import {useEffect} from 'react'
import { imageUrl, trending} from '../../Constants/Constants'
import YouTube from 'react-youtube'

export default function Banner() {
    const [movie, setMovie] = useState();
    const [urlId, setUrlId] = useState("");

    useEffect(() => {
        getMoviesByCategory(trending).then(data => {
            setMovie(data.results[0])
        })
    },[])

    const opts = {
        height:"448",
        width:"100%",
        playerVars: { autoplay: 1 }
    }

    const handleOpen = (id) => {
        getVideos(id).then(data => {
            if(data.results.length!=0) setUrlId(data.results[0]);
        })
    }

    return(
        <div style={{backgroundImage:`url(${movie ? imageUrl+movie.backdrop_path:''})`}} className={styles.banner}>
            { urlId && <YouTube opts={opts} videoId = {urlId.key}/>}
            <div className={styles.content}>
                <h1 className={styles.title}>{movie?movie.title:""}</h1>
                <div className={styles.banner_buttons}>
                    <button onClick={() => handleOpen(movie.id)} className={styles.button}>Play</button>
                    <button className={styles.button}>My list</button>
                </div>
                <h1 className={styles.description}>{movie?movie.overview:""}</h1>
            </div>

            <div className={styles.fade_bottom}>

            </div>
        </div>
    )
}
