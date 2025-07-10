import React, { useState } from 'react';

const Downloader = () => {
    const [url, setUrl] = useState('');
    const [format, setFormat] = useState('mp4');

    const handleDownload = () => {
        // Logic to handle the download of video/audio files
        alert(`Downloading ${format} from: ${url}`);
    };

    return (
        <div className="downloader">
            <h2>Download YouTube Video/Audio</h2>
            <input
                type="text"
                placeholder="Enter YouTube URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
            />
            <select value={format} onChange={(e) => setFormat(e.target.value)}>
                <option value="mp4">MP4</option>
                <option value="mp3">MP3</option>
            </select>
            <button onClick={handleDownload}>Download</button>
        </div>
    );
};

export default Downloader;