/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import IssueList, { BlackList } from './IssueList.js';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';


const Tab = createBottomTabNavigator();

export default class App extends React.Component {
  render() {
    return (

      <>
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen name="Issue List" component={IssueList} />
            <Tab.Screen name="Black List" component={BlackList} />
          </Tab.Navigator>
        </NavigationContainer>
      </>
    );

  }
}
