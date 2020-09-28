import React from "react";
import {
  Container,
  Content,
  Button,
  Text,
  Form,
  Item,
  Input,
  Label,
  View
} from "native-base";
import styles from "../theme/styles";

export default class ForgotPasswordScreen extends React.Component {
  static navigationOptions = {
    title: "Reset password"
  };

  render() {
    return (
      <Container>
        <Content contentContainerStyle={styles.signInContainer}>
          <Form>
            <Item stackedLabel style={{ marginBottom: 15, marginLeft: 0 }}>
              <Label>Email</Label>
              <Input
                placeholder="Enter your email address"
                placeholderTextColor="#b8b8b8"
              />
            </Item>
          </Form>
          <Button
            style={{ marginTop: 40, justifyContent: "center" }}
            onPress={this._signInAsync}
          >
            <Text>Reset password</Text>
          </Button>
        </Content>
      </Container>
    );
  }
  _signInAsync = async () => {
    await AsyncStorage.setItem("userToken", "abc");
    this.props.navigation.navigate("Main");
  };
}
