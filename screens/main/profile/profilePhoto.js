import React, { Component } from 'react';
import {
    View,
    Image,
} from 'react-native';
import { profileIcons } from '../../../assets/images/profileIcons';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { profileStyles } from '../../../assets/styles/styles';

export default class ProfilePhoto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user,
            profileIndex: 1,
        };
    }
    
    componentDidMount() {
        if (this.state.user !== null)
        firestore()
            .collection('Users')
            .doc(this.state.user)
            .get()
            .then(async (docRef) => {
                let docData = docRef.data();
                this.setState({
                    profileIndex: docData.profileIndex,
                })
            });
    }

    componentDidUpdate(prevProps) {
        if (this.props.user !== prevProps.user){
            console.log('in profilephoto active');
        firestore()
            .collection('Users')
            .doc(this.state.user)
            .get()
            .then(async (docRef) => {
                let docData = docRef.data();
                this.setState({
                    profileIndex: docData.profileIndex,
                })
            });
        }
    }

    render() {
        return (
            <View style={profileStyles.profilePic} >
                <Image
                    source={profileIcons[this.state.profileIndex - 1].image}
                    style={profileStyles.profilePic}
                />
            </View>
        )
    }
}