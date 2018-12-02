import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

const ingredientPrices = {
    salad: 0.50,
    cheese: 0.75,
    bacon: 1.00,
    meat: 1.25
}

class BurgerBuilder extends Component {


    state = {
        ingredients: null,
        totalPrice: 3,
        purchasable: false,
        isPurchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
         axios.get("https://react-burger-builder-999f2.firebaseio.com/ingredients.json")
            .then(response => {
                let currentPrice = this.state.totalPrice;
                const ingredients = response.data;
                for (let keys in ingredients) {
                    if(ingredients[keys] > 0) {
                        currentPrice += ingredientPrices[keys];
                    }
                }
                this.setState({ ingredients: response.data, totalPrice: currentPrice});
            })
            .catch(error => {
                this.setState({ error : true });
            });

            
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

        this.setState({ purchasable: sum > 0 });
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = ingredientPrices[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = ingredientPrices[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceAddition;
        this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
        this.updatePurchaseState(updatedIngredients);
    }

    purchasingHandler = () => {
        this.setState({ isPurchasing: true });
    }

    cancelPurchaseHandler = () => {
        this.setState({ isPurchasing: false });
    }

    continuePurchaseHandler = () => {
        //create an array to store ingredients items in a query params
        const queryParams = [];

        //loop through ingredients stored in the state
        for (let i in this.state.ingredients) {
            //push the object key and its value in the array by turning it into a URI  ex  "bacon=1"
            queryParams.push(encodeURIComponent(i) + "=" + encodeURIComponent(this.state.ingredients[i]));
        }

        queryParams.push("price=" + this.state.totalPrice);

        //join the aray together with every space being a & character
        const queryString = queryParams.join("&");
 
        //set the link to the checkout page and set the serach parameters to a questionmark followed by the query string
        this.props.history.push({
            pathname: "/checkout",
            search: "?" + queryString
        });
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }

        for (let keys in disabledInfo) {
            disabledInfo[keys] = disabledInfo[keys] <= 0;
        }

        let orderSummary = null;
        let burger = this.state.error ? <p>Site Could not be Loaded, please try again later</p> : <Spinner />;

        if (this.state.ingredients) {
            burger = (
                <React.Fragment>
                    <Burger Ingredients={this.state.ingredients} />
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        purchasable={this.state.purchasable}
                        ordered={this.purchasingHandler}
                        price={this.state.totalPrice} />
                </React.Fragment>
            );

            orderSummary = <OrderSummary
                ingredients={this.state.ingredients}
                price={this.state.totalPrice}
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


export default withErrorHandler(BurgerBuilder, axios);