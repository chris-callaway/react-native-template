import React, { Component } from 'react';
import { AsyncStorage, ActivityIndicator, Platform, Alert, AlertIOS, Image, Button, StyleSheet, View, TouchableHighlight, TextInput, ListView } from 'react-native';
import { Container, Content, Text, StyleProvider } from 'native-base';

class CustomTableCellVideo extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        var style = {
            borderColor: 'purple',
            height: 100,
            paddingLeft: 10,
            paddingTop: 10
        };

        // Fill the full native table cell height.
        style.flex = 1;

        // All Item props get passed to this cell inside this.props.data. Use them to control the rendering, for example background color:
        if (this.props.data.backgroundColor !== undefined) {
            style.backgroundColor = this.props.data.backgroundColor
        }

        return (
            <View style={style}>

                <View>
                    <Text>{this.props.data.name}</Text>
                </View>
            </View>

        )
    }
}

export default CustomTableCellVideo;


const styles = StyleSheet.create({
    cellView: {
        flex: 1
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
