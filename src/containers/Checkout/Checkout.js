import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

    checkoutContinuedHandler = () => {
        this.props.history.push(this.props.match.url + "/contact-data");
    }


    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    render() {
        return (
            <section>
                <CheckoutSummary 
                    ingredients={this.props.ingredientList}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}/>
                <Route 
                    path={this.props.match.url + "/contact-data"}
                    component={ContactData} />
            </section>
        );
    }

}

const mapStateToProps = state => {
    return {
        ingredientList: state.ingredients
    }
}

export default connect(mapStateToProps)(Checkout);