var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React, { Component } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import * as Google from 'expo-google-app-auth';
const IOS_CLIENT_ID = '317454531911-omsh7tdhsacg5fv38dgf4j1g80hmho0k.apps.googleusercontent.com';
const ANDROID_CLIENT_ID = '317454531911-njlhlasjsn3g1rrebloe90vboc0j40vv.apps.googleusercontent.com';
export default class LoginScreen extends Component {
    constructor() {
        super(...arguments);
        this.signInWithGoogle = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield Google.logInAsync({
                    iosClientId: IOS_CLIENT_ID,
                    androidClientId: ANDROID_CLIENT_ID,
                    scopes: ['profile', 'email'],
                });
                if (result.type === 'success') {
                    console.log('LoginScreen.js.js 21 | ', result.user.givenName);
                    this.props.navigation.navigate('Profile', {
                        username: result.user.givenName,
                    }); //after Google login redirect to Profile
                    return result.accessToken;
                }
                else {
                    return { cancelled: true };
                }
            }
            catch (e) {
                console.log('LoginScreen.js.js 30 | Error with login', e);
                return { error: true };
            }
        });
    }
    render() {
        return (<View style={styles.container}>
        <Button title="Continue with Google" onPress={this.signInWithGoogle}/>
      </View>);
    }
}
const styles = StyleSheet.create({
    container: {
        top: '30%',
        flex: 1,
        //backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        color: 'white',
    },
});
