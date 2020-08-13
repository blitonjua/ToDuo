import React, {useState, useContext, useEffect, Component} from 'react';
import {FlatList, Text, View, TouchableOpacity} from 'react-native';
//firebase
import auth from '@react-native-firebase/auth';

import {getMilestonesAsObjects} from '../../../services/getMilestoneData';

import {requestMilestoneCompletion} from '../../../services/getMilestoneData';

export default class MileStoneList extends Component {
  //initial mount
  constructor(props) {
    super(props);
    this.state = {
      goalId: props.goalInfo,
      milestones: [],
    };
  }
  componentDidMount() {
    this._isMounted = true;
    if (this._isMounted) {
      getMilestonesAsObjects(auth().currentUser.uid, this.state.goalId).then(
        u => {
          this.setState({
            milestones: u,
          });
        },
      );
    }
  }

  //updating
  componentDidUpdate() {
    this._isMounted = true;
    if (this._isMounted) {
      getMilestonesAsObjects(auth().currentUser.uid, this.state.goalId).then(
        u => {
          this.setState({
            milestones: u,
          });
        },
      );
    }
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  //render
  render() {
    return (
      <View>
        <FlatList
          data={this.state.milestones}
          renderItem={({item}) => (
            <View style={{backgroundColor: '#202421', padding: 5, margin: 5, borderColor: '#53d681', borderWidth: 2, borderRadius: 5}}>
              <Text style={{color: 'white', fontSize: 20}}>{item.milestoneText}</Text>
              <Text style={{color: 'white'}}>
                {item.milestoneMonth}/{item.milestoneDay}/
                {item.milestoneFullYear}
              </Text>
              {!item.requestMark && !item.completed && (
                <TouchableOpacity
                  onPress={async () => {
                    await requestMilestoneCompletion(
                      auth().currentUser.uid,
                      this.state.goalId,
                      item.milestoneText,
                    ).then(() => {
                      this.setState({});
                    });
                  }}>
                  <View>
                    <Text style={{color: 'white'}}>Request Completion Mark</Text>
                  </View>
                </TouchableOpacity>
              )}
              {item.completed && <Text style={{color: 'white'}}>Completed</Text>}
              {!item.completed && <Text style={{color: 'white'}}>In Progress</Text>}
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}
