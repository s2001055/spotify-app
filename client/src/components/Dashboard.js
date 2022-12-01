import { Container, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Dashboard = ({ accessToken }) => {
    return (
        <Container className="mt-5 col-lg-6">
            <Card>
                <Card.Header>Tietoa sivusta</Card.Header>
                <Card.Body>
                    <Card.Text>Sivulla pystyy hakemaan Spotify API:n avulla artisteja, albumeita ja soittolistoja. Sivuilla pystyy myös navigoimaan artistin Spotify sivulle, sekä soittamaan artistin tekemiä albumeita. Voit halutessa hyödyntää alla olevia linkkejä tai käyttää navigointipalkkia.</Card.Text>
                    {accessToken && (
                        <>
                            <Link to="/artists" className="btn btn-primary btn-sm card-link">Hae artisteja</Link>
                            <Link to="/albums" className="btn btn-primary btn-sm card-link">Hae albumeita</Link>
                            <Link to="/playlists" className="btn btn-primary btn-sm card-link">Hae soittolistoja</Link>
                        </>
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
}

export default Dashboard;