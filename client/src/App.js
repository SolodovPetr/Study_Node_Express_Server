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
    }

    renderUsers() {
        const users = [...this.state.users];
        return users.map( user => <li key={user.id}>{user.name}</li>);
    }

    render() {
        return (
            <div className="App">
                Users form server:
                <ul>
                    { this.renderUsers() }
                </ul>
            </div>
        );
    }

}
