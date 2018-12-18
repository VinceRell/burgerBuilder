import * as actionTypes from './actionTypes';
import axios from 'axios';


export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId 
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error:error
    }
}

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (experationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, experationTime * 1000);
    }
}

export const auth = (email, password, isRegistered) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        let url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDFE_9Rv92Dbg64ZUn1NMquq5jZMfgjfyA";
        if(!isRegistered) {
            url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDFE_9Rv92Dbg64ZUn1NMquq5jZMfgjfyA"
        }
        axios.post(url, authData)
            .then( response => {
                console.log(response);
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn))
            })
            .catch( error => {
                console.log(error.response.data.error);
                dispatch(authFail(error.response.data.error));
            })
    }
}