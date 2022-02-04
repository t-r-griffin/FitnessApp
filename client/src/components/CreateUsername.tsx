/* eslint-disable operator-linebreak */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { useState, useContext } from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import { Text, Button, Input } from 'react-native-elements';
import { navigate } from '../navigationRef';
import { Context as AuthContext } from '../context/AuthContext';

interface Props {
  email: string;
  id: string;
}

const re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

let invalidCredentials = '';

const validateCredentials = (emails: string, username: string) => {
  const invalidEmails = emails
    .split(',')
    .map((email) => email.trim())
    .filter((email) => re.test(email) === false);

  if (invalidEmails.length || username.length < 3) {
    invalidCredentials =
      'A valid username and email is required. Please make sure that the username consists of more than 3 characters.';
  } else {
    invalidCredentials = '';
  }
};

const CreateUsername: React.FC<Props> = (props) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState(props.email);
  const [id] = useState(props.id);
  const [showKeyboard, setKeyboard] = useState(false);
  const [test, setTest] = useState(0);
  const { updateGoogleUsername } = useContext(AuthContext);

  const [isInputFocused, setInputFocused] = useState({
    input1: false,
    input2: false,
  });

  return (
    <View style={styles.centeredView}>
      <Modal animationType="slide" transparent visible>
        <View style={styles.centeredView}>
          <View style={[styles.modalView, showKeyboard ? { top: 0 } : null]}>
            <Text style={styles.modalText}>Create your Gainzilla Account</Text>
            {invalidCredentials ? (
              <Text
                style={{
                  marginTop: 25,
                  marginBottom: -15,
                  color: 'red',
                  fontSize: 15,
                  textAlign: 'center',
                  fontWeight: '500',
                }}
              >
                {invalidCredentials}
              </Text>
            ) : (
              <Text style={styles.paragraph}>
                Please a pick a username for your account and confirm your email address.
              </Text>
            )}
            <Input
              inputStyle={{
                color: 'black',
                fontSize: 16,
                borderRadius: 10,
              }}
              value={username}
              placeholder="Username"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={(newUsername) => setUsername(newUsername)}
              inputContainerStyle={[
                styles.inputForm,
                isInputFocused.input1
                  ? { borderColor: 'black' }
                  : { borderColor: 'rgba(220, 220, 220, 0.1)' },
              ]}
              onFocus={() => {
                setInputFocused((prev) => ({ ...prev, input1: true }));
                setKeyboard(true);
              }}
              onBlur={() => setInputFocused((prev) => ({ ...prev, input1: false }))}
            />
            <Input
              inputStyle={{
                color: 'black',
                fontSize: 16,
                borderRadius: 10,
              }}
              value={email}
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={(newEmail) => setEmail(newEmail)}
              inputContainerStyle={[
                styles.inputForm,
                styles.confirmEmail,
                isInputFocused.input2
                  ? { borderColor: 'black' }
                  : { borderColor: 'rgba(220, 220, 220, 0.1)' },
              ]}
              onFocus={() => {
                setInputFocused((prev) => ({ ...prev, input2: true }));
                setKeyboard(true);
              }}
              onBlur={() => setInputFocused((prev) => ({ ...prev, input2: false }))}
            />

            <Button
              buttonStyle={{
                backgroundColor: '#1E90FF',

                borderRadius: 10,
                height: 35,
                paddingTop: 5,
              }}
              containerStyle={{
                top: -50,
                width: '100%',
                paddingTop: -50,
                borderRadius: 10,
              }}
              title="Create Account"
              titleStyle={{ fontWeight: '700' }}
              onPress={() => {
                validateCredentials(email, username);
                setTest(test + 1);
                if (!invalidCredentials) {
                  updateGoogleUsername({ id, email, username });
                  navigate('Profile');
                }
              }}
            />
            <Button
              buttonStyle={{
                backgroundColor: 'rgba(220, 220, 220, 0.5)',

                borderRadius: 10,
                height: 35,
                paddingTop: 5,
              }}
              containerStyle={{
                top: -30,
                width: '100%',
                paddingTop: -50,
                borderRadius: 10,
              }}
              title="Cancel"
              titleStyle={{ fontWeight: '700', color: 'black' }}
              onPress={() => {
                updateGoogleUsername({ id, email });
                navigate('Profile');
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    top: '20%',
    height: '65%',
    width: '90%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    paddingVertical: 35,
    paddingHorizontal: 18,
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
    color: 'black',
    fontWeight: '700',
    fontSize: 16,
  },
  paragraph: {
    color: 'gray',

    fontWeight: '600',
    fontSize: 15,
    textAlign: 'center',
    marginTop: 16,
  },
  inputForm: {
    height: 35,
    borderWidth: 2,
    marginTop: 36,
    borderBottomWidth: 2,
    marginLeft: '-3%',
    marginRight: '-3%',
    paddingLeft: 5,
    backgroundColor: 'rgba(220, 220, 220, 0.5)',
    borderRadius: 10,
  },
  confirmEmail: {
    top: -45,
  },
});

export default CreateUsername;
