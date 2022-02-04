var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/* eslint-disable comma-dangle */
/* eslint-disable no-console */
import { AsyncStorage } from 'react-native';
import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';
import { navigate } from '../navigationRef';
const authReducer = (state, action) => {
    switch (action.type) {
        case 'add_error':
            return Object.assign(Object.assign({}, state), { errorMessage: action.payload });
        case 'signin':
            return { errorMessage: '', token: action.payload };
        case 'signout':
            return { token: null };
        default:
            return state;
    }
};
const updateGoogleUsername = (dispatch) => ({ id, email, username }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield trackerApi.post('/updateGoogleUsername', {
            id,
            email,
            username,
        });
        dispatch({ type: 'default' });
    }
    catch (err) {
        console.log(err);
    }
});
const tryLocalSignin = (dispatch) => () => __awaiter(void 0, void 0, void 0, function* () {
    const token = yield AsyncStorage.getItem('token');
    if (token) {
        dispatch({ type: 'signin', payload: token });
        navigate('Profile');
    }
    else {
        navigate('Home');
    }
});
const signup = (dispatch) => ({ username, password, email }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield trackerApi.post('/signup', {
            username,
            password,
            email,
        });
        yield AsyncStorage.setItem('token', response.data.token);
        dispatch({ type: 'signin', payload: response.data.token });
        navigate('Profile');
    }
    catch (err) {
        dispatch({
            type: 'add_error',
            payload: 'Something went wrong with sign up',
        });
    }
});
const signin = (dispatch) => ({ username, password }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield trackerApi.post('/signin', { username, password });
        yield AsyncStorage.setItem('token', response.data.token);
        dispatch({ type: 'signin', payload: response.data.token });
        navigate('Profile');
    }
    catch (err) {
        dispatch({
            type: 'add_error',
            payload: 'Something went wrong with sign in',
        });
    }
});
const signout = (dispatch) => () => __awaiter(void 0, void 0, void 0, function* () {
    yield AsyncStorage.removeItem('token');
    dispatch({ type: 'signout' });
    navigate('Home');
});
export const { Provider, Context } = createDataContext(authReducer, {
    signin,
    signup,
    signout,
    tryLocalSignin,
    updateGoogleUsername,
}, { token: null, errorMessage: '' });
