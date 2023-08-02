/**
 * @format
 */

import {
    AppRegistry, StyleSheet, Text } from 'react-native';
import React, { Component } from 'react';
import 'react-native-gesture-handler';
import HomePage from './views/home';
import MainPage from './views/main';
import SignUpPage from './views/signup';
import LogOutPage from './views/logout';
import { Icon } from 'react-native-elements';
import { createAppContainer, StackNavigator } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import CustomTableCell from './components/custom-table-cell';
import CustomTableCellVideo from './components/custom-table-cell-video';

var Props = {};
console.disableYellowBox = true;

// drawer stack
const DrawerStack = createDrawerNavigator({
    'Main': {
        screen: MainPage, navigationOptions: ({ navigation }) => ({
            headerLeft: <Icon style={styles.menuBtn} name="menu" size={35}
                              onPress={ () => navigation.navigate('DrawerOpen') }/>,
            title: typeof(navigation.state.params) === 'undefined' || typeof(navigation.state.params.title) === 'undefined' ? 'Main' : navigation.state.params.title,
            headerRight: typeof(navigation.state.params) === 'undefined' || typeof(navigation.state.params.headerRight) === 'undefined' ?
                '' : navigation.state.params.headerRight
        })
    },
    'Log Out': {screen: LogOutPage}
});

DrawerStack.navigationOptions = ({ navigation }) => {
    const { routeName } = navigation.state.routes[navigation.state.index];

    // You can do whatever you like here to pick the title based on the route name
    const headerTitle = routeName;
    var obj = {
        headerTitle: headerTitle,
        headerLeft: ''
    };

    console.log('headerTitle is', headerTitle);
    switch (headerTitle) {
        // only need to override items that appear on menu
        case 'Home':
            obj.headerLeft = <Icon style={styles.menuBtn} name="menu" size={35}
                                   onPress={() => {navigation.openDrawer()}}></Icon>;
            obj.headerRight = <Text onPress={() => {navigation.navigate('')}}
                                    style={styles.headerBtn}>Button</Text>;
            break;
        case 'Main':
            obj.headerLeft = <Icon style={styles.menuBtn} name="menu" size={35}
                                   onPress={() => {navigation.openDrawer()}}></Icon>;
            obj.headerRight = <Text onPress={() => {navigation.navigate('')}}
                                    style={styles.headerBtn}>Button</Text>;
            break;
    }

    return obj;
};

const MainNavigation = createAppContainer(createStackNavigator({
    Home: {
        screen: HomePage,
        navigationOptions: ({navigation}) => ({
            headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: '#ec2227'
            },
            headerRight: ''

        })
    },
    Main: {
        screen: DrawerStack,
        navigationOptions: ({ navigation }) => ({
            headerTintColor: '#fff',
            title: typeof(navigation.state.params) === 'undefined' || typeof(navigation.state.params.title) === 'undefined' ? 'Main' : navigation.state.params.title,
            headerStyle: {
                backgroundColor: '#ec2227'
            }
        })
    },
    SignUp: {
        screen: SignUpPage,
        navigationOptions: ({navigation}) => ({
            title: 'Sign Up',
            headerRight: <Text onPress={() => {
            navigation.navigate('');
            }} style={styles.headerBtn}>EULA</Text>,
            headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: '#ec2227'
            }
        })
    },
    LogOut: {
        screen: LogOutPage,
        navigationOptions: ({navigation}) => ({
            title: 'Log Out',
            headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: '#ec2227'
            }
        })
    },
}, {
    initialRouteName: 'Home'
}));

  //AppRegistry.registerComponent('partyfinder', () => MainNavigation);

AppRegistry.registerComponent('ReactNativeTemplate', () => MainNavigation);
AppRegistry.registerComponent('CustomTableCell', () => CustomTableCell);
AppRegistry.registerComponent('CustomTableCellVideo', () => CustomTableCellVideo);

const styles = StyleSheet.create({
    menuBtn: {
        marginLeft: 50,
        color: '#fff'
    },
    headerBtn: {
        marginRight: 10,
        color: '#fff',
        fontSize: 16
    }
});

const Apps = createAppContainer(MainNavigation);
export default class App extends React.Component {
    render() {
        return <Apps />;
    }
}