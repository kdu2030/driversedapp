import { createStackNavigator } from 'react-navigation-stack';
import Home from '../screens/home';
import Header from '../shared/header';
import React from 'react';

const screens = {
  Home: {
    screen: Home,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => <Header navigation={navigation} title='Drive45' />,
        headerStyle: {backgroundColor: '#2c3df5'},
        headerTintColor: '#ffffff',
        headerTitleAlign: 'center',
      }
    }
  }
}

const HomeStack = createStackNavigator(screens)

export default HomeStack;