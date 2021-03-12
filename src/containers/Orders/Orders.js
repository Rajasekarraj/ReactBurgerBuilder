import React, { Component } from 'react';
import classes from './Orders.css';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';

class Orders extends Component {

    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        axios.get('/orders.json')
            .then(res => {
                const fetchedOrders = []
                for(let key in res.data){
                    fetchedOrders.push({
                        ...res.data[key],
                        id:key
                    })
                }
                this.setState({orders: fetchedOrders, loading: false});
                console.log(this.state.orders);
            })
            .catch(error => {
                this.setState({loading: false});
            });
    }

    render() {
        // let ingredients = this.state.orders.ingredients;
        // let price = this.state.orders.price;
        const orders = this.state.orders.map(order => {
            return <Order
                key = {order.id}
                ingredients = {order.ingredients}
                price = {order.price} />
        });
        return(
            <div className={classes.Order}>
                {orders}
            </div>
        );
    }
}

export default Orders;