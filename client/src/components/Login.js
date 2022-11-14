import './styles/Login.css';

const authUrl = 'https://accounts.spotify.com/authorize?client_id=4e77cab454d1475281fbd1817dd05660&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state&show_dialog=true';

const Login = () => {
    return (
        <div className="login">
            <a href={authUrl} className="btn btn-outline-success">Kirjaudu sisään</a>
        </div>
    );
}

export default Login;