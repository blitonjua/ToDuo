import React, {useState, useContext, useEffect, Component} from 'react';
import {
  SafeAreaView,
  FlatList,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Button,
  ScrollView,
} from 'react-native';
//firebase
import auth from '@react-native-firebase/auth';
import {updateStatus, bailPartnership} from '../../../services/setGoals';
//constants
import {status} from '../../../services/universalConstants';
//styles
import {individualGoalStyles} from '../../../assets/styles/styles';

import {getMilestonesAsObjects} from '../../../services/getMilestoneData';

import {UserContext} from '../../../services/userContext';

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
    getMilestonesAsObjects(auth().currentUser.uid, this.state.goalId).then(
      u => {
        this.setState({
          milestones: u,
        });
      },
    );
  }

  //updating

  componentDidUpdate() {
    getMilestonesAsObjects(auth().currentUser.uid, this.state.goalId).then(
      u => {
        this.setState({
          milestones: u,
        });
      },
    );
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
