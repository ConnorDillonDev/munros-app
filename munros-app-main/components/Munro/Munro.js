import React, { useState } from 'react';
import {View, Text, StyleSheet, Button, CheckBox} from 'react-native';
import Checkbox from 'expo-checkbox';


//firebase set munro to contain a name and a height in ft
const Munro = (props) => {
    const [isChecked, setChecked] = useState(false);

    return(
        <View style={styles.munro}>
            <View style={styles.MunroLeft}>
                    <Button title={props.text} onPress={props.onClick}/>
                    <Text styles={styles.RightText}>Height: {props.height}m</Text>  
                    <Checkbox style={styles.checkbox} value={isChecked} onValueChange={setChecked} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    munro:{
        backgroundColor: '#FFF', 
        padding:15,
        borderRadius:10,
        flexDirection:'row',
        alignItems:'center',
        marginBottom:50,
    },
    MunroLeft:{
        flexDirection:'row',
        alignItems: 'center',
    },
    box:{
        width:26,
        height:26,
        backgroundColor: '#add8e6',
        marginRight:20,
    },
    checkbox: {
        padding:10,
        marginRight:1,
        margin: 10
    },
  });

export default Munro;