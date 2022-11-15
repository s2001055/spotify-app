import { useState, useEffect } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';
import './styles/Player.css';

const Player = ({ accessToken, trackUri }) => {
    const [play, setPlay] = useState(false);

    useEffect(() => trackUri ? setPlay(true) : setPlay(false), [trackUri]);

    return (
        <div className="player-container">
            <SpotifyPlayer
                token={accessToken}
                showSaveIcon
                callback={state => {
                    if (!state.isPlaying) setPlay(false);
                }}
                play={play}
                uris={trackUri ? [trackUri] : []}
                styles={{
                    activeColor: 'limegreen',
                    bgColor: '#212529',
                    color: '#fff',
                    loaderColor: '#fff',
                    sliderColor: '#0096FF',
                    trackArtistColor: '#ccc',
                    trackNameColor: '#fff',
                }}
            />
        </div>
    );
}

export default Player;