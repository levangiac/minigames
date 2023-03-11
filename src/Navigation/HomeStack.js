import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MenuGames from '../screen/MenuGames';
import GameController from '../GameController';
import Start from '../screen/Start';
import HomePacMan from '../screen/HomePacMan';
import Animated from '../screen/Animated';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="MenuGame"
        screenOptions={{headerShown: false, stackAnimation: 'fade'}}>
        <Stack.Screen name="MenuGames" component={MenuGames} />
        <Stack.Screen name="GameController" component={GameController} />
        <Stack.Screen name="HomePacMan" component={HomePacMan} />
        <Stack.Screen name="AnimatedTest" component={Animated} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default HomeStack;
