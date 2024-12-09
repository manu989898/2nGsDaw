import React, { useState } from 'react';
import axios from 'axios';

function YouTubeSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [videos, setVideos] = useState([]);
  const API_KEY = 'TU_CLAVE_DE_API_YOUTUBE'; // Reemplaza con tu clave de API de YouTube

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      alert('Please enter a search term');
      return;
    }

    try {
      const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
          part: 'snippet',
          maxResults: 10,
          q: searchTerm,
          type: 'video',
          key: API_KEY,
        },
      });
      setVideos(response.data.items);
    } catch (error) {
      console.error('Error fetching YouTube videos:', error);
      alert('Failed to fetch videos. Check your API key and network.');
    }
  };

  return (
    <div>
      <h1>YouTube Video Search</h1>
      <div>
        <input
          type="text"
          placeholder="Search for videos"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div>
        {videos.map((video) => (
          <div key={video.id.videoId} style={{ margin: '20px 0' }}>
            <h3>{video.snippet.title}</h3>
            <p>{video.snippet.description}</p>
            <img
              src={video.snippet.thumbnails.medium.url}
              alt={video.snippet.title}
              style={{ width: '320px', height: '180px' }}
            />
            <div>
              <a
                href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Watch Video
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default YouTubeSearch;
