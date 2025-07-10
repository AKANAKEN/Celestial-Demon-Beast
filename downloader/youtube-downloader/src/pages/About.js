import React from 'react';

const About = () => {
    return (
        <div className="about-container">
            <h1>About This Project</h1>
            <p>
                This website allows users to download video and audio files from YouTube links. 
                Our goal is to provide a simple and efficient way for users to access their favorite content offline.
            </p>
            <h2>Features</h2>
            <ul>
                <li>Download videos and audio from YouTube</li>
                <li>Simple and user-friendly interface</li>
                <li>Fast processing and downloads</li>
            </ul>
            <h2>How It Works</h2>
            <p>
                Users can paste a YouTube link into the provided input field, select the desired format, 
                and click the download button to retrieve their content.
            </p>
            <h2>Technologies Used</h2>
            <p>
                This project is built using React for the frontend, with additional libraries for handling 
                API requests and managing state.
            </p>
        </div>
    );
};

export default About;