/**
 * @format
 */

import 'react-native-reanimated';
import { enableScreens } from 'react-native-screens';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

enableScreens(false);


AppRegistry.registerComponent(appName, () => App);
