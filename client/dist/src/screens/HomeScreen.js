/* eslint-disable object-curly-newline */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { StatusBar } from 'expo-status-bar';
import React, { useContext } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { SocialIcon } from 'react-native-elements';
import SignIn from './SignInScreen';
import SignUp from './SignUpScreen';
import CreateUsername from '../components/CreateUsername';
import SignInContext from '../context/SignInContext';
import SignUpContext from '../context/SignUpContext';
import { signInWithGoogle } from '../components/GoogleAuth';
const image = require('../../assets/gym.jpg');
const HomeScreen = ({ navigation }) => {
    const { signInVisible, showSignIn } = useContext(SignInContext);
    const { signUpVisible, showSignUp } = useContext(SignUpContext);
    if (signInVisible) {
        return (<View style={styles.container}>
        <SignIn />
        <ImageBackground source={image} style={styles.image} blurRadius={19}>
          <LinearGradient colors={['black']} style={styles.LinearGradient}/>
        </ImageBackground>
      </View>);
    }
    if (signUpVisible) {
        return (<View style={styles.container}>
        <SignUp />
        <ImageBackground source={image} style={styles.image} blurRadius={19}>
          <LinearGradient colors={['black']} style={styles.LinearGradient}/>
        </ImageBackground>
      </View>);
    }
    return (<View style={[styles.container, navigation.getParam('chooseUsername') ? { backgroundColor: 'grey', opacity: 0.5 } : null]}>
      <ImageBackground source={image} style={styles.image}>
        <LinearGradient colors={['black']} style={styles.LinearGradient}/>
        {navigation.getParam('chooseUsername') ? (<CreateUsername email={navigation.getParam('email')} id={navigation.getParam('id')}/>) : null}
        <Text style={styles.main}>Welcome to Gainzilla</Text>
        <Text style={styles.secondary}>Your workout journey starts here.</Text>
        <Text style={styles.signUp} onPress={() => showSignUp()}>
          Create an account
        </Text>
        <SocialIcon style={styles.google} title="Continue with Google" button type="google" onPress={signInWithGoogle}/>
        <View style={{
        flexDirection: 'column',
        alignItems: 'center',
        top: '73%',
    }}>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            <Text style={styles.logIn}>Already have an account?</Text>
            <Text style={styles.signIn} onPress={() => showSignIn()}>
              Sign in
            </Text>
          </View>
        </View>
      </ImageBackground>
      <StatusBar />
    </View>);
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    main: {
        color: 'white',
        top: '46%',
        textAlign: 'center',
        fontWeight: '600',
        fontSize: 34,
    },
    secondary: {
        color: 'grey',
        top: '48%',
        textAlign: 'center',
        fontWeight: '600',
        fontSize: 16,
    },
    google: {
        top: '155%',
    },
    signUp: {
        color: 'white',
        top: '70%',
        textAlign: 'center',
        fontWeight: '600',
        fontSize: 16,
    },
    logIn: {
        color: 'grey',
        fontWeight: '600',
        fontSize: 16,
    },
    signIn: {
        color: '#1E90FF',
        alignSelf: 'center',
        marginLeft: 10,
        textDecorationLine: 'underline',
    },
    image: {
        height: '100%',
        width: '100%',
        opacity: 0.8,
    },
    LinearGradient: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        opacity: 0.6,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    openButton: {
        backgroundColor: '#F194FF',
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
});
export default HomeScreen;
