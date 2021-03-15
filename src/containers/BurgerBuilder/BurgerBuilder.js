import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {

    state = {
        finalPrice: 4,
        purchasable: false,
        purchasing: false,
        spinner: false
    }

    componentDidMount() {
        // axios.get('https://react-burger-app-12166-default-rtdb.firebaseio.com/ingredients.json')
        //      .then(response => this.setState({ingredients: response.data}))
        //      .catch(error => console.log('Error while fetching ingredients'));
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
        this.props.history.push('/checkout');
    }

    render() {
        const disabledInfo = {...this.props.ings}
        for(let ingredient in disabledInfo){
            disabledInfo[ingredient] = disabledInfo[ingredient]<=0;
        }
        let orderSummary = null;
        let burger = null;
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
        if(this.state.spinner){
            orderSummary = <Spinner />
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
        ings: state.ingredients,
        fp: state.finalPrice
    }
}

const mapPropsToAction = dispatch => {
    return {
        addIngredient: (ingredientName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingredientName}),
        removeIngredient: (ingredientName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingredientName})
    }
}

export default connect(mapPropsToState, mapPropsToAction)(BurgerBuilder);