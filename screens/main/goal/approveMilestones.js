import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  Button,
  TouchableOpacity,
} from 'react-native';
//styles
import {approveMilestones} from '../../../assets/styles/styles.js';

import {getMilestonesAsObjects} from '../../../services/getMilestoneData';

export default function ApproveMilestone({route, navigation}) {
  const [milestones, setMilestones] = useState([]);
  const {goal} = route.params;

  //   console.log(goal);
  accountaBuddyId = goal.accountaBuddyId;
  async function getMilestones() {
    let data = await getMilestonesAsObjects(
      accountaBuddyId,
      goal.matchedGoalId,
    );
    setMilestones(data);
  }
  useEffect(() => {
    getMilestones();
  });
  function MilestoneListItem({item}) {
    return (
      <View style={approveMilestones.miletoneContainer}>
        <View style={approveMilestones.miletoneContainer2}>
          <Text>{item.milestoneText}</Text>
          <Text>
            due: {item.milestoneMonth}/{item.milestoneDay}/
            {item.milestoneFullYear}
          </Text>
        </View>
        <TouchableOpacity style={approveMilestones.completeButton}>
          <Text>Mark as complete</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView>
      <FlatList
        data={milestones}
        renderItem={({item}) => <MilestoneListItem item={item} />}
        keyExtractor={item => item.milestoneText}
      />
    </SafeAreaView>
  );
}
