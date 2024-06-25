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
import Market from './screens/Market';
import MarketSearch from './screens/Market';
import ProductDetail from './screens/ProductDetail';
import Chat from './screens/Chat';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = () => (
  <Stack.Navigator >
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen name="OCR" component={OCR} />
    <Stack.Screen name="AddIngredient" component={AddIngredient} />
    <Stack.Screen name="Market" component={Market}/>
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


const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Home">
        <Tab.Screen name="HomeStack" component={HomeStack} options={{ headerShown: false }}/>
        <Tab.Screen name="Market" component={MarketStack} options={{ headerShown: false }}/>
        <Tab.Screen name="Recipe" component={Test2} />
        <Tab.Screen name="SignIn" component={SignIn} />
        <Tab.Screen name="Survey" component={Survey} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
