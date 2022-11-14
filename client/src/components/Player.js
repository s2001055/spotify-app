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
            />
        </div>
    );
}

export default Player;