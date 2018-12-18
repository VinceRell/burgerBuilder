import * as actionTypes from './actionTypes';

export const addAxiosInterceptors = () => {
    return {
        type: actionTypes.AXIOS_INTERCEPTORS
    }
}
