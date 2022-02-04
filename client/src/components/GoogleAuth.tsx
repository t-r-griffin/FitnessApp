/* eslint-disable operator-linebreak */
/* eslint-disable no-console */
import { AsyncStorage } from 'react-native';
import * as Google from 'expo-google-app-auth';
import trackerApi from '../api/tracker';

import { navigate } from '../navigationRef';

const IOS_CLIENT_ID = '317454531911-omsh7tdhsacg5fv38dgf4j1g80hmho0k.apps.googleusercontent.com';
const ANDROID_CLIENT_ID =
  '317454531911-njlhlasjsn3g1rrebloe90vboc0j40vv.apps.googleusercontent.com';

let newAccount = false;

interface GoogleUser {
  id: string | undefined;
  email: string | undefined;
  givenName: string | undefined;
}

export const googleSignup = async ({ id, email, givenName }: GoogleUser) => {
  try {
    const response = await trackerApi.post('/googleSignup', {
      id,
      email,
      givenName,
    });
    await AsyncStorage.setItem('token', response.data.token);
    if (response.data.createPassword) {
      newAccount = true;
    } else {
      newAccount = false;
    }
  } catch (err) {
    console.log(err);
  }
};

export const signInWithGoogle = async () => {
  try {
    const result = await Google.logInAsync({
      iosClientId: IOS_CLIENT_ID,
      androidClientId: ANDROID_CLIENT_ID,
      scopes: ['profile', 'email'],
    });

    if (result.type === 'success') {
      const { id, email, givenName } = result.user;
      await googleSignup({ id, email, givenName });

      if (newAccount) {
        navigate('Home', {
          chooseUsername: true,
          email: result.user.email,
          givenName: result.user.givenName,
          id: result.user.id,
        });
        return result.accessToken;
      }
      navigate('Profile', {
        givenName: result.user.givenName,
      }); // after Google login redirect to Profile
      return result.accessToken;
    }
    return { cancelled: true };
  } catch (e) {
    console.log('LoginScreen.js.js 30 | Error with login', e);
    return { error: true };
  }
};
