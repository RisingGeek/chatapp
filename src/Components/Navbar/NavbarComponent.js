import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import styles from './navbar.module.css';
import cx from 'classnames';

const NavbarComponent = (props) => {
    return (
        <Fragment>
        <nav className={cx('navbar', ['navbar-expand-lg'], styles.pcshow)}>
            <Link to={{pathname: '/'}} className="navbar-brand text-white" href="#">Chat App</Link>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                    <Link to={{pathname: '/'}} className="nav-link text-white">Home <span className="sr-only">(current)</span></Link>
                </li>
                {
                    props.loggedIn?null:
                    <li className="nav-item">
                        <Link to={{pathname: '/signin'}} className="nav-link text-white">Signin</Link>
                    </li>
                }
                {
                    props.loggedIn?
                    <li className="nav-item">
                        <Link to={{pathname: '/chats'}} className="nav-link text-white">Chats</Link>
                    </li>:null
                }
                {
                    props.loggedIn?
                    <li className="nav-item">
                        <Link to={{pathname: '/'}} className="nav-link text-white" onClick={props.logout}>Logout</Link>
                    </li>:null
                }
                </ul>
            </div>
            </nav>
            <nav className={cx(styles.mobileshow)}>
                <ul className="pt-2">
                    <li>
                        <Link to={{pathname: '/'}} className="nav-link text-white">Home <span className="sr-only">(current)</span></Link>
                    </li>
                    {
                        props.loggedIn?null:
                        <li>
                            <Link to={{pathname: '/signin'}} className="nav-link text-white">Signin</Link>
                        </li>
                    }
                    {
                        props.loggedIn?
                        <li>
                            <Link to={{pathname: '/chats'}} className="nav-link text-white">Chats</Link>
                        </li>:null
                    }
                    {
                        props.loggedIn?
                        <li>
                            <Link to={{pathname: '/'}} className="nav-link text-white" onClick={props.logout}>Logout</Link>
                        </li>:null
                    }
                    </ul>
            </nav>
            </Fragment>
    );
}

export default NavbarComponent;