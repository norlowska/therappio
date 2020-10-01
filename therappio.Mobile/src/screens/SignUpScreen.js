import React from 'react';
import { Container, Content, Button, Text, Form, Item, Input, Label, View } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import styles from '../theme/styles';

export default class SignUpScreen extends React.Component {
  static navigationOptions = {
    title: 'Sign up',
  };

  render() {
    return (
      <Container>
        <Content contentContainerStyle={styles.signInContainer}>
          <Form>
            <Item stackedLabel style={{ marginBottom: 15, marginLeft: 0 }}>
              <Label>Email</Label>
              <Input placeholder='Enter your email address' placeholderTextColor='#b8b8b8' />
            </Item>
            <Item stackedLabel style={{ marginBottom: 15, marginLeft: 0 }}>
              <Label>Password</Label>
              <Input placeholder='Enter your password' placeholderTextColor='#b8b8b8' />
            </Item>
            <Item stackedLabel style={{ marginBottom: 15, marginLeft: 0 }}>
              <Label>Confirm password</Label>
              <Input placeholder='Enter your password' placeholderTextColor='#b8b8b8' />
            </Item>
            <Item stackedLabel style={{ marginBottom: 15, marginLeft: 0 }}>
              <Label>Therapist code</Label>
              <Input placeholder='Enter therapist code' placeholderTextColor='#b8b8b8' />
            </Item>
          </Form>
          <Button style={{ marginTop: 40, justifyContent: 'center' }} onPress={this._signUpAsync}>
            <Text>Sign up</Text>
          </Button>
        </Content>
      </Container>
    );
  }
  _signInAsync = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('Main');
  };
}
