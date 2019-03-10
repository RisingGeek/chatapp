import React, { Component } from 'react';
import firebase from '../../Firebase/firebase';
import 'firebase/database';
import UserComponent from '../../Components/Home/UserComponent';
import { connect } from 'react-redux';
import axios from 'axios';


class Home extends Component {
    state = {
        users: []
    }
    componentDidMount() {
        axios.get('http://localhost:5001/getusers')
        .then(response => {
            this.setState({ users: response.data.users });
        })
    }
    render() {
        return (
            <div className="container pt-5">
                <UserComponent users={this.state.users} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.token
    }
}

export default connect(mapStateToProps)(Home);