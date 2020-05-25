import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './Home';
import Youtube from './src/Youtube/Home';
const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Youtube" component={Youtube} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
