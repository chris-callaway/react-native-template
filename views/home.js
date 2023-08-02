import React, { Component } from 'react';
import { AsyncStorage, ActivityIndicator, Image, Button, StyleSheet, View, ScrollView, } from 'react-native';
import { Input, FormValidationMessage } from 'react-native-elements';
import ButtonComponent, { CircleButton, RoundButton, RectangleButton } from 'react-native-button-component';
import Helper from '../helper';
import Database from '../services/database';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default class HomeScreen extends React.Component {
    // above code...
    
    constructor(props) {
        super(props);
        Helper.isLoggedIn(true, this);
    }

    state = {
        loading: false,
        username: '',
        password: ''
    };

    componentDidMount() {
        var self = this;
        this.props.navigation.addListener(
            'willFocus',
            () => {
                self.isLoggedIn(true);
            }
        );
    }

    componentDidUpdate() {
        
    }

    isLoggedIn = async (openedApp) => {
        const item = AsyncStorage.getItem('LoggedIn');
        if (item){
            await item.json();
            const loggedIn = JSON.parse(item);
            if (openedApp) {
                if (loggedIn) {
                    this.goToPage('Main', {});
                }
            }
        }
    }

    login = async (username, password) => {
        this.setState({loading: true});
        var params = {
            Method: 'login',
            Module: 'Auth',
            params: {
                username: username,
                password: password
            }
        };

        var result = await Database(params);
        if (result && result.msg == 'Login success') {
            await Helper.saveLocalStorage('LoggedIn', {'status': 'true'});
            var user = await Helper.getUserId(username, true);
            if (!user){
                Helper.alertHandler('Could not find user');
            } else {
                if (!user){
                    Helper.alertHandler('Could not find user');
                } else {
                    await Helper.saveLocalStorage('User', {username: username, id: user[0].id});
                    this.setState({loading: false});
                    this.goToPage('Main', {});
                    return;
                }
            }
        } else {
            Helper.alertHandler('Your login information is not correct');
            this.setState({loading: false});
        }
    };

    goToPage = (page, params) => {
        this.props.navigation.navigate(page, params);
    };

    render() {
        const animating = this.state.animating;
    
    return (
 

<KeyboardAwareScrollView style={{backgroundColor: '#fff'}}>

<ScrollView
    contentContainerStyle={{ flex: 1, alignItems: 'center', marginTop: 20, backgroundColor: '#fff', justifyContent: 'center'}}>

    {this.state.loading &&
    <View style={styles.loading}>
        <ActivityIndicator size='large'/>
    </View>
    }

    <View style={{ width: 250, flexDirection:'row', marginBottom: 20}}>
        <Image source={require('./../img/logo.png')}
               style={{resizeMode: 'contain', width: 250, height: 251, flex: 1.0}}/>
    </View>

    <View style={{ alignItems: 'center'}}>

        <View style={{flexDirection:'row'}}>

            <Input label="Username" returnKeyType="next" returnKeyLabel="Next"
                        onChangeText={(text) => this.username = text}
                        containerStyle={ styles.formInputs }/>
        </View>

        <View style={{flexDirection:'row'}}>
            <Input label="Password" secureTextEntry={true} onChangeText={(text) => this.password = text}
                        containerStyle={ styles.formInputs }/>
        </View>

        <View style={{flexDirection:'row', marginTop: 40}}>
            <ButtonComponent
                text="Login"
                type="primary"
                shape="rectangle"
                backgroundColors={['#ec2227', '#ec2227']}
                gradientStart={{ x: 10, y: 10 }}
                gradientEnd={{ x: 10, y: 10 }}
                height={50}
                width={250}
                flex={1.0}
                color="#2658db"
                onPress={ () => this.login(this.username, this.password) }
                >
            </ButtonComponent>
        </View>

        <View style={{flexDirection:'row'}}>
            <Button onPress={ () => this.goToPage('SignUp', {}) } color={'#ec2227'}
                    title="Sign Up"></Button>

        </View>

    </View>

</ScrollView>

</KeyboardAwareScrollView>
      
     )
    }
    }

const styles = StyleSheet.create({
    formInputs: {
        width: 250,
        marginBottom: 20
    },
    buttons: {
        flexDirection: 'row',
        backgroundColor: '#2658db',
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


