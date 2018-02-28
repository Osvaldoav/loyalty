import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Scene, Router} from 'react-native-router-flux';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import firebase from 'firebase';

import ProductsList from './assets/containers/ProductsList';
import QRScreen from './assets/containers/QRScreen';
import reducers from './assets/reducers';
import Login from './assets/containers/Login';
import SignIn from './assets/containers/SignIn';
import Logout from './assets/containers/Logout';

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
          <Scene hideNavBar>
            <Scene
              key='Login'
              component={Login}
              initial
            />
            <Scene 
              key='Logout'
              component={Logout}
            />
            <Scene
              key='SignIn'
              component={SignIn}
            />
            <Scene key='Main'>
              <Scene key='Products' component={ProductsList} title='Products List' initial/>
              <Scene key='QRCode' component={QRScreen} title='Codigo QR'/>
            </Scene>
          </Scene>
            
        </Router>
      </Provider>
    );
  }
}
