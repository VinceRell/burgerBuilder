import React, { Component } from 'react';
import axios from '../../axios-orders';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import Order from '../../components/Order/Order';

class Orders extends Component {

    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        axios.get("/orders.json")
            .then( response => {
                const fetchedOrders = [];
                for (let key in response.data) {
                    fetchedOrders.push({
                        ...response.data[key],
                        id:key
                    })
                }
                this.setState({orders: fetchedOrders, loading: false});
            })
            .catch( error => {
                this.setState({loading: false});
            });
    }

    render() {
        return (
            <section>
                {this.state.orders.map( order => {
                    return (
                        <Order key={order.id} ingredients={order.burger} price={order.price}/>
                    );
                })}
            </section>
        );
    }
}


export default WithErrorHandler(Orders, axios); 