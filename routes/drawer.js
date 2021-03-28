import {  createDrawerNavigator } from 'react-navigation-drawer'
import { createAppContainer } from 'react-navigation';

import HomeStack from './homeStack';
import LogStack from './logStack';
import SettingsStack from './settingsStack';

const RootDrawerNavigator = createDrawerNavigator({
  Home: {
    screen: HomeStack,
  },
  Log: {
    screen: LogStack,
  },
  Settings: {
    screen: SettingsStack,
  }
})

export default createAppContainer(RootDrawerNavigator)