/* eslint-disable comma-dangle */
/* eslint-disable @typescript-eslint/no-shadow */
import React from 'react';
import 'react-native-gesture-handler';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from './src/screens/HomeScreen';
import SignInScreen from './src/screens/SignInScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import { SignInProvider } from './src/context/SignInContext';
import { SignUpProvider } from './src/context/SignUpContext';
import { Provider as AuthProvider } from './src/context/AuthContext';
import { setNavigator } from './src/navigationRef';
import ResolveAuthScreen from './src/screens/ResolveAuthScreen';

const navigator = createSwitchNavigator(
  {
    ResolveAuth: ResolveAuthScreen,
    Home: HomeScreen,
    SignIn: SignInScreen,
    Profile: ProfileScreen,
    SignUp: SignUpScreen,
  },
  {
    initialRouteName: 'ResolveAuth',
  }
);

const App = createAppContainer(navigator);

export default () => (
  <AuthProvider>
    <SignUpProvider>
      <SignInProvider>
        <App
          ref={(navigator) => {
            setNavigator(navigator);
          }}
        />
      </SignInProvider>
    </SignUpProvider>
  </AuthProvider>
);
