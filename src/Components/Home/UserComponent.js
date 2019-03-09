import React from 'react';
import { Link } from 'react-router-dom';

const UserComponent = props => {
    return (
        <div className="row">
            {
                props.users.map(user => (
                    <div className="col-sm-4 text-center" key={user.token}>
                        <img src={user.photo} alt="user pic" className="img-fluid" />
                        <h3>{user.username}</h3>
                        <Link to={{pathname: `chat/${user.token}`}}>chat</Link>
                    </div>
                ))
            }
        </div>
    );
}

export default UserComponent;