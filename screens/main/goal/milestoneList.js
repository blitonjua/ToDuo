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
    console.log('hi in milestonelist');
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
            <View>
              <Text>{item.milestoneText}</Text>
              <Text>
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
                    <Text>Request Completion Mark</Text>
                  </View>
                </TouchableOpacity>
              )}
              {item.completed && <Text>Completed</Text>}
              {!item.completed && <Text>In Progress</Text>}
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}
