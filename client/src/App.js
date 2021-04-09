import React, {Component} from 'react';
import axios from 'axios';

export default class App extends Component {

    addCar() {
        axios.post('/api/car/add', {
                brand: 'Honda',
                model: 'Civic',
                year: 'not valid',
                available: true
            })
            .then( response => console.log(response.data) )
    }

    render() {
        return (
            <div className="App">
                <button onClick={this.addCar}>Add car to DB</button>
            </div>
        );
    }
}
