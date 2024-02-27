import {
  Alert,
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

const isValidEmail = input => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(input);
};
function SignUpScreen({navigation}) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const login = useGlobal(state => state.login);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  function onSignUp() {
    // check username
    const failUsername = !username || username.length < 8;
    if (failUsername) {
      setUsernameError('Username must be greater than 8 characters');
    }
    // check firstName
    const failFirstName = !firstName;
    if (failFirstName) {
      setFirstNameError('First Name not provided');
    }

    // check lastName
    const failLastName = !lastName;
    if (failLastName) {
      setLastNameError('Last Name not provided');
    }

    // check email
    const failEmail = !email;
    if (failEmail) {
      setEmailError('Email not provided');
    } else {
      const isValid = isValidEmail(email);
      if (!isValid) {
        setEmailError('Invalid email address');
        return;
      }
    }

    // check password
    const failPassword = !password || password.length < 8;
    if (failPassword) {
      setPasswordError('Password not provided');
    }

    // check confirmPassword
    const failConfirmPassword =
      (!password || password.length === 0 || password !== confirmPassword) &&
      confirmPassword.length > 0;
    if (failConfirmPassword) {
      setConfirmPasswordError("Passwords don't match");
    }

    // Break out of this function if there's any issue
    if (
      failFirstName ||
      failLastName ||
      failEmail ||
      failUsername ||
      failPassword ||
      failConfirmPassword
    ) {
      return;
    }

    console.log('Sign up');

    // Make sign-up request
    api({
      method: 'POST',
      url: '/chat/signup/',
      data: {
        username: username,
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
      },
    })
      .then(response => {
        utils.log('response', response.data);
        const credentials = {
          username: username,
          password: password,
        };
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
    <SafeAreaView style={{flex: 2}}>
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
              title={'First Name'}
              value={firstName}
              setValue={setFirstName}
              error={firstNameError}
              setError={setFirstNameError}
            />
            <Input
              title={'Last Name'}
              value={lastName}
              setValue={setLastName}
              error={lastNameError}
              setError={setLastNameError}
            />
            <Input
              title={'Email'}
              value={email}
              setValue={setEmail}
              error={emailError}
              setError={setEmailError}
            />

            <Input
              title={'Password'}
              value={password}
              setValue={setPassword}
              error={passwordError}
              setError={setPasswordError}
              secureTextEntry={true}
            />
            <Input
              title={'Confirm Password'}
              value={confirmPassword}
              setValue={setConfirmPassword}
              error={confirmPasswordError}
              setError={setConfirmPasswordError}
              secureTextEntry={true}
            />
            <Button title={'Sign Up'} onPress={onSignUp} />

            <Text style={{textAlign: 'center', marginTop: 40}}>
              Already have an account?{' '}
              <Text
                style={{color: 'blue'}}
                onPress={() => navigation.navigate('SignIn')}>
                Sign In
              </Text>
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default SignUpScreen;
