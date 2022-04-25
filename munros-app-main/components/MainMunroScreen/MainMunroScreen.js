
import React from "react";
import {useState, useEffect, setState} from 'react';

import Munro from '../Munro/Munro'
import { View, Text, ScrollView, Dimensions  } from 'react-native';
import {Card, Button } from 'react-native-elements';
import {StyleSheet} from 'react-native';
import {collection, getDocs} from 'firebase/firestore'
import {db} from '../../Firebase/Firebase'
import { useNavigation } from "@react-navigation/native";


const Munros = () => {
    const [munros, setMunros] = useState([]);
    const munroRef = collection(db, 'Munros')
    let [sortedMunros, setSortedMunros] = useState([]);

    const nav = useNavigation();



    if (sortedMunros.length>1){
        setSortedMunros({})// bug fix must be set back to null or list can only be sorted once
    }

    useEffect(() => {


        const getMunros = async () => {
            const data = await getDocs(munroRef);

            setMunros(data.docs.map(doc => ({...doc.data(), id: doc.id})));
        };

        getMunros();

    }, [])

    return(
        <View style={styles.container}>
                <View styles={styles.btn2}>
                    <Button style={styles.btn} title="Sort Ascending" onPress={()=> setSortedMunros(munros.sort(function(a,b){return a.height - b.height}))}/>
                    <Button style={styles.btn} title="Sort Decending" onPress={()=> setSortedMunros(munros.sort(function(a,b){return b.height-a.height}))}/>
                    <Button style={styles.btn} title="Notes" onPress={()=>nav.navigate('UrgentNews')}/>
                </View>
                <ScrollView>

            <View style={styles.listWrapper}>
                <Text style={styles.sectionTitle}>Munros</Text>
                <View style={styles.munros}>
                    {munros.map(munro => {return <Munro key={munro.name} id={munro.id} text={munro.name} height={munro.height} onClick={()=>nav.navigate('MunroSpecific', {id:munro.id,name:munro.name})}/>})}
                </View>
            </View>
            </ScrollView>
        </View>
    );
}



const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#add8e6',
    },
    listWrapper:{
        paddingTop:30,
        paddingLeft:20,
        paddingRight:20,
    },
    sectionTitle:{
        paddingBottom:20,
        fontSize:20,
        fontWeight: 'bold',
        color:'white',
        textAlign:'center'
    },
    btn:{
        marginBottom:5,
        marginTop:10,
        width:300,
        justifyContent: 'center',
        width: '50%',
        maxWidth:400,
        height: 40,
        alignSelf: 'center',
        margin: 20,
        borderRadius: 10,
    },
    btn2:{
        
    }
  });

  export default Munros; 