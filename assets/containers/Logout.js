import React from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Button, Container, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';

export default class Login extends React.Component {
    render(){
        if (firebase.auth().currentUser !== null){
            console.log(firebase.auth().currentUser.uid); }
        return (
            <Container style={styles.fondo}>
            <Button bordered 
             style={styles.boton}
             onPress={() => { Actions.Main() }} >
            <Text> Menu </Text> 
            </Button>

            <Button bordered 
             style={styles.boton}
             onPress={() => { firebase.auth().signOut(); Actions.pop() }} >
            <Text> Salir </Text> 
            </Button>

            </Container>
        );
    }
}

const styles = {
    boton: {
        marginTop: '12%',
        alignSelf: 'center',
        backgroundColor: '#CEF6F5',
        height: '10%',
        width: '65%',
        borderRadius: 10,
        borderColor: '#04B4AE',
        justifyContent: 'center'
    },
    fondo: {
        backgroundColor: '#CEF6F5',
        height: '100%',
        width: '100%',
    },
}