import React, { Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class Checkout extends Component {

    checkoutCancelled = () => {
        this.props.history.goBack()
    }
    checkoutCompleted = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        let summary = <Redirect to = "/"/>;
        const purchaseRedirect = this.props.purchased ? <Redirect to="/"/> : null;
        if(this.props.ingrs) {
            summary = (
                <div>
                    {purchaseRedirect}
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
        return summary;
    }
}

const mapPropsToState = state => {
    return {
        ingrs: state.bgrBuilder.ingredients,
        purchased: state.order.purchased
    }
}

export default connect(mapPropsToState)(Checkout);