import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Image} from 'react-native';
import { Camera } from 'expo-camera';
import {Button } from 'react-native-elements';
import { useNavigation } from "@react-navigation/native";


//inspired by expo documentation at
export default function App() {
  const [permission, setPermission] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [image, setImage] = useState(null);

  var arr = [];


  const cameraRef = useRef(null);

  const nav = useNavigation();

  function Pull(){
      fetch('https://371452735915724:yzXi9cRVv-hlsJsSF0Jv73K9WMs@api.cloudinary.com/v1_1/dfy12rpmk/resources/image', {
        method: 'GET',
        //Request Type
      })
        .then((response) => response.json())
        //If response is in json then in success
        .then((responseJson) => {
          //Success
          alert(JSON.stringify(responseJson));

          Object.values(responseJson.resources).forEach(value => {
              arr.push({uri:value.secure_url});
          });
          nav.navigate('ImagePull', arr);
        })
    }



  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setPermission(status === 'granted');
    })();
  }, []);

  if (permission === null) {
    return <View />;
  }
  if (permission === false) {
    return <Text>Camera access was denied</Text>;
  }
  
    // takes the actual photo
  const takephoto = async () => {
    
      try{
        let photo = await cameraRef.current.takePictureAsync({quality:1,alowsEditing:true,aspect:[4,3], base64:true});
        //upload Clouinary (must be base64 format)
        return photo;
      }catch(e)
      {
        console.log(e);
      }
    
  }

  //inspired from cloudanary official website, preloading them for view images
  const uploadPhoto = async (capture) => {
    const source = capture.base64;
    if (source) {
      let base64Img = `data:image/jpg;base64,${source}`;
      let apiUrl =
      'https://api.cloudinary.com/v1_1/dfy12rpmk/upload';
      let data = {
        file: base64Img,
        upload_preset: 'Munro1234',
      };

      fetch(apiUrl, {
        body: JSON.stringify(data),
        headers: {
          'content-type': 'application/json'
        },
        method: 'POST'
      })
        .then(async response => {
          let data = await response.json();
          if (data.secure_url) {
            alert('Succesfully Uploaded');
          }
        })
        .catch(err => {
          alert(err);
        });
      }

  }
  // <Image source={{uri:'https://res.cloudinary.com/dfy12rpmk/image/upload/v1649450082/Munro/xsmsflk3mljgap42u7fk.jpg'}} style={{width:100,height:100,backgroundColor:"green"}}/>


  return (
    <View style={styles.container}>
      {showCamera ? <View style={styles.container}><Camera type={Camera.Constants.Type.back} style={styles.camera} ref={cameraRef}>
              <Button
                  title="Exit"
                  style={{marginTop:40}}
                  onPress={() => setShowCamera(false)}
                  buttonStyle={{
                    backgroundColor: 'rgba(46, 204, 197, 1)',
                    borderRadius: 4,
                  }} />
                  <TouchableOpacity style={styles.captureButton}
                  onPress={async() => 
                    {
                      const cap = await takephoto();
                      setImage(cap.uri);  
                      // Alert.alert("captured", cap.uri);
                      //upload
                      uploadPhoto(cap);
                      setShowCamera(false);
                    }
                  }
                  >
                  <Text style={{color: 'white', fontSize:30, fontWeight: 'bold', textAlign: 'center'}}>Capture</Text>
                  </TouchableOpacity>
          </Camera>         
        </View>
    :
    <>
    <View style={styles.centerImage}>
      {true && (
        <Image source={{uri:image}} style={styles.placeholder}/>
      )}
      </View>
        <View style={styles.buttonContainer}>
            <Button 
            title="Take Photo"
            onPress={()=> setShowCamera(true)}
            style={styles.buttonStyle}/>
            <Button 
            title="View Photos"
            onPress={()=> Pull()}
            style={styles.buttonStyle}/>
        </View></>}
    </View>

  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#add8e6',

      
    },
    camera:{
        height:1000
    },
    buttonStyle:{
        borderRadius: 4,
        height:40,
        marginBottom:10,
        
    },
    buttonContainer:
    {
        width: '100%',
        height: 100,
        marginTop:20,
        justifyContent: 'center',
        alignItems: 'center',
    }, 
    BottomButton:{
        marginBottom:100,
        height:75
    },
    captureButton:
    {
      marginTop:'auto',
      marginBottom:140,
      backgroundColor: 'rgba(46, 204, 197, 1)'
    }, 
    placeholder:{
      justifyContent: 'center',
      width: '100%',
      alignSelf: 'center',
      backgroundColor: '#0000FF',
      borderRadius: 10,
      width:300,
      height:500,
      backgroundColor:'grey',
      marginTop:100

    }, 

    

});