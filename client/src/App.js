import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import Footer from './components/Footer';
import Artists from './components/pages/Artists';
import Albums from './components/pages/Albums';
import Playlists from './components/pages/Playlists';
import Dashboard from './components/Dashboard';
import './App.css';

const code = new URLSearchParams(window.location.search).get('code');

const App = () => {
    const [accessToken, setAccessToken] = useState();
    const [refreshToken, setRefreshToken] = useState();
    const [expiresIn, setExpiresIn] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        if (!code) return;

        const fetchData = async () => {
            try {
                const result = await axios.post('http://localhost:3001/login', { code });
                const { accessToken, refreshToken, expiresIn } = result.data;

                setAccessToken(accessToken);
                setRefreshToken(refreshToken);
                setExpiresIn(expiresIn);

                navigate('/home');
            } catch(err) {
                console.error(err);
            }
        }

        fetchData();
    }, [code]);

    useEffect(() => {
        if (!refreshToken || !expiresIn) return;

        const interval = setInterval(async () => {
            try {
                const result = await axios.post('http://localhost:3001/refresh', { refreshToken });
                const { accessToken, expiresIn } = result.data;

                setAccessToken(accessToken);
                setExpiresIn(expiresIn);
            } catch(err) {
                navigate('/');
            }
        }, (expiresIn - 60) * 1000);

        return () => clearInterval(interval);
    }, [refreshToken, expiresIn]);

    return (
        <>
            <Header accessToken={accessToken} />

            <Routes>
                <Route path="/home" element={<Dashboard accessToken={accessToken} />} />
                <Route path="/artists" element={<Artists accessToken={accessToken} />} />
                <Route path="/albums" element={<Albums accessToken={accessToken} />} />
                <Route path="/playlists" element={<Playlists accessToken={accessToken} />} />
            </Routes>
        </>
    );
}

export default App;