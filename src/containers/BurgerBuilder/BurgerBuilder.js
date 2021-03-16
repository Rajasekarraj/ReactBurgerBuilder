import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class BurgerBuilder extends Component {

    state = {
        purchasing: false
    }

    componentDidMount() {
        this.props.initIngredients();
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, currEle) => {
                return sum + currEle;
            }, 0);
        return sum > 0;
    }

    orderNowClicked = () => {
        this.setState({purchasing: true})
    }

    orderCancelled = () => {
        this.setState({purchasing: false})
    }

    orderPlaced = () => {
        // alert('Order Placed, Thank You!')
        this.props.initPurchase();
        this.props.history.push('/checkout');
    }

    render() {
        const disabledInfo = {...this.props.ings}
        for(let ingredient in disabledInfo){
            disabledInfo[ingredient] = disabledInfo[ingredient]<=0;
        }
        let orderSummary = null;
        let burger = this.props.error ? <p>Error while loading ingredients</p> : null;
        if(this.props.ings){
            burger = (
                <Aux>
                    <Burger ingredients = {this.props.ings}/>
                    <BuildControls ingredientAdded = {this.props.addIngredient}
                    ingredientRemoved = {this.props.removeIngredient}
                    disabled = {disabledInfo}
                    price = {this.props.fp}
                    purchasable = {this.updatePurchaseState(this.props.ings)}
                    ordered = {this.orderNowClicked}/>
                </Aux>
            )
            orderSummary = <OrderSummary
                            ingredients = {this.props.ings}
                            orderCancelHandler = {this.orderCancelled}
                            orderContinueHandler = {this.orderPlaced}
                            finalPrice = {this.props.fp}/>;
        }
        return(
            <Aux>
                <Modal show={this.state.purchasing} closed={this.orderCancelled}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapPropsToState = state => {
    return {
        ings: state.bgrBuilder.ingredients,
        fp: state.bgrBuilder.finalPrice,
        error: state.bgrBuilder.error
    }
}

const mapPropsToAction = dispatch => {
    return {
        addIngredient: (ingredientName) => dispatch(actions.addIngredient(ingredientName)),
        removeIngredient: (ingredientName) => dispatch(actions.removeIngredient(ingredientName)),
        initIngredients: () => dispatch(actions.initIngredients()),
        initPurchase: () => dispatch(actions.purchaseInit())
    }
}

export default connect(mapPropsToState, mapPropsToAction)(BurgerBuilder);