import { useState, useEffect } from 'react';
import { Container, FormControl, Card, Row, Button } from 'react-bootstrap';
import SpotifyWebApi from 'spotify-web-api-node';
import '../styles/Artists.css';

const spotifyApi = new SpotifyWebApi({ clientId: '4e77cab454d1475281fbd1817dd05660' });

const Artists = ({ accessToken }) => {
    const [artists, setArtists] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        if (!accessToken) return;
        spotifyApi.setAccessToken(accessToken);
    }, [accessToken]);

    useEffect(() => {
        if (!search) return setArtists([]);
        if (!accessToken) return;

        let cancel = false;

        spotifyApi.searchArtists(search).then((result) => {
            if (cancel) return;

            setArtists(result.body.artists.items.map((artist) => {
                return {
                    name: artist.name,
                    uri: artist.uri,
                    image: artist.images[1].url,
                    followers: artist.followers.total,
                    popularity: artist.popularity,
                    link: artist.external_urls.spotify
                }
            }));
        });

        return () => cancel = true;
    }, [search, accessToken]);

    return (
        <>
            <Container className="p-4 mt-5 mb-5 border rounded">
                <Container className="mb-4 text-center border-bottom">
                    <h5>Artistit</h5>
                </Container>

                <Container className="col-5 mb-4">
                    <FormControl
                        type="text"
                        placeholder="Hae artisteja..."
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </Container>

                <Row className="row-col-4 g-3">
                    {artists.map(artist => (
                        <div className="col-md-3">
                            <Card>
                                <Card.Img src={artist.image} className='p-3' style={{ borderRadius: '20px' }} />

                                <Card.Body>
                                    <Card.Title>{artist.name}</Card.Title>
                                    <Card.Subtitle className="card-subtitle mb-2 text-muted">Seuraajat: {artist.followers.toLocaleString()}</Card.Subtitle>
                                    <Card.Text></Card.Text>
                                    <Button href={artist.link} target="_blank" className="btn-sm" variant="outline-success">Spotify linkki</Button>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                </Row>
            </Container>
        </>
    );
}

export default Artists;