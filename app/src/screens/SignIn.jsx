import {
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useLayoutEffect, useState} from 'react';
import Title from '../common/Title';
import Input from '../common/Input';
import Button from '../common/Button';
import api from '../core/api';
import utils from '../core/utils';
import useGlobal from '../core/global';

function SignInScreen({navigation}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const login = useGlobal(state => state.login);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  function onSignIn() {
    // check username
    const failUsername = !username;
    if (failUsername) {
      setUsernameError('Username not provided');
    }

    // check password
    const failPassword = !password;
    if (failPassword) {
      setPasswordError('Password not provided');
    }

    // Break out of this function, if there's any issue
    if (failUsername || failPassword) {
      return;
    }
    // Make sign-in request
    // ...
    api({
      method: 'POST',
      url: '/chat/signin/',
      data: {
        username: username,
        password: password,
      },
    })
      .then(response => {
        const credentials = {
          username: username,
          password: password,
        };
        utils.log('response', response.data);
        login(credentials, response.data.user);
      })
      .catch(error => {
        if (error.response) {
          console.log('Error Res Data', error.response.data);
          console.log('Error Res Status', error.response.status);
          console.log('Error Res Headers', error.response.headers);
        } else if (error.request) {
          console.log('Error Req', error.request);
        } else {
          console.log('Error Msg', error.message);
        }
        console.log('Error Config', error.config);
      });
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView behavior="height" style={{flex: 1}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              paddingHorizontal: 20,
            }}>
            <Title text="Websocket App" color="#1f0c1c" />
            <Input
              title={'Username'}
              value={username}
              setValue={setUsername}
              error={usernameError}
              setError={setUsernameError}
            />
            <Input
              title={'Password'}
              value={password}
              setValue={setPassword}
              error={passwordError}
              setError={setPasswordError}
              secureTextEntry={true}
            />
            <Button title={'Sign In'} onPress={onSignIn} />

            <Text style={{textAlign: 'center', marginTop: 40}}>
              Don't have an account?{' '}
              <Text
                style={{color: 'blue'}}
                onPress={() => navigation.navigate('SignUp')}>
                Sign Up
              </Text>
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default SignInScreen;
