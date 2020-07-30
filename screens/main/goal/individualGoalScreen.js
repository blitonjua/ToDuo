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

const styles = individualGoalStyles;

//the detailed page of a particular goal, displaying milestones, their daily goals, etc.
function IndividualGoalScreen({route, navigation}) {
  const {goal} = route.params;
  const [milestones, setMilestones] = useState([]);

  // console.log(goal);
  let uid = auth().currentUser.uid;

  // let user = auth().currentUser.uid;
  const {user, setUser} = useContext(UserContext);

  //updates the status of the goal and goes to the done screen
  function goalDone(status) {
    updateStatus(user, goal.goalId, status);
    navigation.navigate('doneScreen', {status: status});
  }

  function gotoMessage() {
    navigation.navigate('messageScreen', {goal: route});
  }

  async function getMilestones() {
    let data = await getMilestonesAsObjects(uid, goal.goalId);
    setMilestones(data);
  }
  useEffect(() => {
    let isMounted = true;
    if (isMounted) getMilestones();
    return () => {
      isMounted = false;
    };
  });

  class MilestoneListItem extends Component {
    _isMounted = false;
    constructor(props) {
      super(props);
      this.state = {
        item: props.item,
        isLoading: true,
      };
      item = this.state.item;
    }
    componentDidMount() {
      this._isMounted = true;
      if (this._isMounted) {
        this.setState({isLoading: false});
      }
    }
    componentWillUnmount() {
      this._isMounted = false;
    }
    render() {
      return (
        <View style={styles.goalContainerTwo}>
          <Text style={styles.goalText}>{item.milestoneText}</Text>
          <Text>
            due: {item.milestoneMonth}/{item.milestoneDay}/
            {item.milestoneFullYear}
          </Text>
          <TouchableOpacity
            onPress={async () => {
              console.log('pressed');
              await requestMilestoneCompletion(
                uid,
                goal.goalId,
                item.milestoneText,
              ).then(() => {
                console.log('requested');
                this.setState({});
              });
            }}>
            <View>
              <Text>request completions</Text>
            </View>
          </TouchableOpacity>
          {item.completed && <Text>Completed</Text>}
          {!item.completed && <Text>In progress</Text>}
        </View>
      );
    }
  }

  //bails the user out of the partnership
  function bail() {
    navigation.goBack();
    bailPartnership(user, goal);
  }

  return (
    <SafeAreaView style={styles.safe}>
      {/* back button */}
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text>GO BACK</Text>
      </TouchableOpacity>
      <View style={styles.padding}>
        {/* overview info */}
        <Text style={styles.title}>{goal.title}</Text>
        <Text>{goal.description}</Text>

        {/* milestones */}
        <View style={styles.flatListContainer}>
          <Text style={styles.milestonesText}>Milestones</Text>
          {/* <FlatList
            data={milestones}
            renderItem={({item}) => <MilestoneListItem item={item} />}
            keyExtractor={(item, index) => index.toString()}
          /> */}
        </View>
      </View>
      <ScrollView>
        {/* toDo list button */}
        <Button
          title="to-do list"
          onPress={() => {
            navigation.navigate('toDoListScreen', {goal: goal});
          }}
        />
        {/* messages button */}
        <Button title="msg" onPress={() => gotoMessage()} />
        {/* archive goal */}
        <Button title="archive" onPress={() => goalDone(status.archived)} />
        {/* complete goal */}
        <Button title="complete" onPress={() => goalDone(status.completed)} />
        {/* <Button
          title="approve buddy milestones"
          onPress={() => {
            navigation.navigate('approveMilestones', {
              goal: goal,
              navigation: navigation,
            });
          }}
        /> */}
        {/* accountabuddy bail */}
        <Button title="bail buddy" onPress={() => bail()} />
      </ScrollView>
    </SafeAreaView>
  );
}

export default IndividualGoalScreen;
