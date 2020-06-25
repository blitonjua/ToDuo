import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
//navigation imports
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
//custom screens
import AuthStack from './screens/authentication/authStack';
import MainTab from './screens/main/mainTab';

const Stack = createStackNavigator();

function App() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(true);

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator
        headerMode='none'>
        {!user ? (
          <Stack.Screen name="Authentication" component={AuthStack} />
        ) : (
          <Stack.Screen name="Main" component={MainTab} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;