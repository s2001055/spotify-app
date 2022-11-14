import { useState, useEffect } from 'react';
import { Container, FormControl, Card, Row, Button } from 'react-bootstrap';
import SpotifyWebApi from 'spotify-web-api-node';
import '../styles/Artists.css';

const spotifyApi = new SpotifyWebApi({ clientId: '4e77cab454d1475281fbd1817dd05660' });

const Playlists = ({accessToken}) => {
    const [playlist, setPlaylists] = useState([]);
    const [search, setSearch] = useState('');

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

    return (
        <>
            <Container className="p-4 mt-5 mb-5 border rounded">
                <Container className="mb-4 text-center border-bottom">
                    <h5>Soittolistat</h5>
                </Container>

                <Container className="col-5 mb-4">
                    <FormControl
                        type="text"
                        placeholder="Hae soittolistoja..."
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </Container>

                <Row className="row-col-4 g-3">
                    {playlist.map(playlist => (
                        <div className="col-md-3">
                            <Card>
                                <Card.Img className="p-3" style={{ borderRadius: '20px', height: '300px', width: '300px' }}  src={playlist.image} />
                                <Card.Body>
                                    <Card.Title>{playlist.name}</Card.Title>
                                    <Card.Text>{playlist.owner}</Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                </Row>
            </Container>
        </>
    );
}

export default Playlists;