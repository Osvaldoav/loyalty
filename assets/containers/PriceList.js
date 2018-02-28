import React,{Component} from 'react';
import {Text, ScrollView, View} from 'react-native';
import firebase from 'firebase';
import 'firebase/firestore';
import Header from './Header';
import PriceDetail from './PriceDetail';

class PriceList extends Component{
    state = {products: [], productsLoaded: false};
    
    componentWillMount(){
        const db = firebase.firestore();
        db.collection('Products').get()
        .then((snapshot) => {
            products = [];
            snapshot.forEach((doc) => {
                product = doc.data();
                product.Id = doc.id;
                products.push(product);
            });
            this.setState({products});
            this.setState({productsLoaded: true});
        })
        .catch((err) => {
            console.log('Error getting documents', err);
        });
    }

    renderPrices(){
        return this.state.products.map(product => 
            <PriceDetail key={product.Id} product={product}></PriceDetail>
        );
    }

    render(){
        return(
            <View style={styles.container}>
                <ScrollView>
                    {this.state.productsLoaded ? this.renderPrices() : null}
                </ScrollView>
            </View>

        );
    }
}

const styles = {
    container: {
      flex: 1,
      backgroundColor: '#fff'
    }
  }

export default PriceList;