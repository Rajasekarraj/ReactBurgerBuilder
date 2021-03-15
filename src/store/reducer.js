import * as actionTypes from './actions';

const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    finalPrice: 4
}

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 1.0,
    meat: 1.5,
    bacon: 2.0
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                finalPrice: state.finalPrice + INGREDIENT_PRICES[action.ingredientName]
            }
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                finalPrice: state.finalPrice - INGREDIENT_PRICES[action.ingredientName]
            }      
    }
    return state;
}

export default reducer;