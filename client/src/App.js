import React, {Component} from 'react';
import axios from 'axios';

export default class App extends Component {

    state = {
        cars: [],
        brand: '',
        delete: ''
    }

    componentDidMount() {
        this.renderCars();
    }

    renderCars() {
        axios.get('/api/cars')
            .then( response => {
                console.log(response.data)
                this.setState({
                    cars: response.data
                })
            })
    }

    addCar = () => {
        axios.post('/api/car/add', {
                brand: this.state.brand,
                model: 'dummy - ' + this.state.brand,
                year: 2004,
                available: true
            })
            .then( response => {
                this.setState((state) => ({
                    cars: [...state.cars, response.data]
                }))
            })
    }

    updateCar = () => {
        axios.post('/api/car/update', {
                _id: "60703b1a11352538982f9c34",
                model: 'Mango'
            })
            .then( res => {
                this.renderCars()
                console.log(res.data)
            })
    }

    removeOneCar = () => {
        axios.post('/api/car/delete', { brand: this.state.delete })
                .then( res => this.renderCars() )
    }

    setCarToDelete(e) {
        this.setState({
            delete: e.target.value
        })
    }

    setCarToAdd(e) {
        this.setState({
            brand: e.target.value
        })
    }

    render() {
        return (
            <div className="App">

                { this.state.cars && (
                    this.state.cars.map( car => (<div key={car._id}>Model: {car.model}</div>) )
                ) }

                <select onChange={e => this.setCarToAdd(e)}>
                    <option value="">--Add car--</option>
                    <option value="ford">Ford</option>
                    <option value="mazda">Mazda</option>
                    <option value="honda">Honda</option>
                    <option value="toyota">Toyota</option>
                </select>
                { this.state.brand && (
                    <button onClick={this.addCar}>Add {this.state.brand}</button>
                ) }

                <select onChange={e => this.setCarToDelete(e)}>
                    <option value="">--Delete--</option>
                    <option value="ford">Ford</option>
                    <option value="mazda">Mazda</option>
                    <option value="honda">Honda</option>
                    <option value="toyota">Toyota</option>
                </select>
                { this.state.delete && (
                    <button onClick={this.removeOneCar}>Remove {this.state.delete}</button>
                ) }

                <button onClick={this.updateCar}>Update</button>

            </div>
        );
    }
}
