import React, { Component } from 'react';
import { ActivityIndicator, Platform, Alert, AlertIOS, Image, Button, StyleSheet, View, TouchableHighlight, TextInput, ListView } from 'react-native';
import { Container, Content, Text, StyleProvider } from 'native-base';
import { createStackNavigator } from 'react-navigation';
import { Input, FormValidationMessage } from 'react-native-elements';
import ButtonComponent, { CircleButton, RoundButton, RectangleButton } from 'react-native-button-component';
import Helper from '../helper';
import PhotoUpload from 'react-native-photo-upload'

class LogOutPage extends React.Component {

    constructor(props) {
        super(props);
        this.start();
    }

    state = {
        loading: false
    };

    start = () => {
        Helper.saveLocalStorage('LoggedIn', null);
        Helper.saveLocalStorage('User', null);
        Helper.alertHandler('Logged out');
        this.goToPage('Home', {});
    };

    goToPage = (page, params) => {
        this.props.navigation.navigate(page, params);
    };

    render() {

        return (

            <View style={{ flex: 1,alignItems: 'center', backgroundColor: '#fff'}}>

                {this.state.loading &&
                <View style={styles.loading}>
                    <ActivityIndicator size='large'/>
                </View>
                }

                <View style={{ marginTop: 20, flex: 1}}>
                    <Text>Logging Out</Text>
                </View>

            </View>

        );
    }
}

export default LogOutPage;

const styles = StyleSheet.create({
    buttons: {
        flexDirection: 'row',
        backgroundColor: 'purple',
        marginTop: 20
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 80
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
});


