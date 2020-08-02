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
import {approveMilestones} from '../../../assets/styles/styles.js';

import {getMilestonesAsObjects} from '../../../services/getMilestoneData';
import {markMilestoneAsComplete} from '../../../services/getMilestoneData';

//*------------------------------------------------------------------------------------------------------------------------------
//component version
export default class ApproveMilestone extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    // console.log('goals: ' + props.goal);
    this.state = {
      goal: props.route.params.goal,
      navigation: [],
      milestones: [],
      isLoading: true,
    };
  }
  componentDidMount() {
    this._isMounted = true;
    getMilestonesAsObjects(
      this.state.goal.accountaBuddyId,
      this.state.goal.matchedGoalId,
    ).then(async u => {
      if (this._isMounted) {
        this.setState({isLoading: false, milestones: u});
      }
    });
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  render() {
    return (
      <SafeAreaView>
        <FlatList
          data={this.state.milestones}
          renderItem={({item}) => (
            //------------------------------------------------------------------------------------------------------------------------------
            <View style={approveMilestones.miletoneContainer}>
              {item.requestMark && (
                <View>
                  <View style={approveMilestones.miletoneContainer2}>
                    <Text>{item.milestoneText}</Text>
                    <Text>
                      due: {item.milestoneMonth}/{item.milestoneDay}/
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
                      <Text> mark as complete</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
            </View>
            //------------------------------------------------------------------------------------------------------------------------------
          )}
          keyExtractor={(item, index) => index.toString()}
        />
        <Button
          title="<-"
          onPress={() => this.props.route.params.navigation.goBack()}
        />
      </SafeAreaView>
    );
  }
}
//*/
//------------------------------------------------------------------------------------------------------------------------------

/*
export default function ApproveMilestone({route, navigation}) {
  const [milestones, setMilestones] = useState([]);
  const {goal} = route.params;

  accountaBuddyId = goal.accountaBuddyId;

  //get milestone data
  async function getMilestones() {
    let data = await getMilestonesAsObjects(
      accountaBuddyId,
      goal.matchedGoalId,
    );
    setMilestones(data);
  }
  useEffect(() => {
    let isMounted = true;
    if (isMounted) getMilestones();
    return () => {
      isMounted = false;
    };
  });
  function MilestoneListItem({item}) {
    return (
      <View style={approveMilestones.miletoneContainer}>
        {item.requestMark && (
          <View>
            <View style={approveMilestones.miletoneContainer2}>
              <Text>{item.milestoneText}</Text>
              <Text>
                due: {item.milestoneMonth}/{item.milestoneDay}/
                {item.milestoneFullYear}
              </Text>
            </View>
            <TouchableOpacity
              onPress={async () => {
                console.log('marked');
                await markMilestoneAsComplete(
                  accountaBuddyId,
                  goal.matchedGoalId,
                  item.milestoneText,
                );
              }}>
              <View>
                <Text> mark as complete</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }

  return (
    <SafeAreaView>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}>
        <Text>{'<-'}</Text>
      </TouchableOpacity>
      <FlatList
        data={milestones}
        renderItem={({item}) => <MilestoneListItem item={item} />}
        keyExtractor={item => item.milestoneText}
      />
    </SafeAreaView>
  );
}
//*/
