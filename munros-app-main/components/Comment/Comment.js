import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, StyleSheet, TextInput, FlatList} from 'react-native';
import {Card, Button, Icon } from 'react-native-elements';
import CustomInput from '../CustomInput';

import { useFocusEffect } from '@react-navigation/native';


import {collection, getDocs} from 'firebase/firestore'
import {db} from '../../Firebase/Firebase'

const Comment = (props) =>{
    const [comments, setComments] = useState([])

    let commentArray = [];

    let name = JSON.stringify(props.name)
    name = name.replace(/["]+/g, '');//remove inverted commas
    
    name = (name.slice(1,-1)); //trim first and last space


    const commentRef = collection(db, 'Comments') //referring to firebase store

    useFocusEffect(
        useCallback(() => {
            const getComments = async () => {
                const data = await getDocs(commentRef)
                setComments(data.docs.map(doc => ({id: doc.id,...doc.data()})));// get data from database and map it to empty array
            } 
            getComments();
        },[])
    )


    useEffect(()=>{
        const getComments = async () => {
            const data = await getDocs(commentRef)
            setComments(data.docs.map(doc => ({id: doc.id,...doc.data()})));
        } 
        getComments();
    },[])


    comments.forEach(c => {
        if(c.id == name){ //filter comments based on ID 
            commentArray = c.comment;
        }
    });

    return (
        <View style={styles.commentWrapper}>
            <Text style={styles.headingText}>Comments:</Text>
            {commentArray.map(c => {return <Text style={styles.testWrapper} key={c}>{c}</Text>})}
        </View>
    )
}
const styles = StyleSheet.create({
    commentWrapper: {
        marginTop: 30,
        borderWidth:  1,
        borderColor: "#000000",
        width: 300
    },
    testWrapper:{
        backgroundColor: '#c6c6c6',
        paddingTop:10,
        marginTop:10,
        fontSize: 20, 
    },
    headingText:{
        fontSize:30
    }
});
export default Comment;