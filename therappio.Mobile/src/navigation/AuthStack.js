import { createStackNavigator } from 'react-navigation-stack';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';

const AuthStack = createStackNavigator(
  {
    SignIn: SignInScreen,
    SignUp: SignUpScreen,
    ForgotPassword: ForgotPasswordScreen,
  },
  {
    initialRouteName: 'SignIn',
  }
);

export default AuthStack;
