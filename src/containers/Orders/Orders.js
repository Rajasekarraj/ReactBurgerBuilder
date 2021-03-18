import React, { Component } from 'react';
import classes from './Orders.css';
import Order from '../../components/Order/Order';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
    
    componentDidMount() {
        this.props.getOrders(this.props.token, this.props.userId);
    }

    render() {
        // let ingredients = this.state.orders.ingredients;
        // let price = this.state.orders.price;
        let orders = <Spinner />
        if(!this.props.loader) {
            console.log(this.props.orders);
            orders = orders = this.props.orders.map(order => {
                return <Order
                    key = {order.id}
                    ingredients = {order.ingredients}
                    price = {order.price} />
            });
        }
        return(
            <div className={classes.Order}>
                {orders}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loader: state.order.orderLoader,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getOrders: (token, userId) => dispatch(actions.getOrders(token, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);