import React, { Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';

class Checkout extends Component {

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
                ingredients = {this.props.ingrs}
                checkoutCancelled = {this.checkoutCancelled}
                checkoutCompleted = {this.checkoutCompleted}
                />
                <Route path={this.props.match.path + '/contact-data'}
                 component={ContactData}/>
            </div>

        );
    }
}

const mapPropsToState = state => {
    return {
        ingrs: state.ingredients
    }
}

export default connect(mapPropsToState)(Checkout);