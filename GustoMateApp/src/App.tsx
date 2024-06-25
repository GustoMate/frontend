import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import Test1 from './screens/Test1';
import Test2 from './screens/Test2';
import SignIn from './screens/SignIn';
import OCR from './screens/OCR';
import Survey from './screens/Survey';
import AddIngredient from './screens/AddIngredient';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = () => (
  <Stack.Navigator >
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen name="OCR" component={OCR} />
    <Stack.Screen name="AddIngredient" component={AddIngredient} />
  </Stack.Navigator>
);


const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Home">
        <Tab.Screen name="Test1" component={Test1} />
        <Tab.Screen name="HomeStack" component={HomeStack} />
        <Tab.Screen name="Test2" component={Test2} />
        <Tab.Screen name="SignIn" component={SignIn} />
        <Tab.Screen name="Survey" component={Survey} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
