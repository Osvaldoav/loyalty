import React from 'react';
import { View, Keyboard } from 'react-native';
import firebase from 'firebase';
import 'firebase/firestore';
import { Actions } from 'react-native-router-flux';
import Input from './Input';  
import { Header , Button, Container, Text} from 'native-base';
import Spinner from './Spinner';

export default class SignIn extends React.Component {

    componentWillMount(){
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                var db = firebase.firestore();
                db.doc('Users/' + firebase.auth().currentUser.uid).set(
                {  Points: 0 , Products: []})
            }
        });
    }

    state = { email: '', password: '', password2: '', error: '', loading: false}

    onButtonPress(){
        const { email, password, password2 } = this.state;
        this.setState({error: '', loading: true})

        if( password != password2 ){
            this.onLoginFail()
        }
        else{
            firebase.auth().createUserWithEmailAndPassword(email , password)
                .then(this.onLoginSucces.bind(this))
        }
    }

    async loginWithFacebook(){
        const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync
            ('210427583036372', { permissions: ['public_profile'] })

            if (type == 'success') {
                const credential = firebase.auth.FacebookAuthProvider.credential(token)

                await firebase.auth().signInWithCredential(credential);
                Actions.Logout();
            }
    }

    registerFb(){
        while (firebase.auth().currentUser == null){}
        if (firebase.auth().currentUser !== null){
            var db = firebase.firestore();
            db.doc('Users/' + firebase.auth().currentUser.uid).set(
            {  Points: 0 , Products: []})
            console.log (firebase.auth().currentUser.uid);
        }
    }

    renderButton(){
        if (this.state.loading){
            return <Spinner size="small" />
        }

        return (
            <View>

            <Button bordered style={styles.boton} onPress={this.onButtonPress.bind(this)}>
                <Text style={{ fontSize: 20, color: 'black' }}> Registrarse </Text>
            </Button>

            <Button bordered style={styles.boton} onPress={() => Actions.pop()}>
                <Text style={{ fontSize: 20, color: 'black' }}> Volver </Text>
            </Button>

            <Button bordered style={styles.botonFb} onPress={() => this.loginWithFacebook()}>
                <Text style={{ fontSize: 20, color: 'white' }}> Registrarse con Facebook </Text>
            </Button>

            </View>
        )
    }

    onLoginSucces() {
        this.setState({email: '', password: '', password2: '', loading: false, error: ''});
        var db = firebase.firestore();
        db.doc('Users/' + firebase.auth().currentUser.uid).set(
            {  Points: 0 , Products: []})
        Keyboard.dismiss()
        Actions.pop()
    }

    onLoginFail(){
        this.setState({ password: '', password2: '', loading: false, error: 'Contraseñas Diferentes'});  
        Keyboard.dismiss()
    }

    render(){
        const { contendor, boton , cuadros, error} = styles;
        return(
            <View style={contendor}>
                <View style={{marginTop: '40%'}}>
                <View style={cuadros}>
                <Input
                    secureText={false}
                    placeholder="usuario@gmail.com"
                    label="Email "
                    value={this.state.email}
                    onChangeText={email => this.setState({ email })}
                />
                </View>
                <View style={cuadros}>
                    <Input
                        secureText={true}
                        placeholder="********"
                        label="Contraseña "
                        value={this.state.password}
                        onChangeText={password => this.setState({ password })}
                    />
                </View>
                <View style={cuadros}>
                    <Input
                        secureText={true}
                        placeholder="********"
                        label="Repetir Contraseña "
                        value={this.state.password2}
                        onChangeText={password2 => this.setState({ password2 })}
                    />
                </View>
                <Text style={error}>
                    {this.state.error}
                </Text>
                <View style={cuadros}>
                    {this.renderButton()}
                </View>
                </View>
            </View>
        );
    }
}

const styles = {
    contendor: {
        backgroundColor: '#CEF6F5',
        height: '100%',
        width: '100%',
    },
    cuadros: {
        marginTop: '1%',
        height: '15%',
        width: '100%',
        borderRadius: 7,
        borderColor: '#071418'
    },
    boton: {
        marginTop: '6%',
        alignSelf: 'center',
        backgroundColor: '#CEF6F5',
        height: '33%',
        width: '65%',
        borderRadius: 10,
        borderColor: '#04B4AE',
        justifyContent: 'center'
    },
    error: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    },
    botonFb: {
        marginTop: '6%',
        alignSelf: 'center',
        backgroundColor: '#4267B2',
        height: '33%',
        width: '65%',
        justifyContent: 'center',
        borderRadius: 10,
        borderColor: '#4267B2',
    }
};