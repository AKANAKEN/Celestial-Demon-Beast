import React from 'react';
import Downloader from '../components/Downloader';

const Home = () => {
    return (
        <div className="home">
            <h1>Welcome to YouTube Downloader</h1>
            <p>Download your favorite videos and audio files from YouTube easily!</p>
            <Downloader />
        </div>
    );
};

export default Home;