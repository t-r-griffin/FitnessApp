/* eslint-disable @typescript-eslint/indent */
/* eslint-disable object-curly-newline */
/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useState, useContext } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Button, Input, Icon } from 'react-native-elements';
import Modal from 'react-native-modal';
import SignUpContext from '../context/SignUpContext';
import SignInContext from '../context/SignInContext';
import { Context as AuthContext } from '../context/AuthContext';

interface Props {
  headerText: string;
  errorMessage: string;
  onSubmit: Function;
  closeModal: Function;
  submitButtonText: string;
}

let passwordTooShort = false;

const checkIfShort = (password: string) => {
  if (password.length < 6) {
    passwordTooShort = true;
  }
};

const AuthForm: React.FC<Props> = ({
  headerText,
  errorMessage,
  onSubmit,
  closeModal,
  submitButtonText,
}: Props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [test, setTest] = useState(0);
  const [open, setOpen] = useState(false);
  const [isInputFocused, setInputFocused] = useState({
    input1: false,
    input2: false,
    input3: false,
  });
  const { signUpVisible } = useContext(SignUpContext);
  const { signInVisible } = useContext(SignInContext);
  const { state } = useContext(AuthContext);

  const shortPassword = passwordTooShort ? (
    <Modal
      animationIn="rotate"
      style={styles.modalView}
      isVisible={open}
      coverScreen
      onBackdropPress={() => setOpen(false)}
    >
      <Text style={styles.modalPrimaryText}>Password Too Short</Text>
      <Text style={styles.modalSubText}>
        Sorry, your password needs to be at least 6 characters long. Please pick a new one!
      </Text>
      <Button
        buttonStyle={{
          backgroundColor: '#1E90FF',
          borderRadius: 10,
          height: 35,
          paddingTop: 5,
        }}
        containerStyle={{
          top: 35,
          width: '90%',
          borderRadius: 10,
        }}
        title="Ok"
        titleStyle={{ fontWeight: '700' }}
        onPress={() => setOpen(false)}
      />
    </Modal>
  ) : null;

  return (
    <>
      <Modal
        animationIn="slideInRight"
        animationOut="slideOutRight"
        animationInTiming={400}
        style={{ margin: 0 }}
        coverScreen
        isVisible={signUpVisible || signInVisible}
        hasBackdrop={false}
      >
        {shortPassword}
        <View style={styles.backButton}>
          <TouchableOpacity
            onPress={() => {
              closeModal();
              state.errorMessage = '';
            }}
          >
            <View style={styles.backButton}>
              <Icon size={50} name="chevron-left" color="#1E90FF" />

              <Text style={styles.textStyle}>Back</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.input}>
          <Text
            h3
            style={{
              fontWeight: '700',
              color: 'white',
              alignSelf: 'flex-start',
              marginLeft: 15,
              marginBottom: 10,
            }}
          >
            {headerText}
          </Text>

          <Input
            autoFocus
            labelStyle={[{ color: 'white' }, { fontWeight: '500' }]}
            inputStyle={{ color: 'white' }}
            label="Username"
            value={username}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(newUsername) => setUsername(newUsername)}
            inputContainerStyle={[
              styles.inputForm,
              isInputFocused.input1
                ? { borderColor: 'white' }
                : { borderColor: 'rgba(0, 0, 0, 0.1)' },
            ]}
            onFocus={() => setInputFocused((prev) => ({ ...prev, input1: true }))}
            onBlur={() => setInputFocused((prev) => ({ ...prev, input1: false }))}
          />

          <Input
            secureTextEntry
            labelStyle={[{ color: 'white' }, { fontWeight: '500' }]}
            inputStyle={{ color: 'white' }}
            label="Password"
            value={password}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(newPassword) => setPassword(newPassword)}
            inputContainerStyle={[
              styles.inputForm,
              isInputFocused.input2
                ? { borderColor: 'white' }
                : { borderColor: 'rgba(0, 0, 0, 0.1)' },
            ]}
            onFocus={() => setInputFocused((prev) => ({ ...prev, input2: true }))}
            onBlur={() => setInputFocused((prev) => ({ ...prev, input2: false }))}
          />
          {signUpVisible ? (
            <Input
              labelStyle={[{ color: 'white' }, { fontWeight: '500' }]}
              inputStyle={{ color: 'white' }}
              label="Email Address"
              value={email}
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={(newEmail) => setEmail(newEmail)}
              inputContainerStyle={[
                styles.inputForm,
                isInputFocused.input3
                  ? { borderColor: 'white' }
                  : { borderColor: 'rgba(0, 0, 0, 0.1)' },
              ]}
              onFocus={() => setInputFocused((prev) => ({ ...prev, input3: true }))}
              onBlur={() => setInputFocused((prev) => ({ ...prev, input3: false }))}
            />
          ) : null}
          {errorMessage ? (
            <Text style={{ marginBottom: 10, color: 'red' }}>{errorMessage}</Text>
          ) : null}
          <Button
            buttonStyle={{ backgroundColor: '#1E90FF', height: 40 }}
            containerStyle={{
              width: '95%',
              borderRadius: 10,
            }}
            title={submitButtonText}
            titleStyle={{ fontWeight: '700' }}
            onPress={
              signUpVisible
                ? () => {
                    checkIfShort(password);
                    setTest(test + 1);
                    if (!passwordTooShort) {
                      onSubmit({ username, email, password });
                    } else {
                      setOpen(true);
                    }
                  }
                : () => onSubmit({ username, password })
            }
          />
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  backButton: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: -5,
    top: '10%',
  },
  textStyle: {
    color: '#1E90FF',
    fontSize: 18,
    top: '18%',
    marginLeft: -10,
  },
  modalPrimaryText: {
    top: -40,
    marginBottom: -25,
    color: 'black',
    fontSize: 16,
    fontWeight: '700',
  },
  modalSubText: {
    color: 'grey',
    paddingHorizontal: 20,
    fontSize: 15,
    fontWeight: '600',
  },
  centeredView: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flexDirection: 'column',
    alignItems: 'center',

    flex: 7,
  },
  inputForm: {
    height: 35,
    borderWidth: 2,
    marginTop: 5,
    marginBottom: -15,
    borderBottomWidth: 2,
    borderColor: 'white',
    paddingLeft: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
  },
  modalView: {
    marginTop: '80%',
    marginBottom: '80%',
    borderRadius: 15,
    backgroundColor: 'white',
    alignItems: 'center',
  },
});

export default AuthForm;
