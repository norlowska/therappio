import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Container, Content, Button, Text, Form, Item, Input, Label, View } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { userConstants } from '../_constants';
import { userActions } from '../_actions';
import styles from '../theme/styles';

const SignInScreen = ({ login, isAuthenticated, navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Container>
      <Content contentContainerStyle={styles.signInContainer}>
        <Form>
          <Item stackedLabel style={{ marginBottom: 15, marginLeft: 0 }}>
            <Label>Email</Label>
            <Input
              placeholder='Enter your email address'
              placeholderTextColor='#b8b8b8'
              value={email}
              onChangeText={text => setEmail(text)}
            />
          </Item>
          <Item stackedLabel style={{ marginBottom: 15, marginLeft: 0 }}>
            <Label>Password</Label>
            <Input
              placeholder='Enter your password'
              placeholderTextColor='#b8b8b8'
              secureTextEntry={true}
              value={password}
              onChangeText={text => setPassword(text)}
            />
          </Item>
        </Form>
        <Button
          style={{ marginTop: 40, justifyContent: 'center' }}
          onPress={() => login(email, password)}
        >
          <Text>Sign in</Text>
        </Button>
        <View style={styles.signInLinks}>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.link}>Sign up</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity onPress={() => this._onLinkPress('ForgotPassword')}>
              <Text style={styles.link}>Forgot password?</Text>
            </TouchableOpacity> */}
        </View>
      </Content>
    </Container>
  );
};

SignInScreen.navigationOptions = {
  headerShown: false,
};

const mapStateToProps = (state, props) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = {
  login: userActions.login,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen);
