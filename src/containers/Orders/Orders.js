import React, { Component } from 'react';
import classes from './Orders.css';
import Order from '../../components/Order/Order';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
    
    componentDidMount() {
        this.props.getOrders();
    }

    render() {
        // let ingredients = this.state.orders.ingredients;
        // let price = this.state.orders.price;
        let orders = <Spinner />
        if(!this.props.loader) {
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
        loader: state.order.orderLoader
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getOrders: () => dispatch(actions.getOrders())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);