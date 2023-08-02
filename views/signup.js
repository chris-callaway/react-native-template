import React, { Component } from 'react';
import { ActivityIndicator, Platform, Alert, AlertIOS, Image, Button, StyleSheet, View, TouchableHighlight, TextInput, ListView } from 'react-native';
import { Container, Content, Text, StyleProvider } from 'native-base';
import { createStackNavigator } from 'react-navigation';
import { Input, FormValidationMessage } from 'react-native-elements';
import ButtonComponent, { CircleButton, RoundButton, RectangleButton } from 'react-native-button-component';
import Helper from '../helper';
import PhotoUpload from 'react-native-photo-upload'

class SignUpPage extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        loading: false,
        username: '',
        password: '',
        imgSrc: 'https://www.sparklabs.com/forum/styles/comboot/theme/images/default_avatar.jpg'
    };

    validateForm = (email, username, password, profileImg) => {
        var valid = true;
        if (!Helper.validateEmail(email)) {
            Helper.alertHandler('Please enter a valid email.');
            valid = false;
        } else if (!username || username.length < 5) {
            Helper.alertHandler('Your username must be at least 5 characters long.');
            valid = false;
        } else if (!password || password.length < 5) {
            Helper.alertHandler('Your password must be at least 5 characters long.');
            valid = false;
        } else if (!profileImg || profileImg.indexOf('default_avatar') > -1) {
            Helper.alertHandler('Please upload an image for your profile.');
            valid = false;
        }
        return valid;
    };

    goToPage = (page, params) => {
        this.props.navigation.navigate(page, params);
    };

    createAccount = async (email, username, password, profileImg) => {
        var valid = this.validateForm(email, username, password, profileImg);
        if (valid) {
            this.setState({loading: true});
            var params = {
                Method: 'createAccount',
                Module: 'Account',
                params: {
                    account: {
                        email: email,
                        username: username,
                        password: password,
                        profile_img: profileImg
                    }
                }
            };

            var json = await Database(params);
            this.setState({loading: false});
            if (json && json.msg == 'User created successfully') {
                Helper.alertHandler(json.msg);
                this.goToPage('Home', {});
            } else if (json.msg == 'Email is not valid') {
                Helper.alertHandler(json.msg);
            } else {
                Helper.alertHandler('Save failed.  Please try again later.');
            }

            return json;
           
        }

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

                    <View style={{flexDirection:'row'}}>
                        <Input label="Email"  onChangeText={(text) => this.email = text} containerStyle={ styles.formInputs }/>
                    </View>

                    <View style={{flexDirection:'row'}}>
                        <Input label="Username"  onChangeText={(text) => this.username = text} containerStyle={ styles.formInputs }/>
                    </View>

                    <View style={{flexDirection:'row'}}>
                        <Input label="Password" secureTextEntry={true} onChangeText={(text) => this.password = text}
                                   containerStyle={ styles.formInputs }/>
                    </View>

                    <View style={{flexDirection:'row', marginTop: 20}}>
                        <Text style={{color: '#fff'}}>Profile Image</Text>
                    </View>
                    <View style={{flexDirection:'row', marginTop: 20}}>
                        {this.state.imageLoading &&
                        <View style={styles.loading}>
                            <ActivityIndicator size='large'/>
                        </View>
                        }
                        <PhotoUpload
                            onStart={() => {this.setState({imageLoading: true})}}
                            onCancel={() => {this.setState({imageLoading: false})}}
                            photoPickerTitle="Select Profile Image"
                            onPhotoSelect={avatar => {
                                 if (avatar) {
                                   this.setState({imgSrc: 'data:image/png;base64,' + avatar, imageLoading: false});
                                 }
                               }}>
                            <Image style={{
                           paddingVertical: 30,
                           width: 150,
                           height: 150,
                           borderRadius: 75
                         }} resizeMode='cover' source={{
                           uri: this.state.imgSrc
                         }}/>
                        </PhotoUpload>

                        {
                            //<Image
                            //style={{width: 100, height: 100, resizeMode: 'contain'}}
                            //source={{uri: base64Icon}}/>
                        }
                    </View>


                    <View style={{flexDirection:'row', marginTop: 40, flex: 1.0}}>
                        <ButtonComponent
                            text="Sign Up"
                            type="primary"
                            shape="rectangle"
                            backgroundColors={['#ec2227', '#ec2227']}
                            gradientStart={{ x: 10, y: 10 }}
                            gradientEnd={{ x: 10, y: 10 }}
                            height={50}
                            width={350}
                            flex={1.0}
                            onPress={ () => this.createAccount(this.email, this.username, this.password, this.state.imgSrc) }
                            >
                        </ButtonComponent>
                    </View>

                    <View
                        style={{flexDirection:'row', flex: 1.0, marginTop: 20, paddingTop: 0, paddingLeft: 5, paddingRight: 5}}><Text
                        style={{fontSize: 7}}>By
                        Signing
                        Up
                        You
                        Agree to the
                        EULA Agreement for this app available in the upper
                        right corner</Text></View>

                </View>

            </View>

        );
    }
}

export default SignUpPage;

const styles = StyleSheet.create({
    formInputs: {
        flex: 1,
        marginBottom: 20
    },
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


