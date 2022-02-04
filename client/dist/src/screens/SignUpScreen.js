/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import AuthForm from '../components/AuthForm';
import { Context as AuthContext } from '../context/AuthContext';
import SignUpContext from '../context/SignUpContext';
const ModalScreen = () => {
    const { state, signup } = useContext(AuthContext);
    const { closeSignUp } = useContext(SignUpContext);
    return (<View style={styles.modalView}>
      <AuthForm headerText="Sign Up" errorMessage={state.errorMessage} submitButtonText="Sign up" onSubmit={signup} closeModal={closeSignUp}/>
    </View>);
};
const styles = StyleSheet.create({
    modalView: {
        opacity: 0.2,
        backgroundColor: 'grey',
    },
});
export default ModalScreen;
