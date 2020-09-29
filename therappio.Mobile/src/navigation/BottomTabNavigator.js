import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import ActivitiesListsScreen from '../activities/ActivitiesListsScreen';
import ProfileScreen from '../screens/ProfileScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name={'home-outline'} />,
};

HomeStack.path = '';

const ActivitiesStack = createStackNavigator(
  {
    Activities: ActivitiesListsScreen,
  },
  config
);

ActivitiesStack.navigationOptions = {
  tabBarLabel: 'Activities',
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name={'book-open-page-variant'} />,
};

ActivitiesStack.path = '';

const ProfileStack = createStackNavigator(
  {
    Profile: ProfileScreen,
  },
  config
);

ProfileStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name={'account-outline'} />,
};

ProfileStack.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  ActivitiesStack,
  ProfileStack,
});

tabNavigator.path = '';

export default tabNavigator;
