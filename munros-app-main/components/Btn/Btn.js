import React from 'react';
import {Text, StyleSheet, Pressable} from 'react-native';


const Btn = ({txt, onClick}) => {
    return(
        <Pressable onPress={onClick} style={styles.container}>
            <Text style={styles.txt}>{txt}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container:{
        justifyContent: 'center',
        width: '50%',
        maxWidth:400,
        height: 40,
        alignSelf: 'center',
        margin: 20,
        backgroundColor: '#0000FF',
        borderRadius: 10,
    },
    
    txt:{
        textAlign: 'center',
        fontWeight:'bold',
        color: 'white',
    }
})

export default Btn;