import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from './screens/SignIn';
import Survey from './screens/Survey';

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false}}>
        {/*<Stack.Screen name="SignIn" component={SignIn} /> */}
        <Stack.Screen name="Survey" component={Survey} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
