import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
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
        let summary = <Redirect to="/" />
        if(this.props.ingredientList) {
            summary = (    
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
        return summary;
    }

}

const mapStateToProps = state => {
    return {
        ingredientList: state.burgerBuilder.ingredients
    }
}

export default connect(mapStateToProps)(Checkout);