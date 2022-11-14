import { Link } from 'react-router-dom';
import Login from './Login';
import Navbar from './Navbar';
import './styles/Header.css';

const Header = ({ accessToken }) => {
    return (
        <>
			<header>
				<nav>
					{accessToken ? <Navbar /> : <Login />}
				</nav>
			</header>
        </>
    );
}

export default Header;
