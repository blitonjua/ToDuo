import 'react-native-gesture-handler';
import React, { useState, useEffect, useMemo } from 'react';
//navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
//firebase
import auth from '@react-native-firebase/auth';
import { UserContext } from './services/userContext';
//screens
import AuthStack from './screens/authentication/authStack';
import MainTab from './screens/main/mainTab';

const Stack = createStackNavigator();

function App() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(true);

  // const value = useMemo(() => ({ user, setUser }), [user, setUser])

  // Handle user state changes 
  function onAuthStateChanged(loggedIn) {
    setLoggedIn(loggedIn);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    console.log('hi in app.js');
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  return (
    <NavigationContainer>
      <UserContext.Provider value={{ user, setUser }} >
        <Stack.Navigator
          screenOptions={({ route, navigation }) => ({
            headerShown: false,})}>
          {!loggedIn ? (
            <Stack.Screen name="Authentication" component={AuthStack} />
          ) : (
            <Stack.Screen name="Main" component={MainTab} />
          )}
        </Stack.Navigator>
      </UserContext.Provider>
    </NavigationContainer>
  );
};
export default App;