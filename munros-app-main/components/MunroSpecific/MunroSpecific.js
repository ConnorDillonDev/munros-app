import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {Card, Button } from 'react-native-elements';
import CustomInput from '../CustomInput';
import Comment from '../Comment/Comment'

import {db} from '../../Firebase/Firebase'

import { useNavigation } from "@react-navigation/native";

import { doc, updateDoc, arrayUnion } from "firebase/firestore";

import MunroOpenAPI from '../MunroOpenAPI/MunroOpenAPI';

import MapView from 'react-native-maps';

import PhotoHolder from '../PhotoHolder/PhotoHolder';

import {AirbnbRating } from 'react-native-ratings';
import AsyncStorage from '@react-native-async-storage/async-storage';



let longatude =0;
let latitude= 0;
let globalName = "";

const MunroSpecific  = (route) =>{
  const [ratings, setRatings] = useState(0);
  const [amount, setAmount] = useState();
  const [lat, setlat] = useState(0);
  const [long, setlong] = useState(0);
  const [voted, setVoted] = useState(false);

  let oldAvg = '0'


  
    let passed = JSON.stringify(route);
    passed = JSON.parse(passed); // fix undefined error


    const nav = useNavigation();
    //adding async for reviews 

    

    const [comment, setComment] = useState('');//set inputs empty string
    let name = JSON.stringify(passed.route.params.name)
    name = name.replace(/["]+/g, '');
    globalName = name;

    latlong(name);
    async function addComment () {
      const commentRef = doc(db, "Comments", name);

      await updateDoc(commentRef, {
          comment: arrayUnion(comment)
      }).then(nav.navigate('InfoPrompt',{name:name}));
      
    };
      //call function which calls api for data of particular munro based on the name
      async function latlong(name){
      let response = await MunroOpenAPI(name);
      response = response[0];
      longatude = response.latlng_lng; 
      latitude = response.latlng_lat;

      setlong(longatude); //set usestate
      setlat(latitude); //set usestate
    }

      
  isEmpty();
  

  async function isEmpty(){
    try
    {
      const jsonValue = await (AsyncStorage.getItem('@rating' + globalName)) //check to see if the space is empty as this was causing a crash with no errors
      let jsonValue2 = JSON.parse(jsonValue);

      const amountJson = await (AsyncStorage.getItem('@ratingAmount' + globalName)) //check to see if the space is empty as this was causing a crash with no errors

      if(jsonValue2 != undefined)
      {
        getData();
      }
    }
    catch(exception)
    { 
      console.log(exception);
    }
    
  } 
  
  async function getData(){
    try {
        const jsonValue = await AsyncStorage.getItem('@rating' + globalName)
        setRatings(jsonValue);

        // var myArray = JSON.parse(JSON.stringify(jsonValue.replace(/['"]+/g, '')));

        try{
          let jsonAmount = await AsyncStorage.getItem('@ratingAmount' + globalName);
          if(jsonAmount == "null"){ //if the munro has never been rated
            jsonAmount = 1;
            setAmount(jsonAmount);
          }else{
            oldAvg = jsonAmount;
            // console.log(jsonAmount);            
            setAmount(jsonAmount);
          }



        }catch(e){console.log(e);}

        setRatings(jsonValue);

        // return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
        console.log(e);
      // error reading value
    }
  }


  const storeData = async (value) => {

    setVoted(true);
    //avg
    // should be updated in the future and moved to the cloud storage

    setRatings(value);

    // let newAve = parseFloat(oldAvg) + parseFloat(value - oldAvg)/parseFloat(amount);
    // let average = ((parseFloat(amount) * parseFloat(oldAvg)) + parseFloat(value)) / parseFloat(currentVote++)
    // console.log(average);

    // setRatings(average);

      try{
        let amountCopy = amount;
        amountCopy++;
        setAmount(amountCopy);
        await AsyncStorage.setItem('@ratingAmount'+globalName, JSON.stringify(amountCopy));

      }catch(e){console.log(e)}
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@rating'+globalName, jsonValue)
    // } catch (e) {
    //   // saving error
    //   console.log(e);
    // }
  }
    return(
        <ScrollView style={styles.container} >
          <View style={{paddingBottom:100}}>
              <Card>
              <Card.Title>{name}</Card.Title>
              <Text style={styles.centerMe}>Latitude:{lat}  &  Longitude:{long}</Text>
                <View style={styles.centerMe}> 
                <AirbnbRating
                    count={5}
                    reviews={["Dry", "Slightly Boggy", "Waterproof Boots", "Wet All Year Round", "Its A Swamp!"]}
                    defaultRating={ratings}
                    size={20}
                    onFinishRating={(rating) => storeData(rating)}
                />
                <Text style={styles.centerMe}>{amount} votes.</Text>
                {voted && <Text style={styles.centerMe}>Your submission has been registered.</Text>}
                
                </View>
              <Card.Divider />

              
            {latitude != undefined &&
              <MapView 
              style={styles.map}
              region={{
                latitude: lat,   
                longitude: long,
                latitudeDelta:0.04,
                longitudeDelta:0.05
              }}>

              <MapView.Marker
                coordinate={{
                  latitude: lat,
                  longitude: long
                }}
                title={"title"}
                description={"description"}
              />
              </MapView>
            }

              </Card>
              <Button style={styles.photoBtn}onPress={()=>nav.navigate('PhotoHolder')} title="Photos"/>
                  <View  style={styles.comments}>
                      <Comment name={JSON.stringify(passed.route.params.name)}/>
                  </View>
                  <View>
                <CustomInput value={comment} setValue={setComment}  placeholder="Comment..." multiline={true}/>
              </View>

              {/* Button Styling found at https://reactnativeelements.com/docs/button */}
              <Button
                  onPress={addComment}
                  title="Submit Comment"
                  buttonStyle={{
                    borderRadius: 4,
                  }}
                  containerStyle={{
                    width: '100%',
                    height: '5%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                />
              </View>
          </ScrollView> 
    );      
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: '#add8e6',
  },
  comments:{
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    textAlignVertical: 'center',
    alignContent: 'center',
    width:200,
    justifyContent: 'center',
  },
  map: {
    width: "100%",
    height: 300
  },
  centerMe:{
    textAlign:'center',
  },
  photoBtn:{
    justifyContent: 'center',
    width: '50%',
    maxWidth:400,
    height: 40,
    alignSelf: 'center',
    margin: 20,
    backgroundColor: '#0000FF',
    borderRadius: 10,
    
  }


    
});



export default MunroSpecific;