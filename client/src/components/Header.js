import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import * as AiIcons from 'react-icons/ai';
import './styles/Header.css';

const authUrl = 'https://accounts.spotify.com/authorize?client_id=4e77cab454d1475281fbd1817dd05660&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state&show_dialog=true';

const Header = ({ accessToken }) => {
	const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);

    return (
        <>
			<header>
				<nav>
					<Link className='logo' to='/'>Spotify API</Link>
					{accessToken && <Navbar />}

					<div className='menu-active'>
						<AiIcons.AiOutlineMenu className='sidebar-icons' onClick={showSidebar} />
					</div>

					<div className={sidebar ? 'sidebar active' : 'sidebar'}>
						<div className='sidebar-items'>
							<div className='sidebar-close'>
								<AiIcons.AiOutlineClose className='sidebar-icons' onClick={showSidebar} />
							</div>

							{accessToken && (
								<li className='sidebar-links' onClick={showSidebar}>
									<Link to='/'>Kotisivu</Link>
									<Link to='/artists'>Artistit</Link>
									<Link to='/albums'>Albumit</Link>
									<Link to='/playlists'>Soittolistat</Link>
								</li>
							)}

							{accessToken ? <a href='/' className='btn btn-sm btn-danger login-button'>Kirjaudu ulos</a> : <a href={authUrl} className='btn btn-sm btn-success login-button'>Kirjaudu sisään</a>}
						</div>
					</div>

					<div className='login'>
						{accessToken ? <a href='/' className='btn btn-sm btn-danger'>Kirjaudu ulos</a> : <a href={authUrl} className='btn btn-sm btn-success'>Kirjaudu sisään</a>}
					</div>
				</nav>
			</header>
        </>
    );
}

export default Header;
