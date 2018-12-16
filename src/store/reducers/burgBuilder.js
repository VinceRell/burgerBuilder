import * as actionTypes from '../actions/actionTypes';

const initialState = {
    ingredients: null,
    totalPrice: null,
    error: false
}

const ingredientPrices = {
    salad: 0.50,
    cheese: 0.75,
    bacon: 1.00,
    meat: 1.25
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case  actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1 
                },
                totalPrice: state.totalPrice + ingredientPrices[action.ingredientName]
            };
        
        case  actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1 
                },
                totalPrice: state.totalPrice - ingredientPrices[action.ingredientName]
            } 
            
        case actionTypes.SET_INGREDIENTS_AND_PRICE:
            return {
                ...state,
                ingredients: {
                    salad: action.ingredients.salad,
                    cheese: action.ingredients.cheese,
                    bacon: action.ingredients.bacon,
                    meat: action.ingredients.meat,
                },
                totalPrice: action.price,
                error: false
            }
        
        case actionTypes.FETCH_INGREDIENTS_FAILED: {
            return {
                ...state,
                error: true
            }
        }
        default: 
            return state;
    }
}

export default reducer;