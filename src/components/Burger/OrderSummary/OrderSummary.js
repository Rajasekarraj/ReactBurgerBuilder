import React, { Component } from 'react';

import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

// This component can be a Functional component(Overrided the componentWillUpdate method to improve performance)
class OrderSummary extends Component {

    componentWillUpdate(){
        console.log('[OrderSummary.js]', 'Component rendered');
    }

    render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(igKey => {
            return (
                <li key={igKey}>
                    <span style={{textTransform: 'capitalize'}}>{igKey}</span>:{this.props.ingredients[igKey]}
                </li>
            )
        });

    return (
        <Aux>
            <h3>Your Order</h3>
            <p>Fantasic burger with all the below ingredients</p>
            <ul>
                {ingredientSummary}
            </ul>
            <strong>Total Price: {this.props.finalPrice.toFixed(2)}</strong>
            <p>Do you want to checkout?</p>
            <Button btnType="Danger" clicked={this.props.orderCancelHandler}>CANCEL</Button>
            <Button btnType="Success" clicked={this.props.orderContinueHandler}>CONTINUE</Button>
        </Aux>
    );
    }
}

export default OrderSummary;