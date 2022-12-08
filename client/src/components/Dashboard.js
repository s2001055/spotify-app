import { Container, Card } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import './styles/Dashboard.css';

const authUrl = 'https://accounts.spotify.com/authorize?client_id=4e77cab454d1475281fbd1817dd05660&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state&show_dialog=true';

const Dashboard = ({ accessToken }) => {
    return (
        <>
            <Helmet>
                {accessToken ? <title>Spotify API - Kotisivu</title> : <title>Spotify API - Kirjaudu sisään</title>}
            </Helmet>

            <Container className='mt-5 col-lg-6'>
                <Card>
                    <Card.Header>Tietoa sivusta</Card.Header>
                    <Card.Body>
                        {accessToken && (
                            <Card.Text>Sivulla pystyy hakemaan Spotify API:n avulla artisteja, albumeita ja soittolistoja. Sivuilla pystyy myös navigoimaan artistin Spotify sivulle, sekä soittamaan artistin tekemiä albumeita. Voit halutessa hyödyntää alla olevia linkkejä tai käyttää navigointipalkkia.</Card.Text>
                        )}

                        <Card.Text>Huom! Sivun käyttö edellyttää kirjautumista Spotifyn kautta. Sinulla tulee myös olla Spotify Premium käyttääksesi sivun hakutoimintoja.</Card.Text>
                        
                        {accessToken ? (
                            <>
                                <Link to='/artists' className='btn btn-sm btn-primary card-link card-btn'>Hae artisteja</Link>
                                <Link to='/albums' className='btn btn-sm btn-primary card-link card-btn'>Hae albumeita</Link>
                                <Link to='/playlists' className='btn btn-sm btn-primary btn-sm card-link card-btn'>Hae soittolistoja</Link>
                            </>
                        ) : (
                            <a href={authUrl} className='btn btn-success btn-sm card-link'>Kirjaudu sisään</a>
                        )}
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
}

export default Dashboard;