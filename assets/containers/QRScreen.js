import React, {Component} from 'react';
import {View} from 'react-native';
import QRCode from 'react-native-qrcode';
import { connect } from 'react-redux';

class QRScreen extends Component {
    constructor(props){
        super(props);
    }

    render(){
        console.log(this.props);
        const {Id, Points} = this.props.product;
        const str = Id + '|' + Points;
        // const str = this.props.selectedProduct + '|' + this.props.price.Id + '|' + this.props.price.Points;
        return (
            <View style={styles.ContainerStyle}>
                <QRCode
                    value={str}
                    size={200}
                    bgColor='#000'
                    fgColor='white'/>
            </View>
        );
    }
}


const styles = {
    ContainerStyle: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    }
};

const mapStateToProps = state => {
    return {product: state.selectedProduct};
};

export default connect(mapStateToProps)(QRScreen);