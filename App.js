/**
 * @format
 */

import {
  AppRegistry,
  Platform,
  Alert,
  AlertIOS
} from 'react-native';
// import App from './App';
// import {
//     name as appName
// } from './app.json';
import React, {
  Component
} from 'react';
import EulaPage from './views/eula';
import HomePage from './views/home';
import MainPage from './views/main';
import SignUpPage from './views/signup';
import EditProfilePage from './views/editprofile';
import VideosPage from './views/videos';
import UploadPage from './views/upload';
import AddPartyPage from './views/addparty';
import EditPartyPage from './views/editparty';
import EditPartyDetailsPage from './views/subviews/editparty-details';
import ReportingPage from './views/reporting';
import LogOutPage from './views/logout';
import {
  Button,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TextInput,
  ListView
} from 'react-native';
import {
  Icon
} from 'react-native-elements';
import { createAppContainer, StackNavigator } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import CustomTableCell from './components/custom-table-cell';
import CustomTableCellVideo from './components/custom-table-cell-video';
import Helper from './helper';

var Props = {};
console.disableYellowBox = true;


// drawer stack
const DrawerStack = createDrawerNavigator({
  'Find A Party': {
      screen: MainPage, navigationOptions: ({ navigation }) => ({
          headerLeft: <Icon style={styles.menuBtn} name="menu" size={35}
                            onPress={ () => navigation.navigate('DrawerOpen') }/>,
          title: typeof(navigation.state.params) === 'undefined' || typeof(navigation.state.params.title) === 'undefined' ? 'Find A Party' : navigation.state.params.title,
          headerRight: typeof(navigation.state.params) === 'undefined' || typeof(navigation.state.params.headerRight) === 'undefined' ?
              '' : navigation.state.params.headerRight
      })
  },
  'Edit Profile': {
      screen: EditProfilePage, navigationOptions: ({navigation }) => ({
          drawerLabel: 'Edit Profile',
          title: typeof(navigation.state.params) === 'undefined' || typeof(navigation.state.params.title) === 'undefined' ? 'Edit Profile' : navigation.state.params.title,
          headerRight: typeof(navigation.state.params) === 'undefined' || typeof(navigation.state.params.headerRight) === 'undefined' ?
              '' : navigation.state.params.headerRight
      })
  },
  'Your Parties': {
      screen: EditPartyPage, navigationOptions: ({navigation }) => ({
          drawerLabel: 'Your Parties',
          title: typeof(navigation.state.params) === 'undefined' || typeof(navigation.state.params.title) === 'undefined' ? 'Your Parties' : navigation.state.params.title,
          headerRight: typeof(navigation.state.params) === 'undefined' || typeof(navigation.state.params.headerRight) === 'undefined' ?
              '' : navigation.state.params.headerRight
      })
  },
  'Reporting': {
      screen: ReportingPage, navigationOptions: ({navigation }) => ({
          drawerLabel: 'Reporting',
          title: typeof(navigation.state.params) === 'undefined' || typeof(navigation.state.params.title) === 'undefined' ? 'Reporting' : navigation.state.params.title,
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
          obj.headerRight = <Text>test</Text>;
          obj.headerLeft = <Icon style={styles.menuBtn} name="menu" size={35}
                                 onPress={() => {navigation.openDrawer()}}></Icon>;
          obj.headerRight = <Text onPress={() => {navigation.navigate('AddParty')}}
                                  style={styles.headerBtn}>Add</Text>;
          break;
      case 'Find A Party':
          obj.headerRight = <Text>test</Text>;
          obj.headerLeft = <Icon style={styles.menuBtn} name="menu" size={35}
                                 onPress={() => {navigation.openDrawer()}}></Icon>;
          obj.headerRight = <Text onPress={() => {navigation.navigate('AddParty')}}
                                  style={styles.headerBtn}>Add</Text>;
          break;
      case 'Your Parties':
          obj.headerLeft = <Icon style={styles.menuBtn} name="menu" size={35}
                                 onPress={ () => navigation.openDrawer() }/>;
          break;
      case 'Edit Profile':
          obj.headerLeft = <Icon style={styles.menuBtn} name="menu" size={35}
                                 onPress={ () => navigation.openDrawer() }/>;
          break;
      case 'Reporting':
          obj.headerLeft = <Icon style={styles.menuBtn} name="menu" size={35}
                                 onPress={ () => navigation.openDrawer() }/>;
          obj.headerRight = <Text onPress={() => {navigation.navigate('ReportingFilters')}}
                                  style={styles.headerBtn}>Filter</Text>;
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
  Eula: {
      screen: EulaPage,
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
          title: typeof(navigation.state.params) === 'undefined' || typeof(navigation.state.params.title) === 'undefined' ? 'Find A Party' : navigation.state.params.title,
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
          navigation.navigate('Eula');
          }} style={styles.headerBtn}>EULA</Text>,
          headerTintColor: '#fff',
          headerStyle: {
              backgroundColor: '#ec2227'
          }
      })
  },
  Videos: {
      screen: VideosPage,
      navigationOptions: ({navigation}) => ({
          title: 'Videos',
          headerRight: <Text onPress={() => {
          // send selected party id to next view
          var partyId = navigation.getParam('id', null);
          navigation.navigate('Upload', {id: partyId});
          }} style={styles.headerBtn}>Upload</Text>,
          headerTintColor: '#fff',
          headerStyle: {
              backgroundColor: '#ec2227'
          }
      })
  },
  Upload: {
      screen: UploadPage,
      navigationOptions: ({navigation}) => ({
          title: typeof(navigation.state.params) === 'undefined' || typeof(navigation.state.params.title) === 'undefined' ? 'Upload' : navigation.state.params.title,
          headerRight: typeof(navigation.state.params) === 'undefined' || typeof(navigation.state.params.headerRight) === 'undefined' ?
              '' : navigation.state.params.headerRight,
          headerTintColor: '#fff',
          headerStyle: {
              backgroundColor: '#ec2227'
          }
      })
  },
  AddParty: {
      screen: AddPartyPage,
      navigationOptions: ({navigation}) => ({
          title: typeof(navigation.state.params) === 'undefined' || typeof(navigation.state.params.title) === 'undefined' ? 'Add A Party' : navigation.state.params.title,
          headerRight: typeof(navigation.state.params) === 'undefined' || typeof(navigation.state.params.headerRight) === 'undefined' ?
              '' : navigation.state.params.headerRight,
          headerTintColor: '#fff',
          headerStyle: {
              backgroundColor: '#ec2227'
          }
      })
  },
  EditParty: {
      screen: EditPartyPage,
      navigationOptions: ({navigation}) => ({
          title: typeof(navigation.state.params) === 'undefined' || typeof(navigation.state.params.title) === 'undefined' ? 'Edit Parties' : navigation.state.params.title,
          headerRight: typeof(navigation.state.params) === 'undefined' || typeof(navigation.state.params.headerRight) === 'undefined' ?
              '' : navigation.state.params.headerRight,
          headerTintColor: '#fff',
          headerStyle: {
              backgroundColor: '#ec2227'
          }
      })
  },
  EditPartyDetails: {
      screen: EditPartyDetailsPage,
      navigationOptions: ({navigation}) => ({
          title: typeof(navigation.state.params) === 'undefined' || typeof(navigation.state.params.title) === 'undefined' ? 'Edit Party' : navigation.state.params.title,
          headerRight: typeof(navigation.state.params) === 'undefined' || typeof(navigation.state.params.headerRight) === 'undefined' ?
              '' : navigation.state.params.headerRight,
          headerTintColor: '#fff',
          headerStyle: {
              backgroundColor: '#ec2227'
          }
      })
  },
  EditProfile: {
      screen: EditProfilePage,
      navigationOptions: ({navigation}) => ({
          title: 'Edit Profile',
          headerTintColor: '#fff',
          headerStyle: {
              backgroundColor: '#ec2227'
          }
      })
  },
  Reporting: {
      screen: ReportingPage,
      navigationOptions: ({navigation}) => ({
          title: 'Reporting',
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



// headerStyle: {backgroundColor: 'purple'},
//     title: 'Find A Party',
//     headerTintColor: 'white',