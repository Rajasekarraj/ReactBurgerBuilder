import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
    console.log('purchase burger success action creator', id, orderData)
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAILED,
        error: error
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = (token, orderData) => {
    return dispatch => {
        console.log('Inside Purchase burger')
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json?auth=' + token, orderData)
            .then(response => {
                console.log(response.data);
                dispatch(purchaseBurgerSuccess(response.data.name, orderData));
            })
            .catch(error => {
                dispatch(purchaseBurgerFail(error));
            }) 
    }
}

export const getOrders = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrderInit());
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get('/orders.json'+queryParams)
            .then(res => {
                const fetchedOrders = []
                for(let key in res.data){
                    fetchedOrders.push({
                        ...res.data[key],
                        id:key
                    })
                }
                dispatch(orderFetchingSuccess(fetchedOrders))
            })
            .catch(error => {
                dispatch(orderFetchingFail())
            });
    }
}

export const orderFetchingSuccess = (orders) => {
    return {
        type: actionTypes.ORDER_FETCH_SUCCESS,
        orders: orders
    }
}

export const orderFetchingFail = () => {
    return {
        type: actionTypes.ORDER_FETCH_FAILED
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

export const fetchOrderInit = () => {
    return {
        type: actionTypes.ORDER_FETCH_INIT
    }
}