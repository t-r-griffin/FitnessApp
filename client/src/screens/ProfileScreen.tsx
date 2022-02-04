/* eslint-disable object-curly-newline */
/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useContext } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import SignUpContext from '../context/SignUpContext';
import SignInContext from '../context/SignInContext';
import { Context as AuthContext } from '../context/AuthContext';

interface Props {
  navigation: any;
}

const ProfileScreen: React.FC<Props> = ({ navigation }: Props) => {
  const { closeSignUp } = useContext(SignUpContext);
  const { closeSignIn } = useContext(SignInContext);
  const { signout } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text> Profile Screen </Text>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
        Welcome,
        {navigation.getParam('username')}
        {navigation.getParam('givenName')}
      </Text>
      <Button
        title="Sign out"
        onPress={() => {
          closeSignUp();
          closeSignIn();
          signout();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ProfileScreen;
