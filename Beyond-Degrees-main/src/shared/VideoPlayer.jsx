import React from 'react';
import './VideoPlayer.css';

const VideoPlayer = ({ videoId, title, onClose }) => {
    if (!videoId) return null;

    return (
        <div className="video-player-overlay" onClick={onClose}>
            <div className="video-player-container" onClick={(e) => e.stopPropagation()}>
                <button className="video-player-close" onClick={onClose}>&times;</button>
                <div className="video-responsive">
                    <iframe
                        width="853"
                        height="480"
                        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={title || "YouTube video player"}
                    ></iframe>
                </div>
                <div className="video-player-info">
                    <h3>{title}</h3>
                </div>
            </div>
        </div>
    );
};

export default VideoPlayer;
