import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const UserComponent = props => {
    return (
        <div className="row">
            {
                props.users.map(user => (
                    <div className="col-sm-4 text-center" key={user.username}>
                        <img src={user.photo} alt="user pic" className="img-fluid" />
                        <h3>{user.username}</h3>
                        {
                            props.username===user.username?<p>You</p>:
                            <Link to={{pathname: `chat/${user.username.replace(/ /g,'-')}`}}>chat</Link>
                        }
                        
                    </div>
                ))
            }
        </div>
    );
}

const mapStateToProps = state => {
    return {
        username: state.username
    }
}

export default connect(mapStateToProps)(UserComponent);