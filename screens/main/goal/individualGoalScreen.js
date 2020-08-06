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

//components
import MileStoneList from './milestoneList';
import firestore from '@react-native-firebase/firestore';

const styles = individualGoalStyles;

//the detailed page of a particular goal, displaying milestones, their daily goals, etc.
function IndividualGoalScreen({route, navigation}) {
  const {goal} = route.params;
  const [milestones, setMilestones] = useState([]);
  const [buddyName, setBuddyName] = useState('');

  useEffect(() => {
    firestore()
      .collection('Users')
      .doc(goal.accountaBuddyId)
      .get()
      .then(docSnap => {
        setBuddyName(docSnap.data().firstName);
        console.log('this alot?');
      });
  }, []);

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
    let data = await getMilestonesAsObjects(user, goal.goalId);
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
          {item.requestMark && <Text>requestested for completion</Text>}
          {!item.requestMark && (
            <TouchableOpacity
              onPress={async () => {
                await requestMilestoneCompletion(
                  uid,
                  goal.goalId,
                  item.milestoneText,
                ).then(() => {
                  this.setState({});
                });
              }}>
              <View>
                <Text>Request Completion</Text>
              </View>
            </TouchableOpacity>
          )}
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
  // console.log(goal);
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.padding}>
        {/* overview info */}
        <Text style={styles.title}>{goal.title}</Text>
        <Text>{goal.description}</Text>
        {/* ---------------------------------------------------------------------------------------------------------------- */}
        <MileStoneList goalInfo={goal.goalId} />
        {/* ---------------------------------------------------------------------------------------------------------------- */}
      </View>
      <ScrollView>
        {/* toDo list button */}
        <TouchableOpacity style={styles.wideButton} onPress={() => {
            navigation.navigate('toDoListScreen', {goal: goal});
          }}>
          <Text>Todo List</Text>
        </TouchableOpacity>
        {/* messages button */}
        <TouchableOpacity style={styles.wideButton} onPress={() => gotoMessage()}>
          <Text>Message Buddy</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.wideButton} onPress={() => goalDone(status.archived)}>
          <Text>Archive</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.wideButton} onPress={() => goalDone(status.completed)}>
          <Text>Complete</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.wideButton} onPress={() => bail()}>
          <Text>Bail</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.wideButton} onPress={() => {
            navigation.navigate('approveMilestones', {
              goal: goal,
            });
          }}>
            <Text>approve buddy milestones</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

export default IndividualGoalScreen;
