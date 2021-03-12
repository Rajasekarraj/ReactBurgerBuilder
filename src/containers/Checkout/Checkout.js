import React, { Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

    state =  {
        ingredients: null,
        finalPrice: 0
    }

    componentWillMount() {
        console.log(this.props);
        let ingredients = {}
        const queryParams = new URLSearchParams(this.props.location.search);
        for(let q of queryParams.entries()) {
            if(q[0] === 'price') {
                this.setState({finalPrice: q[1]})
            } else {
                ingredients[q[0]] = +q[1]
            }
        }
       this.setState({ingredients: ingredients});
    }

    checkoutCancelled = () => {
        this.props.history.goBack()
    }
    checkoutCompleted = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        return(
            <div>
                <CheckoutSummary
                ingredients = {this.state.ingredients}
                checkoutCancelled = {this.checkoutCancelled}
                checkoutCompleted = {this.checkoutCompleted}
                />
                <Route path={this.props.match.path + '/contact-data'}
                 render = {(props) => (<ContactData ingredients = {this.state.ingredients} finalPrice={this.state.finalPrice} {...props}/>)} />
            </div>

        );
    }
}

export default Checkout;