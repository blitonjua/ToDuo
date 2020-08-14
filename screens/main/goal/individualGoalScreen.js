import React, { useState, useContext, useEffect, Component } from 'react';
import {
  SafeAreaView,
  FlatList,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Button,
  StyleSheet,
  ScrollView,
} from 'react-native';
//firebase
import auth from '@react-native-firebase/auth';
import { updateStatus, bailPartnership } from '../../../services/setGoals';
//constants
import { status } from '../../../services/universalConstants';
//styles
import { individualGoalStyles } from '../../../assets/styles/styles';

import { getMilestonesAsObjects } from '../../../services/getMilestoneData';

import { UserContext } from '../../../services/userContext';

import { requestMilestoneCompletion } from '../../../services/getMilestoneData';

//components
import MileStoneList from './milestoneList';
import firestore from '@react-native-firebase/firestore';

const styles = individualGoalStyles;

//the detailed page of a particular goal, displaying milestones, their daily goals, etc.
function IndividualGoalScreen({ route, navigation }) {
  const { goal } = route.params;
  const [milestones, setMilestones] = useState([]);
  const [buddyName, setBuddyName] = useState('');

  async function getBuddyName() {
    console.log(goal.accountaBuddyId);
    let name = await firestore()
      .collection('Users')
      .doc(goal.accountaBuddyId)
      .get();
    console.log('this alot? ' + goal.accountaBuddyId);
    setBuddyName(name.data().firstName);
  }

  function bail() {
    navigation.goBack();
    bailPartnership(user, goal);
  }


  useEffect(() => {
    console.log('in here ' + goal.accountaBuddyId);
    getBuddyName();
    firestore()
      .collection('Users')
      .doc(goal.accountaBuddyId)
      .get().then(docSnap => {
        console.log(docSnap)
        setBuddyName(docSnap.data().firstName)
      })
    //   firestore()
    //   .collection('Users')
    //   .get()
    //   .then(querySnapshot => {
    //     console.log('Total users: ', querySnapshot.size);

    //   querySnapshot.forEach(documentSnapshot => {
    //     console.log(documentSnapshot.data());
    //   });
    // });
  }, []);

  // console.log(goal);
  let uid = auth().currentUser.uid;

  // let user = auth().currentUser.uid;
  const { user, setUser } = useContext(UserContext);

  //updates the status of the goal and goes to the done screen
  function goalDone(status) {
    updateStatus(user, goal.goalId, status);
    navigation.navigate('doneScreen', { status: status });
  }

  function gotoMessage() {
    navigation.navigate('messageScreen', { goal: route });
  }

  function endGoal() {
    navigation.navigate('endGoalScreen', { goal: route });
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
  }, []);

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
        this.setState({ isLoading: false });
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
          {item.requestMark && <Text>Requested for Completion</Text>}
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

  // console.log(goal);
  return (
    <SafeAreaView style={styles.safe}>
      {/* back button */}
      <View style={styles.padding}>
        {/* overview info */}
        <Text style={{ fontFamily:'BloggerSans-Medium', color: 'white', borderBottomWidth: 2, borderBottomColor: '#53d681', margin: 5 }}>{goal.description}</Text>
        <TouchableOpacity onPress={() => gotoMessage()}>
          <View style={{
            alignSelf: 'center',
            backgroundColor: '#ffc400',
            width: '100%',
            alignContent: 'center',
            justifyContent: 'center',
            height: 40,
            borderRadius: 50,
            marginBottom: 40,
          }}>
            <Text style={{ fontFamily: 'BloggerSans-Medium', color: 'white', alignSelf: 'center', fontSize: 20 }}>{'Message ' + buddyName}</Text>
          </View>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.text}>Milestones</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('approveMilestones', {
                goal: goal,
              });
            }}
          >
            <View style={{paddingTop: 10}}>
              <Text style={styles.touchableText}>Approve Buddy Milestones</Text>
            </View>
          </TouchableOpacity>
        </View>
        {/* ---------------------------------------------------------------------------------------------------------------- */}
        <MileStoneList goalInfo={goal.goalId} />
        {/* ---------------------------------------------------------------------------------------------------------------- */}

        <Button
          style={{padding:25}}
          title="My to-do List"
          color={"#53d681"}
          onPress={() => {
            navigation.navigate('toDoListScreen', { goal: goal });
          }}
        />
        
        <View style={homeScreenButtons.view}>
          {/* complete goal */}
          <TouchableOpacity
            onPress={() => goalDone(status.completed)}>
            <View style={homeScreenButtons.completeButton}>
              <Text style={homeScreenButtons.text}>Complete</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => bail()}>
            <View style={homeScreenButtons.bailBuddyBUtton}>
              <Text style={homeScreenButtons.text}>Bail Buddy</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={() => goalDone(status.archived)}>
            <View style={homeScreenButtons.archiveButton}>
              <Text style={homeScreenButtons.text}>Archive</Text>
            </View>
          </TouchableOpacity>

          {/* 
          <Button style={homeScreenButtons.completeButton} title="complete" onPress={() => goalDone(status.completed)} />
          <Button style={homeScreenButtons.archiveButton} title="archive" onPress={() => goalDone(status.archived)} />
          <Button title="bail buddy" onPress={() => bail()} />
          */}
        </View>

      </View>
    </SafeAreaView>
  );
}

export default IndividualGoalScreen;

const homeScreenButtons = StyleSheet.create({
  view: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 20
  },
  text: {
    color: '#ffffff',
    fontSize: 14,
    fontFamily: 'BloggerSans-Medium'
  },
  completeButton: {
    backgroundColor:'#32a852',
    borderRadius: 50,
    padding:10,
    marginHorizontal: 10,
    fontSize: 20
  },
  archiveButton: {
    backgroundColor:'#d43737',
    borderRadius: 50,
    padding: 10,
    marginHorizontal: 10,
    fontSize: 14,
  },
  bailBuddyBUtton: {
    backgroundColor:'#ffc400',
    borderRadius: 50,
    padding: 10,
    marginHorizontal: 10,
    fontSize: 14,
  }
})
