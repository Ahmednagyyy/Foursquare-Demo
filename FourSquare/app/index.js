import React, { Component } from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { StoreProvider } from 'easy-peasy';
import { Actions, Router, Scene, Modal } from 'react-native-router-flux';
import { ThemeProvider } from 'react-native-elements';
import { Platform, View, Text, TouchableOpacity, AsyncStorage, Alert } from 'react-native';
import { authorize, revoke } from 'react-native-app-auth';
import Config from "react-native-config";
import axios from 'axios';


export default class App extends Component {


  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                  <Text>Foursquare Demo</Text>
      </View>
    );
  }
}
