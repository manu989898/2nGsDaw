import { useState, useRef } from 'react';

export default function VideoPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const inputRef = useRef(null)
  const searchRef = useRef(null)
  
  function handleClick() {
    const nextIsPlaying = !isPlaying;
    const video = inputRef.current;
    if (nextIsPlaying) {
      video.play();
    } else {
      video.pause();
    }
    setIsPlaying(nextIsPlaying);
  }

  return (
    <>
        EJERCICIO1
    <br/>
      <button 
        onClick={handleClick}>
        {isPlaying ? 'Pause' : 'Play'}
      </button><br/>
      <video 
      width="250"
        ref={inputRef}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >      
        <source
          src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
          type="video/mp4"
        />
      </video>
      <>
      <br/>
      EJERCICIO2
      <nav>
        <button
            onClick={() => {
                const search = searchRef.current.focus();
                
            }}
        >Search</button>
      </nav>
      <input
        ref={searchRef}
        placeholder="Looking for something?"
      />
    </>

    </>
  )
}
