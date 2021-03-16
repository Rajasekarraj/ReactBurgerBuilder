import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders: [],
    spinner: false,
    purchased: false,
    orderLoading: true
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.PURCHASE_INIT:
            return {
                ...state,
                purchased: false
            }
        case actionTypes.PURCHASE_BURGER_START:
                console.log('inside purchase burger start');
            return {
                ...state,
                spinner: true
            }
        case actionTypes.PURCHASE_BURGER_SUCCESS:
                console.log('inside purchase burger success');
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
    }
    return state;
}

export default reducer;