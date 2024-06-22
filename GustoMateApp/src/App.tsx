import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Home from './screens/Home';
import Test1 from './screens/Test1';
import Test2 from './screens/Test2';

const Tab = createBottomTabNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName='Home'>
        <Tab.Screen name="Test1" component={Test1} />
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Test2" component={Test2} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
