import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import React from 'react';
import { Platform, StatusBar } from 'react-native';
import { StyleProvider, Container } from 'native-base';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './src/_reducers';
import getTheme from './src/theme/components';
import { commonColor } from './src/theme/variables';
import AppNavigator from './src/navigation/AppNavigator';
import './src/_utilities/axios';
import { navigationService } from './src/_services';

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      'Raleway-Light': require('./assets/fonts/Raleway-Light.ttf'),
      'Raleway-Regular': require('./assets/fonts/Raleway-Regular.ttf'),
      'Raleway-Medium': require('./assets/fonts/Raleway-Medium.ttf'),
      'Raleway-SemiBold': require('./assets/fonts/Raleway-SemiBold.ttf'),
      'Raleway-Bold': require('./assets/fonts/Raleway-Bold.ttf'),
      MaterialCommunityIcons: require('native-base/Fonts/MaterialCommunityIcons.ttf'),
    });
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return (
      <StyleProvider style={getTheme(commonColor)}>
        <Provider store={store}>
          <Container>
            {Platform.OS === 'ios' && <StatusBar barStyle='default' />}
            <AppNavigator
              ref={navigatorRef => {
                navigationService.setTopLevelNavigator(navigatorRef);
              }}
            />
          </Container>
        </Provider>
      </StyleProvider>
    );
  }
}
