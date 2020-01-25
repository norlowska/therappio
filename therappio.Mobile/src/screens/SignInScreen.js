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
import { TouchableOpacity } from "react-native-gesture-handler";

class SignInScreen extends React.Component {
  static navigationOptions = {
    // title: "Sign in",
    // headerTintColor: "#438edb"
    header: null
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
            <Item stackedLabel style={{ marginBottom: 15, marginLeft: 0 }}>
              <Label>Password</Label>
              <Input
                placeholder="Enter your password"
                placeholderTextColor="#b8b8b8"
              />
            </Item>
          </Form>
          <Button
            style={{ marginTop: 40, justifyContent: "center" }}
            onPress={this._signInAsync}
          >
            <Text>Sign in</Text>
          </Button>
          <View style={styles.signInLinks}>
            <TouchableOpacity onPress={() => this._onLinkPress("SignUp")}>
              <Text style={styles.link}>Sign up</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this._onLinkPress("ForgotPassword")}
            >
              <Text style={styles.link}>Forgot password?</Text>
            </TouchableOpacity>
          </View>
        </Content>
      </Container>
    );
  }

  _onLinkPress = linkName => {
    this.props.navigation.navigate(linkName);
  };

  _signInAsync = async () => {
    await AsyncStorage.setItem("userToken", "abc");
    this.props.navigation.navigate("Main");
  };
}

export default SignInScreen;
