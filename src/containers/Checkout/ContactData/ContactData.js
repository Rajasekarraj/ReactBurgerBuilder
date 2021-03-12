import React, { Component } from 'react';
import classes from './ContactData.css';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {

    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        spinner: false
    }

    componentDidMount() {
        console.log(this.props);
    }

    orderPlaced = (event) => {
        event.preventDefault();
        console.log(this.props.ingredients);
        this.setState({spinner: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.finalPrice,
            customer: {
                name: 'Rajasekar',
                email: 'testemail@123.com',
                address: {
                    streetName: '21/4,Nehru St',
                    city: 'Chennai',
                    zipCode: '321903'
                }
            }
        }
        axios.post('/orders.json', order)
            .then(response => {
                console.log(response);
                this.setState({spinner: false});
            })
            .catch(error => {
                console.log(error)
                this.setState({spinner: false});
            })
        this.props.history.push('/') 
    }

    render() {
        let form = (<form>
            <input className={classes.Input} type="text" name="name" placeholder="Your Name"></input>
            <input className={classes.Input} type="email" name="email" placeholder="Your Mail"></input>
            <input className={classes.Input} type="text" name="street" placeholder="Street"></input>
            <input className={classes.Input} type="text" name="postal" placeholder="PostalCode"></input>
            <Button btnType='Success' clicked={this.orderPlaced}>ORDER</Button>
        </form>);

        if(this.state.spinner) {
            form = <Spinner />
        }
        
        return(
            <div className={classes.ContactData}>
                <h4>Enter your delivery address</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;