import React from 'react';
import { Link } from 'react-router-dom';

const SignupComponent = (props) => {
    return (
        <div className="container">
            <Link to={{pathname:'/signup'}} onClick={props.signup}>
                <h3 className="text-center">Signup using Google</h3>
            </Link>
        </div>
    );
}

export default SignupComponent;