import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Welcome from './screens/Welcome';
import SignUp from './screens/SignUp';
import Login from './screens/Login';
import Preference from './screens/Preference';
import Home from './screens/Home';
import AddDirect from './screens/AddDirect';
import OCR from './screens/OCR';
import AddIngredient from './screens/AddIngredient';
import Market from './screens/Market';
import MarketSearch from './screens/Market';
import ProductDetail from './screens/ProductDetail';
import Chat from './screens/Chat';
import Question from './screens/Question';
import RecipeResult from './screens/RecipeResult';
import RecipeDetail from './screens/RecipeDetail';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


const UserStack = () => (
  <Stack.Navigator initialRouteName="Welcome">
    <Stack.Screen name="Welcome" component={Welcome}/>
    <Stack.Screen name="SignUp" component={SignUp}/>
    <Stack.Screen name="Login" component={Login}/>
    <Stack.Screen name="Preference" component={Preference}/>
  </Stack.Navigator>
);

const FridgeStack = () => (
  <Stack.Navigator >
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen name="AddDirect" component={AddDirect} />
    <Stack.Screen name="OCR" component={OCR} />
    <Stack.Screen name="AddIngredient" component={AddIngredient} />
  </Stack.Navigator>
);

const MarketStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Market" component={Market} />
      <Stack.Screen name="MarketSearch" component={MarketSearch} />
      <Stack.Screen name="ProductDetail" component={ProductDetail} />
      <Stack.Screen name="Chat" component={Chat} />
    </Stack.Navigator>
  );
};

const RecipeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Question" component={Question} />
      <Stack.Screen name="RecipeResult" component={RecipeResult} />
      <Stack.Screen name="RecipeDetail" component={RecipeDetail} />
    </Stack.Navigator>
  );
};

const MainTabNavigator = () => (
  <Tab.Navigator initialRouteName="FridgeStack">
    <Tab.Screen name="FridgeStack" component={FridgeStack} options={{ headerShown: false }} />
    <Tab.Screen name="RecipeStack" component={RecipeStack} options={{ headerShown: false }} />
    <Tab.Screen name="MarketStack" component={MarketStack} options={{ headerShown: false }} />
  </Tab.Navigator>
);

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="UserStack" component={UserStack} />
        <Stack.Screen name="MainTabNavigator" component={MainTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

/*
const HomeStack = () => (
  <Stack.Navigator >
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen name="AddDirect" component={AddDirect} />
    <Stack.Screen name="OCR" component={OCR} />
    <Stack.Screen name="AddIngredient" component={AddIngredient} />
  </Stack.Navigator>
);

const MarketStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Market" component={Market} />
      <Stack.Screen name="ProductDetail" component={ProductDetail} />
      <Stack.Screen name="Chat" component={Chat} />
    </Stack.Navigator>
  );
};

const RecipeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Question" component={Question} />
      <Stack.Screen name="RecipeResult" component={RecipeResult} />
      <Stack.Screen name="RecipeDetail" component={RecipeDetail} />
    </Stack.Navigator>
  );
};


const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Home">
        <Tab.Screen name="HomeStack" component={HomeStack} options={{ headerShown: false }}/>
        <Tab.Screen name="MarketStack" component={MarketStack} options={{ headerShown: false }}/>
        <Tab.Screen name="RecipeStack" component={RecipeStack} options={{ headerShown: false }}/>
        <Tab.Screen name="SignIn" component={SignIn} />
        <Tab.Screen name="Preference" component={Preference} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
*/