import React from 'react';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import { Link} from 'react-router-dom';
import { Route } from 'react-router-dom';
import Logout from './Logout';





const Header = () => {
    
    const history = useHistory();

    const userState = useSelector(state => state.session.userState)
    const userPseudo= useSelector(state => state.session.pseudo)
    
    
    function handleLogout() {
        localStorage.clear();
        sessionStorage.clear();
        history.push('/home');
    }
    
    
    
    
    
    return (
        <nav className="uk-navbar-container uk-flex uk-flex-left uk-margin-large-bottom uk-navbar">
        <div className="uk-navbar-left">
        <ul className="uk-navbar-nav">
        <li className="uk-active"><a href="/home">Forumy</a></li>
        <li className="uk-active"><Link to="/topic">Topics</Link></li>
        </ul>
        </div>
        <div className="uk-navbar-right uk-flex uk-flex-right">
        <ul className="uk-navbar-nav">
        {!(userState === "Logged in") &&
        <li className="uk-active"><Link to="/signup">Sign up</Link></li>}
        {!(userState === "Logged in") &&
        <li className="uk-active"><Link to="/login">Login</Link></li>
    }
    {(userState === "Logged in") &&
    <li>
    <button class="uk-button uk-button-default" type="button">{ userPseudo }</button>
    <div uk-dropdown="mode: click">
    <ul class="uk-nav uk-dropdown-nav">
    
    <li><a href="#">Profil</a></li>
    <li class="uk-nav-divider"></li>
    <li><a href="/logout" >Se déconnecter</a></li>
    </ul>
    </div>
    </li>
    
}

</ul>
</div>
</nav>
)
}

export default Header;