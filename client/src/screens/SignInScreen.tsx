/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import AuthForm from '../components/AuthForm';
import { Context as AuthContext } from '../context/AuthContext';
import SignInContext from '../context/SignInContext';

const ModalScreen = () => {
  const { state, signin } = useContext(AuthContext);
  const { closeSignIn } = useContext(SignInContext);

  return (
    <View style={styles.modalView}>
      <AuthForm
        headerText="Sign In"
        errorMessage={state.errorMessage}
        submitButtonText="Sign in"
        onSubmit={signin}
        closeModal={closeSignIn}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  modalView: {
    opacity: 0.2,
    backgroundColor: 'grey',
  },
});

export default ModalScreen;
