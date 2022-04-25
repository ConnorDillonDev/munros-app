import React from 'react';

import {View, Text, StyleSheet} from 'react-native';

import {Card, Button} from 'react-native-elements';
import { useNavigation } from "@react-navigation/native";




const InfoPrompt =(route)=>{
    const nav = useNavigation();
    
    let passed = JSON.stringify(route);
    passed = JSON.parse(passed); // fix undefined error
    let name = JSON.stringify(passed.route.params.name)
    name = name.replace(/["]+/g, '');


    if (name === ''){ 
        name = "undefined"
    }


return(
        <View style={{marginTop:200}}>
              <Card > 
                <Card.Title><Text>{name} / Comment Submitted Successfully</Text></Card.Title>
              <Card.Divider />
              <View>
            <Button
                onPress={()=>  nav.navigate('MunroSpecific', {name:name})}
                title="Okay"
                buttonStyle={{
                  backgroundColor: 'rgba(46, 204, 197, 1)',
                  borderRadius: 3,
                }}
                
              />
                </View>
              </Card>
        </View>
    )
}
const styles = StyleSheet.create({
  CardCenter: {
    position: 'absolute',


  },
  containerStyle:{
    width: 200,
    marginHorizontal: 50,
    marginVertical: 10,
  },
});

export default InfoPrompt;