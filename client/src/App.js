import React, {Component} from 'react';
import axios from 'axios';

export default class App extends Component {

    componentDidMount() {
        axios.get('/api/users').then( response => {
            console.log(response);
        })
    }


    render() {
        return (
            <div className="App">
                Hello, World!
            </div>
        );
    }

}
