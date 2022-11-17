import { useState, useEffect } from 'react';
import { Container, FormControl, Card, Row, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import SpotifyWebApi from 'spotify-web-api-node';
import '../styles/Artists.css';

const spotifyApi = new SpotifyWebApi({ clientId: '4e77cab454d1475281fbd1817dd05660' });

const Playlists = ({ accessToken }) => {
    const [playlist, setPlaylists] = useState([]);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (!accessToken) return;
        spotifyApi.setAccessToken(accessToken);
    }, [accessToken]);

    useEffect(() => {
        if (!search) return setPlaylists([]);
        if (!accessToken) return;

        let cancel = false;

        spotifyApi.searchPlaylists(search).then((result) => {
            if (cancel) return;

            setPlaylists(result.body.playlists.items.map((playlist) => {
                return {
                    name: playlist.name,
                    image: playlist.images[0]?.url,
                    owner: playlist.owner.display_name,
                    uri: playlist.uri,
                    link: playlist.external_urls.spotify
                }
            }));
        });

        return () => cancel = true;
    }, [search, accessToken]);

    if (!accessToken) return navigate('/');

    return (
        <>
            <Container className="mt-5 mb-5">
                <Card>
                    <Card.Header>Soittolistat</Card.Header>
                    <Card.Body>
                        <Container className="col-sm-5 mb-5">
                            <FormControl
                                type="text"
                                placeholder="Hae soittolistoja..."
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </Container>

                        <Row className="row-col-4 g-3">
                            {playlist.map(playlist => (
                                <div className="col-md-3" key={playlist.uri}>
                                    <Card>
                                        <Card.Img src={playlist.image} className="p-3" style={{ borderRadius: '20px', height: '100%', width: '100%' }} />
                                        <Card.Body>
                                            <Card.Title>{playlist.name}</Card.Title>
                                            <Card.Subtitle className="text-muted">{playlist.owner}</Card.Subtitle>
                                            <Card.Text></Card.Text>
                                            <Button href={playlist.link} target="_blank" className="btn-sm" variant="success">Spotify linkki</Button>
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

export default Playlists;