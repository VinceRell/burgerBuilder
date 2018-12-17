import * as actionTypes from './actionTypes';
import axios from 'axios';


export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData:authData
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_START,
        error:error
    }
}

export const auth = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        axios.post("https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDFE_9Rv92Dbg64ZUn1NMquq5jZMfgjfyA", authData)
            .then( response => {
                console.log(response);
                dispatch(authSuccess(response.data));
            })
            .catch( error => {
                console.log(error);
                dispatch(authFail(error));
            })
    }
}