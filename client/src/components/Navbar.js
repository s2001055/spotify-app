import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './styles/Navbar.css';

const Navbar = () => {
    return (
        <>
            <Nav>
                <Link className="logo" to="/home">Spotify App</Link>
                <Link className="nav-link" to="/home">Kotisivu</Link>
                <Link className="nav-link" to="/artists">Artistit</Link>
                <Link className="nav-link" to="/albums">Albumit</Link>
                <Link className="nav-link" to="/playlists">Soittolistat</Link>
            </Nav>
        </>
    );
}

export default Navbar;