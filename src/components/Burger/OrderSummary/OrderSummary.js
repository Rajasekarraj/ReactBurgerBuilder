import React from 'react';

import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return (
                <li key={igKey}>
                    <span style={{textTransform: 'capitalize'}}>{igKey}</span>:{props.ingredients[igKey]}
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
            <strong>Total Price: {props.finalPrice.toFixed(2)}</strong>
            <p>Do you want to checkout?</p>
            <Button btnType="Danger" clicked={props.orderCancelHandler}>CANCEL</Button>
            <Button btnType="Success" clicked={props.orderContinueHandler}>CONTINUE</Button>
        </Aux>
    );
};

export default orderSummary;