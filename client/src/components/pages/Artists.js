import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Container, FormControl, Card, Row, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import SpotifyWebApi from 'spotify-web-api-node';
import '../styles/Artists.css';

const spotifyApi = new SpotifyWebApi({ clientId: '4e77cab454d1475281fbd1817dd05660' });

const Artists = ({ accessToken }) => {
    const [artists, setArtists] = useState([]);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (!accessToken) return;
        spotifyApi.setAccessToken(accessToken);
    }, [accessToken]);

    useEffect(() => {
        if (!search) return setArtists([]);
        if (!accessToken) return;

        let cancel = false;

        spotifyApi.searchArtists(search, { limit: 48 }).then((result) => {
            if (cancel) return;

            setArtists(result.body.artists.items.map((artist) => {
                return {
                    name: artist.name,
                    uri: artist.uri,
                    image: artist.images[1]?.url,
                    followers: artist.followers.total,
                    popularity: artist.popularity,
                    link: artist.external_urls.spotify
                }
            }));
        });

        return () => cancel = true;
    }, [search, accessToken]);

    if (!accessToken) return navigate('/');

    return (
        <>
            <Helmet>
                <title>Spotify API - Artistit</title>
            </Helmet>

            <Container className="mt-5 mb-5">
                <Card>
                    <Card.Header>Artistit</Card.Header>
                    <Card.Body>
                        <Container className="col-sm-5 mb-3">
                            <FormControl
                                type="text"
                                placeholder="Hae artisteja..."
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </Container>

                        <Row className="row-col-4 g-3">
                            {artists.map(artist => (
                                <div className="col-md-3" key={artist.uri}>
                                    <Card>
                                        <Card.Img src={artist.image} className='p-3' style={{ borderRadius: '20px', height: '320px' }} />

                                        <Card.Body>
                                            <Card.Title>{artist.name}</Card.Title>
                                            <Card.Subtitle className="card-subtitle mb-2 text-muted">Seuraajat: {artist.followers.toLocaleString()}</Card.Subtitle>
                                            <Card.Text></Card.Text>
                                            <Button href={artist.link} target="_blank" className="btn-sm" variant="success">Spotify linkki</Button>
                                        </Card.Body>
                                    </Card>
                                </div>
                            ))}
                        </Row>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
}

export default Artists;