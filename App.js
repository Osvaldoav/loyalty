import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Scene, Router} from 'react-native-router-flux';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import firebase from 'firebase';

import PriceList from './assets/containers/PriceList';
import QRScreen from './assets/containers/QRScreen';
import reducers from './assets/reducers';

export default class App extends Component {
  componentWillMount(){
    firebase.initializeApp({
      apiKey: 'AIzaSyC5Krk8fIY2fJFNbiODvXlslj9x97HsAko',
      authDomain: 'loyalty-eb0a2.firebaseapp.com',
      databaseURL: 'https://loyalty-eb0a2.firebaseio.com',
      projectId: 'loyalty-eb0a2',
      storageBucket: 'loyalty-eb0a2.appspot.com',
      messagingSenderId: '123456789',
    });
  }

  render() {
    return (
      <Provider store={createStore(reducers)}>
        <Router>
          <Scene key='root'>
            <Scene key='Products' component={PriceList} title='Price List' initial/>
            <Scene key='QRCode' component={QRScreen} title='Codigo QR'/>
          </Scene>
        </Router>
      </Provider>

    );
  }
}
