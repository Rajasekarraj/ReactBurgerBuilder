import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders: [],
    spinner: false,
    purchased: false,
    orderLoader: false
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.PURCHASE_INIT:
            return {
                ...state,
                purchased: false
            }
        case actionTypes.PURCHASE_BURGER_START:
            return {
                ...state,
                spinner: true
            }
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            let newOrder = {
                ...action.orderData,
                id: action.orderId
            }
           return {
               ...state,
               spinner: false,
               orders: state.orders.concat(newOrder),
               purchased: true
           } 
        case actionTypes.PURCHASE_BURGER_FAILED:
            return {
                ...state,
                spinner: true
            }
        case actionTypes.ORDER_FETCH_INIT:
            return {
                ...state,
                orderLoader: true
            }    
        case actionTypes.ORDER_FETCH_SUCCESS:
            return {
                ...state,
                orders: action.orders,
                orderLoader: false
            }
        case actionTypes.ORDER_FETCH_FAILED:
            return {
                ...state,
                orderLoader: false
            } 
        default:
            return state;        
    }
}

export default reducer;