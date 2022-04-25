import {Card, Button } from 'react-native-elements';
import {View, Text, StyleSheet, CheckBox} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NewsCards = (props) => {   
    
    return(
            <View stlye={styles.text}>
                <Card style={styles.center}>
                        <Text style={styles.size}>{props.description}</Text>
                        <Card.Divider />
                        <Text style={styles.text}>{props.dateTime}</Text>
                </Card>
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
        display: 'flex'
    },
    size:{
        minWidth:275,
        textAlign: 'center',

    },
    text:{
        textAlign: 'center',
        color: '#808080',
        justifyContent: 'center',
        
    },



})

export default NewsCards;