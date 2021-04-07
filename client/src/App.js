import React, {Component} from 'react';
import axios from 'axios';

export default class App extends Component {

    state = {
        users: []
    }

    componentDidMount() {
        axios.get('/api/users')
             .then( response => {
                 this.setState({ users: response.data })
             })
            .catch( error => {
                console.log('Error on mount:', error);
            })
    }

    renderUsers() {
        const users = [...this.state.users];
        return users.map( user => <li key={user.id}>{user.name}</li>);
    }

    addUser() {
        axios.get('/api/users/add')
             .then( response => {
                 console.log('Add user to DB:', response.data);
             })
            .catch( error => {
                console.log('Add user error:', error);
            })
    }

    render() {
        return (
            <div className="App">
                Users form server:
                <ul>
                    { this.renderUsers() }
                </ul>
                <button onClick={this.addUser}>Add user</button>
            </div>
        );
    }
}
