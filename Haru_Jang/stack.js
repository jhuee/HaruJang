import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MainPage from './screens/main_page';
const Stack = createStackNavigator();

const WholeStack = (props) => {
  return (
    <Stack.Navigator>
  <Stack.Screen
        name='main'
        component={MainPage}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default WholeStack;
