import React, {useState, useEffect, Component} from 'react';
import firestore from '@react-native-firebase/firestore';
import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  Button,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
//styles

import {approveStyles} from '../../../assets/styles/styles'

import {getMilestonesAsObjects} from '../../../services/getMilestoneData';
import {markMilestoneAsComplete} from '../../../services/getMilestoneData';

const styles = approveStyles;

export default class ApproveMilestone extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    // console.log('goals: ' + props.goal);
    this.state = {
      goal: props.route.params.goal,
      milestones: [],
      isLoading: true,
      isEmpty: false,
    };
  }
  componentDidMount() {
    this._isMounted = true;
    if (this._isMounted) {
      getMilestonesAsObjects(
        this.state.goal.accountaBuddyId,
        this.state.goal.matchedGoalId,
      ).then(async u => {
        this.setState({isLoading: false, milestones: u});
      });
    }
  }

  componentDidUpdate() {
    this._isMounted = true;
    if (this._isMounted) {
      getMilestonesAsObjects(
        this.state.goal.accountaBuddyId,
        this.state.goal.matchedGoalId,
      ).then(async u => {
        this.setState({isLoading: false, milestones: u});
      });
    }
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  render() {
    return (
      <SafeAreaView style={styles.mainContainer}>
        {true && (
          <FlatList
            data={this.state.milestones}
            renderItem={({item}) => (!item.completed && (
              //------------------------------------------------------------------------------------------------------------------------------
              <View style={styles.milestoneContainer}>
                {item.requestMark && (
                  <View>
                    <View style={styles.milestoneContainer2}>
                      <Text style={styles.mainText}>{item.milestoneText}</Text>
                      <Text style={styles.date}>
                        Due: {item.milestoneMonth}/{item.milestoneDay}/
                        {item.milestoneFullYear}
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={async () => {
                        await markMilestoneAsComplete(
                          this.state.goal.accountaBuddyId,
                          this.state.goal.matchedGoalId,
                          item.milestoneText,
                        );
                      }}>
                      <View>
                        <Text style={styles.complete}>Mark as Complete</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
              //------------------------------------------------------------------------------------------------------------------------------
            ))}
            keyExtractor={(item, index) => index.toString()}
          />
        )}
      </SafeAreaView>
    );
  }
}
