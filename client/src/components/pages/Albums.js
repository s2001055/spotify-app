import { useState, useEffect } from 'react';
import { Container, FormControl, Card, Row, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import SpotifyWebApi from 'spotify-web-api-node';
import Player from '../Player';
import '../styles/Albums.css';

const spotifyApi = new SpotifyWebApi({ clientId: '4e77cab454d1475281fbd1817dd05660' });

const Albums = ({ accessToken }) => {
    const [albums, setAlbums] = useState([]);
    const [search, setSearch] = useState('');
    const [playingAlbum, setPlayingAlbum] = useState();

    useEffect(() => {
        if (!accessToken) return;
        spotifyApi.setAccessToken(accessToken);
    }, [accessToken]);

    useEffect(() => {
        if (!search) return setAlbums([]);
        if (!accessToken) return;

        let cancel = false;
        
        spotifyApi.searchAlbums(`album:${search}`).then((result) => {
            if (cancel) return;

            setAlbums(result.body.albums.items.map((track) => {
                return {
                    artist: track.artists[0].name,
                    album: track.name,
                    uri: track.uri,
                    image: track.images[1].url,
                    link: track.external_urls.spotify,
                    isPlaying: false
                }
            }));
        });

        return () => cancel = true;
    }, [search, accessToken]);

    const handleToggleMusic = (albumUri) => {
        setAlbums(albums.map(album => {
            if (album.isPlaying) {
                return {
                    ...album,
                    isPlaying: false
                }
            }

            if (albumUri === playingAlbum?.uri) {
                setPlayingAlbum('');
            }

            if (album.uri === albumUri) {
                setPlayingAlbum(album);

                return {
                    ...album,
                    isPlaying: true
                }
            }

            return album;
        }));
    }

    return (
        <>
            <Container className='p-4 mt-5 mb-5 border rounded'>
                <Container className='mb-4 text-center border-bottom'>
                    <h5>Albumit</h5>
                </Container>

                <Container className='col-5 mb-4'>
                    <FormControl
                        placeholder='Hae albumeita...'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </Container>

                <Container className="mb-4">
                    <Player accessToken={accessToken} trackUri={playingAlbum?.uri} />
                </Container>

                <Row className='row-col-4 g-3'>
                    {albums.map((album) => (
                        <div className='col-md-3' key={album.uri}>
                            <Card>
                                <Card.Img src={album.image} className='p-3' style={{ borderRadius: '20px' }} />
                                
                                <Card.Body>
                                    <Card.Title>{album.album}</Card.Title>
                                    <Card.Subtitle className="card-subtitle mb-2 text-muted">{album.artist}</Card.Subtitle>
                                    <Card.Text></Card.Text>

                                    {album.isPlaying ?
                                        <Button
                                            onClick={() => handleToggleMusic(album.uri)}
                                            className='btn-sm card-link'
                                            variant='danger'
                                        >
                                            <FontAwesomeIcon icon={faPause} />
                                            <span>Lopeta kuuntelu</span>
                                        </Button>
                                        :
                                        <Button
                                            onClick={() => handleToggleMusic(album.uri)}
                                            className='btn-sm card-link'
                                            variant='success'
                                        >
                                            <FontAwesomeIcon icon={faPlay} />
                                            <span>Soita kappale</span>
                                        </Button>
                                    }

                                    <Button href={album.link} target="_blank" className="btn-sm card-link" variant="outline-secondary">Spotify linkki</Button>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                </Row>
            </Container>
        </>
    );
}

export default Albums;