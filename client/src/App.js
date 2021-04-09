import React, {Component} from 'react';
import axios from 'axios';

export default class App extends Component {

    state = {
        cars: []
    }

    componentDidMount() {
        axios.get('/api/cars')
            .then( response => {
                console.log(response.data)
                this.setState({
                    cars: response.data
                })
            })
    }

    addCar() {
        axios.post('/api/car/add', {
                brand: 'Mazda',
                model: '626',
                year: 2004,
                available: true
            })
            .then( response => console.log(response.data) )
    }

    render() {
        return (
            <div className="App">

                { this.state.cars && (
                    this.state.cars.map( car => (<div key={car._id}>Model: {car.model}</div>) )
                ) }

                <button onClick={this.addCar}>Add car to DB</button>
            </div>
        );
    }
}
