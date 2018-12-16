import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (igName) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: igName
    }
}


export const removeIngredient = (igName) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: igName
    }
}

export const setIngredientsAndPrice = (ingredientCollection, price) => {
    return {
        type: actionTypes.SET_INGREDIENTS_AND_PRICE,
        ingredients: ingredientCollection,
        price: price
    }
}

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

export const initIngredientsAndPrice = () => {
    return dispatch => {
        Promise.all([axios.get("https://react-burger-builder-999f2.firebaseio.com/ingredients.json"),
        axios.get("https://react-burger-builder-999f2.firebaseio.com/price.json")])
        .then( response => {
            dispatch(setIngredientsAndPrice(response[0].data, response[1].data));
        })
        .catch( error => {
            dispatch(fetchIngredientsFailed)
        })
    }
}


    