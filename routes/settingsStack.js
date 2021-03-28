import { createStackNavigator } from 'react-navigation-stack';
import Settings from '../screens/settings';
import Header from '../shared/header';
import React from 'react';

const screens = {
  Settings: {
    screen: Settings,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => <Header navigation={navigation} title='Settings' />,
        headerStyle: {backgroundColor: '#2c3df5'},
        headerTintColor: '#ffffff',
        headerTitleAlign: 'center',
      }
    }
  }
}

const SettingsStack = createStackNavigator(screens)

export default SettingsStack;