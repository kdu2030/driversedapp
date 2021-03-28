import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Log from '../screens/log';
import LogDetails from '../screens/logDetails';
import Header from '../shared/header';

const screens = {
  Log: {
    screen: Log,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => <Header navigation={navigation} title="Log" />,
        headerStyle: { backgroundColor: '#2c3df5' },
        headerTintColor: '#ffffff',
        headerTitleAlign: 'center',
      };
    },
  },
  Details: {
    screen: LogDetails,
    navigationOptions: {
      headerStyle: { backgroundColor: '#2c3df5' },
      headerTintColor: '#ffffff',
      headerTitleAlign: 'center',
      headerTitleStyle: { fontWeight: 'bold', fontSize: 20 },
    },
  },
};

const LogStack = createStackNavigator(screens);

export default LogStack;

//export default createAppContainer(LogStack);
