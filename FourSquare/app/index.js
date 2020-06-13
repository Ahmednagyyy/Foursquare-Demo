import React, { Component } from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { StoreProvider } from 'easy-peasy';
import { Actions, Router, Scene, Modal } from 'react-native-router-flux';
import { ThemeProvider } from 'react-native-elements';
import { Platform, View, Text } from 'react-native';

export default class App extends Component {
  render() {
    return (
      <View>
        <Text>Hello</Text>
      </View>
    );
  }
}
