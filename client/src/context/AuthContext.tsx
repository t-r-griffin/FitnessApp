/* eslint-disable comma-dangle */
/* eslint-disable no-console */
import { AsyncStorage } from 'react-native';
import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';
import { navigate } from '../navigationRef';

interface User {
  username: string;
  password: string;
  email: string;
  id: string;
}

const authReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'add_error':
      return { ...state, errorMessage: action.payload };
    case 'signin':
      return { errorMessage: '', token: action.payload };
    case 'signout':
      return { token: null };
    default:
      return state;
  }
};

const updateGoogleUsername = (dispatch: any) => async ({ id, email, username }: User) => {
  try {
    await trackerApi.post('/updateGoogleUsername', {
      id,
      email,
      username,
    });
    dispatch({ type: 'default' });
  } catch (err) {
    console.log(err);
  }
};

const tryLocalSignin = (dispatch: any) => async () => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    dispatch({ type: 'signin', payload: token });
    navigate('Profile');
  } else {
    navigate('Home');
  }
};

const signup = (dispatch: any) => async ({ username, password, email }: User) => {
  try {
    const response = await trackerApi.post('/signup', {
      username,
      password,
      email,
    });
    await AsyncStorage.setItem('token', response.data.token);
    dispatch({ type: 'signin', payload: response.data.token });

    navigate('Profile');
  } catch (err) {
    dispatch({
      type: 'add_error',
      payload: 'Something went wrong with sign up',
    });
  }
};

const signin = (dispatch: any) => async ({ username, password }: User) => {
  try {
    const response = await trackerApi.post('/signin', { username, password });
    await AsyncStorage.setItem('token', response.data.token);
    dispatch({ type: 'signin', payload: response.data.token });
    navigate('Profile');
  } catch (err) {
    dispatch({
      type: 'add_error',
      payload: 'Something went wrong with sign in',
    });
  }
};

const signout = (dispatch: any) => async () => {
  await AsyncStorage.removeItem('token');
  dispatch({ type: 'signout' });
  navigate('Home');
};

export const { Provider, Context } = createDataContext(
  authReducer,
  {
    signin,
    signup,
    signout,
    tryLocalSignin,
    updateGoogleUsername,
  },
  { token: null, errorMessage: '' }
);
