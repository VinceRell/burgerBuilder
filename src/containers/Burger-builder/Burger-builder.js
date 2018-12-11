import React, { Component } from 'react';
import { connect } from 'react-redux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {


    state = {
        isPurchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        //  axios.get("https://react-burger-builder-999f2.firebaseio.com/ingredients.json")
        //     .then(response => {
        //         let currentPrice = this.state.totalPrice;
        //         const ingredients = response.data;
        //         for (let keys in ingredients) {
        //             if(ingredients[keys] > 0) {
        //                 currentPrice += ingredientPrices[keys];
        //             }
        //         }
        //         this.setState({ ingredients: response.data, totalPrice: currentPrice});
        //     })
        //     .catch(error => {
        //         this.setState({ error : true });
        //     });

    }

    updatePurchaseState(ingredients) {
        const sum = Object.values(ingredients)
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

        return sum > 0;
    }

    purchasingHandler = () => {
        this.setState({ isPurchasing: true });
    }

    cancelPurchaseHandler = () => {
        this.setState({ isPurchasing: false });
    }

    continuePurchaseHandler = () => {
        this.props.history.push("/checkout");
    }

    render() {
        const disabledInfo = {
            ...this.props.ingredientList
        }

        for (let keys in disabledInfo) {
            disabledInfo[keys] = disabledInfo[keys] <= 0;
        }

        let orderSummary = null;
        let burger = this.state.error ? <p>Site Could not be Loaded, please try again later</p> : <Spinner />;

        if (this.props.ingredientList) {
            burger = (
                <React.Fragment>
                    <Burger Ingredients={this.props.ingredientList} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        purchasable={this.updatePurchaseState(this.props.ingredientList)}
                        ordered={this.purchasingHandler}
                        price={this.props.totalBugerPrice} />
                </React.Fragment>
            );

            orderSummary = <OrderSummary
                ingredients={this.props.ingredientList}
                price={this.props.totalBugerPrice}
                cancelHandler={this.cancelPurchaseHandler}
                continueHandler={this.continuePurchaseHandler} />
        }

        if (this.state.loading) {
            orderSummary = <Spinner />
        }

        return (
            <React.Fragment>
                <Modal
                    show={this.state.isPurchasing}
                    cancelHandler={this.cancelPurchaseHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </React.Fragment>
        );
    }
}


const mapStateToProps = state => {
    return {
        ingredientList: state.ingredients,
        totalBugerPrice: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));