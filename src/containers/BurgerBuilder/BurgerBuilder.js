import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 1.0,
    meat: 1.5,
    bacon: 2.0
}

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        finalPrice: 4,
        purchasable: false,
        purchasing: false
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, currEle) => {
                return sum + currEle;
            }, 0);
        this.setState({purchasable: sum > 0})
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const newPrice = this.state.finalPrice + priceAddition;
        this.setState({ingredients: updatedIngredients, finalPrice: newPrice})
        this.updatePurchaseState(updatedIngredients);
    }

    deleteIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount<=0){
            return;
        }
        const newCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = newCount;
        const priceRemoval = INGREDIENT_PRICES[type];
        const newPrice = this.state.finalPrice - priceRemoval;
        this.setState({ingredients: updatedIngredients, finalPrice: newPrice})
        this.updatePurchaseState(updatedIngredients);
    }

    orderNowClicked = () => {
        this.setState({purchasing: true})
    }

    orderCancelled = () => {
        this.setState({purchasing: false})
    }

    orderPlaced = () => {
        alert('Order Placed, Thank You!')
    }

    render() {
        const disabledInfo = {...this.state.ingredients}
        for(let ingredient in disabledInfo){
            disabledInfo[ingredient] = disabledInfo[ingredient]<=0;
        }
        return(
            <Aux>
                <Modal show={this.state.purchasing} closed={this.orderCancelled}>
                    <OrderSummary
                     ingredients = {this.state.ingredients}
                     orderCancelHandler = {this.orderCancelled}
                     orderContinueHandler = {this.orderPlaced}
                     finalPrice = {this.state.finalPrice}/>
                </Modal>
                <Burger ingredients = {this.state.ingredients}/>
                <BuildControls ingredientAdded = {this.addIngredientHandler}
                 ingredientRemoved = {this.deleteIngredientHandler}
                 disabled = {disabledInfo}
                 price = {this.state.finalPrice}
                 purchasable = {this.state.purchasable}
                 ordered = {this.orderNowClicked}/>
            </Aux>
        );
    }
}

export default BurgerBuilder;