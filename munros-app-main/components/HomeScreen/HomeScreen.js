import React from "react"
import {StyleSheet, View, Text} from 'react-native';
import Munros from '../MainMunroScreen/MainMunroScreen'


const HomeScreen = (route) => {
    let passed = JSON.stringify(route);
    passed = JSON.parse(passed); // fix undefined error
    let email = JSON.stringify(passed.route.params.Email)
    email = email.replace(/["]+/g, '');



    return(
        <View style={styles.container}>
            <Text style={styles.identity}>Welcome</Text>
            <Text style={styles.identity}> {email}</Text>
            <Munros/>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#add8e6',
    },
    identity: {
      paddingTop:50,
      alignSelf:'center',
      color: 'white',
      fontSize: 30,

    }
  });

export default HomeScreen;