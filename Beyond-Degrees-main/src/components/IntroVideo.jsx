import React, { useState, useEffect } from 'react';
import './IntroVideo.css';

const IntroVideo = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [shouldRender, setShouldRender] = useState(true);

    useEffect(() => {
        // Check if user has already seen the intro in this session
        const hasSeenIntro = sessionStorage.getItem('hasSeenIntro');
        if (hasSeenIntro) {
            setShouldRender(false);
            return;
        }

        const timer = setTimeout(() => {
            setIsVisible(false);
            // Wait for fade transition to finish before unmounting
            setTimeout(() => {
                setShouldRender(false);
                sessionStorage.setItem('hasSeenIntro', 'true');
            }, 1000);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    if (!shouldRender) return null;

    return (
        <div className={`intro-video-overlay ${!isVisible ? 'fade-out' : ''}`}>
            <video
                autoPlay
                muted
                playsInline
                className="intro-video-element"
            >
                <source src="/assets/to beyond degrees.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

export default IntroVideo;
