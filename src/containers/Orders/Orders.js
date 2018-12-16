import React, { Component } from 'react';
import axios from '../../axios-orders';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
    componentDidMount() {
       this.props.onFetchOrders();
    }

    render() {
        let orders = <Spinner />;
        if( !this.props.loading) {
            orders = this.props.orders.map( order => (
                <Order
                    key={order.id}
                    ingredients={order.burger}
                    price={order.price} />
            ) )
        }
        return (
            <section>
                {orders}
            </section>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.orders.orders,
        loading: state.orders.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: () => dispatch(actions.fetchOrders())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)( WithErrorHandler(Orders, axios)); 