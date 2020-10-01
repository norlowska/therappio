import React, { useEffect } from 'react';
import { ActivityIndicator, StatusBar, View } from 'react-native';
import { connect } from 'react-redux';
import { userActions } from '../_actions';

const AuthLoadingScreen = ({ getAuthToken, isAuthenticated, isFetching, navigation }) => {
  useEffect(() => {
    console.log('auth');
    getAuthToken();
  }, []);

  // Render any loading content that you like here
  return (
    <View>
      <ActivityIndicator />
      <StatusBar barStyle='default' />
    </View>
  );
};

const mapStateToProps = (state, props) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isFetching: state.auth.isFetching,
});

const mapDispatchToProps = {
  getAuthToken: userActions.getAuthToken,
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthLoadingScreen);
