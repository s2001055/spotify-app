import { Container, Card } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import './styles/Dashboard.css';

const Dashboard = ({ accessToken, authUrl }) => {
    return (
        <>
            <Helmet>
                {accessToken ? <title>Spotify API - Kotisivu</title> : <title>Spotify API - Kirjaudu sisään</title>}
            </Helmet>

            <div className='bg-image'>
                <div className='filter-blur'></div>
            </div>

            <Container className='mt-5 col-lg-6'>
                <Card>
                    <Card.Header>Tietoa sivusta</Card.Header>
                    <Card.Body>
                        {accessToken && <Card.Text>Sivulla pystyy hakemaan Spotify API:n avulla artisteja, albumeita ja soittolistoja. Sivuilla pystyy myös navigoimaan artistin Spotify sivulle, sekä soittamaan artistin tekemiä albumeita. Voit halutessa hyödyntää alla olevia linkkejä tai käyttää navigointipalkkia.</Card.Text>}

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