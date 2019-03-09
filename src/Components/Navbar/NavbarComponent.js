import React from 'react';
import { Link } from 'react-router-dom';

const NavbarComponent = (props) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to={{pathname: '/'}} className="navbar-brand" href="#">Navbar</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                    <Link to={{pathname: '/'}} className="nav-link">Home <span className="sr-only">(current)</span></Link>
                </li>
                {
                    props.loggedIn?null:
                    <li className="nav-item">
                        <Link to={{pathname: '/login'}} className="nav-link">Login</Link>
                    </li>
                }
                {
                    props.loggedIn?null:
                    <li className="nav-item">
                        <Link to={{pathname: '/signup'}} className="nav-link">Signup</Link>
                    </li>
                }
                {
                    props.loggedIn?
                    <li className="nav-item">
                        <Link to={{pathname: '/'}} className="nav-link" onClick={props.logout}>Logout</Link>
                    </li>:null
                }
                </ul>
            </div>
            </nav>
    );
}

export default NavbarComponent;