import React, {Component} from 'react';
import {Footer, FooterTab, Button, Text, Icon} from 'native-base';

class FooterBar extends Component {

    render () {
        return (
            <Footer>
                <FooterTab>
                    <Button vertical>
                        <Icon name="apps" />
                        <Text>Apps</Text>
                    </Button>
                    <Button vertical>
                        <Icon name="camera" />
                        <Text>Camera</Text>
                    </Button>
                    <Button vertical active>
                        <Icon active name="navigate" />
                        <Text>Navigate</Text>
                    </Button>
                    <Button vertical>
                        <Icon name="person" />
                        <Text>Contact</Text>
                    </Button>
                </FooterTab>
            </Footer>
        );
    }
}

const styles = {
    container: {
        backgroundColor: '#000',
        height: 30
    }
};

export default FooterBar;