import React from "react";
import {View, TextInput, StyleSheet}  from 'react-native'

const CustomInput = ({setValue, placeholder, value, secureTextEntry, multiline, rows}) => {
    return(
        <View style={styles.container}>
            <TextInput value={value} multiline={multiline} numberOfLines={rows} placeholder={placeholder} style={styles.input} onChangeText={setValue} secureTextEntry={secureTextEntry}>
            </TextInput>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        width: '50%',
        maxWidth:700,
        height: 40,
        alignSelf: 'center',
        margin: 20,
        borderWidth: 1,
        borderColor: 'white',
        backgroundColor: '#D3D3D3',
        borderRadius: 10,
        padding:10


    }
})

export default CustomInput;