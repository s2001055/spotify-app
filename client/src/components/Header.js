import Login from './Login';
import Navbar from './Navbar';
import './styles/Header.css';

const Header = ({ accessToken }) => {
    return (
        <>
			<header>
				<nav>
					{accessToken && <Navbar />}
					<Login accessToken={accessToken} />
				</nav>
			</header>
        </>
    );
}

export default Header;
