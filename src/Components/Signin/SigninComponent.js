import React from 'react';
import { Link } from 'react-router-dom';

const SigninComponent = (props) => {
    return (
        <div className="container pt-5">
            <Link to={{pathname:'/signin'}} onClick={props.signup}>
                <h3 className="text-center">
                <i className="fab fa-google"></i> {props.heading.substr(1,1).toUpperCase()+props.heading.substr(2,props.heading.length)} using Google
                </h3>
            </Link>
        </div>
    );
}

export default SigninComponent;