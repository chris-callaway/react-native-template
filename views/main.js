import React, { Component } from 'react';
import { ActionSheetIOS, ActivityIndicator, Platform, Alert, AlertIOS, Image, Button, StyleSheet, View, TouchableHighlight, TextInput, ListView } from 'react-native';
import { Container, Content, Text, StyleProvider } from 'native-base';
import { createStackNavigator } from 'react-navigation';
import { Icon, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import ButtonComponent, { CircleButton, RoundButton, RectangleButton } from 'react-native-button-component';
import TableView from 'react-native-tableview';
const { Section, Item } = TableView;
import moment from 'moment/min/moment-with-locales.min';
import Helper from '../helper';

class MainPage extends React.Component {

    constructor(props) {
        super(props);
        console.log('on main');
        //Helper.isLoggedIn(null, this);
        this.parties = this.getParties();
    }

    componentDidMount() {
        this.props.navigation.setParams({
            title: 'Main',
            headerRight: <Text onPress={() => {this.props.navigation.navigate('')}}
                               style={styles.headerBtn}>Button</Text>
        });
        this.props.navigation.addListener(
            'willFocus',
            () => {
                console.log('focused');
                this.parties = this.getParties();
            }
        );

        this.parties = this.getParties();
        console.log('component mounted');
    }

    state = {
        loading: false,
        parties: []
    };

    showMenu = (event) => {
        var day = moment();
        var fullDate = event.startDate + ' ' + event.startTime;
        console.log('event', event);
        var threshold = moment(fullDate, 'MM/DD/YYYY hh:mm a').add(1, 'hours');
        if (moment().isAfter(threshold)) {
            // watch and upload videos
        } else {
            // not time for videos
        }
        ActionSheetIOS.showActionSheetWithOptions({
                options: ['Cancel', 'Remove'],
                destructiveButtonIndex: 1,
                cancelButtonIndex: 0
            },
            (buttonIndex) => {
                if (buttonIndex === 1) { /* destructive action */
                }
            });
    };

    goToPage = (page, params) => {
        this.props.navigation.navigate(page, params);
    };

    async getParties() {
        this.setState({loading: true});
        var query = 'SELECT c.username, c.profile_img, b.*, COALESCE((SELECT AVG(rating) FROM Ratings a WHERE a.party_id=b.id GROUP BY a.party_id), 0) AS \"AVG\" FROM Parties b LEFT JOIN Users c on c.id = b.user_id WHERE STR_TO_DATE(b.end_date, "%m/%d/%y %h:%i %p") > DATE(NOW())  ORDER BY \"AVG\" ASC';
        var obj = {
            Method: 'query',
            Module: 'Database',
            params: {
                query: query
            }
        };

        fetch('http://192.169.217.115:7099/partyfinder/', {
            method: 'POST',
            headers: {
                Authorization: 'Basic c2F1bUBhbHR1c2pvYnMuY29tOkJpbGxpb25zNDAh',
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj),
        }).then((response) => {
            this.setState({loading: false});
            response.json().then((json) => {
                if (json) {
                    console.log('received parties', json);
                    this.setState({parties: json});

                    //this.props.navigation.setParams({
                    //    headerRight: <Text onPress={() => {Helper.goToPage('AddParty', this)}}
                    //                       style={styles.headerBtn}>Add</Text>
                    //});

                    return json;
                }
            }).catch((err) => {
                console.log('Could not find any parties at this time');
            });
        });

    }

;

    render() {
        console.log('rendering');
        return (

            <View style={{ flex: 1 }}>

            {this.state.loading &&
                <View style={styles.loading}>
                    <ActivityIndicator size='large'/>
                </View>
            }

                <TableView reactModuleForCell="CustomTableCell"
                           style={{ flex: 1 }}>


                    <Section>
                        {this.state.parties.map(item =>

                                <Item onPress={event => this.goToPage('Videos', {id: item.id})}
                                      style={styles.tableCell}
                                      name={item.name} address={item.addressLine1}
                                      city={item.city} height="110"
                                      endtime={item.end_time} latitude={item.latitude} longitude={item.longitude}
                                      startDate={item.start_date} startTime={item.start_time} endDate={item.end_date}
                                      endTime={item.end_time} state={item.state}
                                      username={item.username} zip={item.zip} rating={item.AVG}
                                      profile_img={item.profile_img} id={item.id}
                                      key={item.id}></Item>
                        )}

                    </Section>
                </TableView>
            </View>

        );
    }
}

export default MainPage;


const styles = StyleSheet.create({
    tableCell: {
        flex: 1,
        marginTop: 40
    },
    formInputs: {
        width: 250
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
    },
    headerBtn: {
        marginRight: 10,
        color: '#fff',
        fontSize: 16
    }
});


