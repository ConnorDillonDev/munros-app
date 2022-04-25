import * as React from 'react';
import { View, Text } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import styles from '../Login/styles';


import Login from '../Login/Login';
import SignUp from '../signUpPage/signUpPage'
import Home from '../HomeScreen/HomeScreen'
import MunroSpecific from '../MunroSpecific/MunroSpecific'
import InfoPrompt from '../InfoPrompt/InfoPrompt';
import ImagePull from '../ImagePull/ImagePull'
import UrgentNews from '../UrgentNews/UrgentNews'
import PhotoHolder from '../PhotoHolder/PhotoHolder'


const Stack = createNativeStackNavigator();


const Navigation = () =>{
    return (
        <NavigationContainer style={styles.navcontainer}>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={SignUp} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="MunroSpecific" component={MunroSpecific}/>
            <Stack.Screen name="InfoPrompt" component={InfoPrompt}/>
            <Stack.Screen name="ImagePull" component={ImagePull}/>
            <Stack.Screen name="UrgentNews" component={UrgentNews}/>
            <Stack.Screen name="PhotoHolder" component={PhotoHolder}/>
          </Stack.Navigator>
        </NavigationContainer>
      );
}



export default Navigation;
