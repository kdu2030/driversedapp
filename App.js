import * as React from 'react';
// import Home from './screens/home';
import Navigator from './routes/drawer';
import invariant from 'fbjs/lib/invariant';
import areEqual from 'fbjs/lib/areEqual';
import Header from './shared/header';
import Log from './screens/log';
import LogStack from './routes/logStack';

/*Inspired from React Native Tutorial - https://www.youtube.com/channel/UCW5YeuERMmlnqo4oq8vwUpg */

export default function App() {
  return (
    <Navigator />
  )
} 
