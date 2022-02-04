var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/* eslint-disable operator-linebreak */
/* eslint-disable no-console */
import { AsyncStorage } from 'react-native';
import * as Google from 'expo-google-app-auth';
import trackerApi from '../api/tracker';
import { navigate } from '../navigationRef';
const IOS_CLIENT_ID = '317454531911-omsh7tdhsacg5fv38dgf4j1g80hmho0k.apps.googleusercontent.com';
const ANDROID_CLIENT_ID = '317454531911-njlhlasjsn3g1rrebloe90vboc0j40vv.apps.googleusercontent.com';
let newAccount = false;
export const googleSignup = ({ id, email, givenName }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield trackerApi.post('/googleSignup', {
            id,
            email,
            givenName,
        });
        yield AsyncStorage.setItem('token', response.data.token);
        if (response.data.createPassword) {
            newAccount = true;
        }
        else {
            newAccount = false;
        }
    }
    catch (err) {
        console.log(err);
    }
});
export const signInWithGoogle = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield Google.logInAsync({
            iosClientId: IOS_CLIENT_ID,
            androidClientId: ANDROID_CLIENT_ID,
            scopes: ['profile', 'email'],
        });
        if (result.type === 'success') {
            const { id, email, givenName } = result.user;
            yield googleSignup({ id, email, givenName });
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
    }
    catch (e) {
        console.log('LoginScreen.js.js 30 | Error with login', e);
        return { error: true };
    }
});
