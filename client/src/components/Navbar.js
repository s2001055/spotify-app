import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './styles/Navbar.css';

const Navbar = () => {
    return (
        <>
            <Nav>
                <Link className="logo" to="/">Spotify App</Link>
                <Link to="/dashboard">Kotisivu</Link>
                <Link to="/artists">Artistit</Link>
                <Link to="/albums">Albumit</Link>
                <Link to="/playlists">Soittolistat</Link>
            </Nav>
        </>
    );
}

export default Navbar;