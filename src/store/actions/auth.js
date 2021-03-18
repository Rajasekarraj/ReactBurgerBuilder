import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
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
    console.log('error', error);
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(authLogout())
        }, expirationTime * 1000)
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        redirectPath: path
    }
}

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDnA4_1F6sJu9yQyD8LOBZQC2cDj7pP-fs';
        if (!isSignup) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDnA4_1F6sJu9yQyD8LOBZQC2cDj7pP-fs'
        }
        axios.post(url, authData)
        .then(response => {
            console.log(response);
            const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 3600)
            localStorage.setItem('token', response.data.idToken);
            localStorage.setItem('expirationDate', expirationDate);
            localStorage.setItem('userId', response.data.localId);
            console.log('localStorahe', localStorage);
            console.log(localStorage.getItem('expirationDate'));
            dispatch(authSuccess(response.data.idToken, response.data.localId))
            dispatch(logout(response.data.expiresIn))
        })
        .catch(err => dispatch(authFail(err.response.data.error)))
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token) {
            dispatch(authLogout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'))
            if(expirationDate > new Date()){
                dispatch(authSuccess(token, localStorage.getItem('userId')))
                console.log('new expiration time', (expirationDate.getTime() - new Date().getTime())/1000);
                dispatch(logout((expirationDate.getTime() - new Date().getTime())/1000))
            } else {
                dispatch(authLogout());
            }
        }
    }
} 