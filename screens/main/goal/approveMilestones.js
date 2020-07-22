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
import {markMilestoneAsComplete} from '../../../services/getMilestoneData';

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
    // console.log(item);
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
