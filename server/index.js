require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const SpotifyWebApi = require('spotify-web-api-node');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/login', async (req, res) => {
    const spotifyApi = new SpotifyWebApi({
        redirectUri: process.env.REDIRECT_URI,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET
    });

    try {
        const data = await spotifyApi.authorizationCodeGrant(req.body.code);

        res.json({
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in
        });
    } catch(err) {
        res.sendStatus(400);
    }
});

app.post('/refresh', async (req, res) => {
    const refreshToken = req.body.refreshToken;
    const spotifyApi = new SpotifyWebApi({
        redirectUri: process.env.REDIRECT_URI,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken
    });

    try {
        const data = await spotifyApi.refreshAccessToken();

        res.json({
            accessToken: data.body.access_token,
            expiresIn: data.body.expires_in
        });
    } catch(err) {
        res.sendStatus(400);
    }
});

app.listen(process.env.PORT, (err) => {
    if (err) return console.error(err);
    console.log(`Server is running on port ${process.env.PORT}`);
});