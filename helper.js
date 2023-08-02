import { AsyncStorage, Alert } from 'react-native';
import Database from './services/database';

const Helper = {
    alertHandler: function (message) {
        Alert.alert(message);
    },
    saveLocalStorage: async(key, value) => {
        AsyncStorage.setItem(key, JSON.stringify(value));
    },
    isLoggedIn: async (openedApp, ref) => {
        try {
            const item = await AsyncStorage.getItem('LoggedIn');
            const loggedIn = JSON.parse(item);
            if (openedApp) {
                if (loggedIn && loggedIn.status == 'true') {
                    Helper.goToPage('Main', ref);
                }
            } else {
                if (!loggedIn || loggedIn.status == 'false') {
                    Helper.goToPage('Home', ref);
                }
            }
        } catch (e) {
            Helper.goToPage('Home', ref);
        }
    },
    goToPage: function (page, target, params) {
        target.props.navigation.navigate(page, params);
    },
    validateEmail: function (email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    },
    getUser: async () => {
        var item = await AsyncStorage.getItem('User');
        var user = JSON.parse(item);
        return user;
    },
    getUserId: async (username, fullAccount) => {
        if (!username) {
            var user = await Helper.getUser();
            var json = await Helper.getUserId(user.username);
            var userId = json[0].id;
            if (!fullAccount) {
                return userId;
            } else {
                var query = 'SELECT * FROM Users WHERE id = "' + userId + '"';
                var params = {
                    Method: 'query',
                    Module: 'Database',
                    params: {
                        query: query
                    }
                };

                var json = await Database(params);
                return json;
            }
        } else {
            var query = 'SELECT id FROM Users WHERE username = "' + username + '"';
            var params = {
                Method: 'query',
                Module: 'Database',
                params: {
                    query: query
                }
            };

            return await Database(params);
        }
    }
};

export default Helper;