import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const UserComponent = props => {
    return (
        <div className="row pt-3">
            {
                props.users ?
                props.users.map(user => (
                    <div className="col-sm-4 text-center" key={user.username}>
                    {
                        props.username===user.username ? (
                            <img src={user.photo} alt="user pic" className="img-fluid" style={{width:'50%',borderRadius:'50%'}} />
                        ) : (
                            <Link to={{pathname: `chat/${user.username.replace(/ /g,'-')}`}}>
                                <img src={user.photo} alt="user pic" className="img-fluid" style={{width:'50%',borderRadius:'50%'}} />
                            </Link>
                        ) 
                    }
                        <h3>{user.username}</h3>
                        {
                            props.username? (
                            props.username===user.username?<p>You</p>:
                            <p><Link to={{pathname: `chat/${user.username.replace(/ /g,'-')}`}}>chat</Link></p>
                            ):null
                        }
                        {
                            props.username? (
                                props.connectedUsers?
                                props.connectedUsers.map(onlineUser => (
                                    user.username===onlineUser?<p key={onlineUser}>
                                    <span style={{color:'green', fontSize:'30px', verticalAlign: 'sub'}}>&bull;</span> online
                                    </p>:null
                                )
                                ):null
                            ):null
                        }
                    </div>
                )):null
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