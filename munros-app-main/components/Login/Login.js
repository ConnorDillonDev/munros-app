import React, { useState } from "react";
import {View, Text, ImageBackground, useWindowDimensions, useEffect} from "react-native";
import styles from "./styles.js"
import CustomInput from "../CustomInput";
import Btn from "../Btn/Btn";
import errorLabel from "../ErrorLabel/Error"


import GoogleSignIn from "../GoogleSignUp/GoogleSignIn"
import { useNavigation } from "@react-navigation/native";

import {authentication} from '../../Firebase/Firebase'
import {signInWithEmailAndPassword} from 'firebase/auth/'



const LoginPage = () =>{
  const [email, setEmail] = useState('');//set inputs empty string
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const nav = useNavigation();

  const Login1 = () => { //changed to login1 as the redirect from registration was calling this on load
    try{
      setError('')
          signInWithEmailAndPassword(authentication, email, password)
          .then((resp) =>{
            console.log(resp)
            nav.navigate('Home',{Email : email});
          }).catch((e) => {
            if(e.toString().includes("invalid-email"))
              {
                console.log(e);
                setError("Email address is invalid");
              }else if(e.toString().includes("email")){
                console.log(e);
                setError("Email is already in use");
              }
            else
            {
              setError("Invalid Credentials")
            }
            
            });
    
    }catch(e){console.log(e)
       setError("Invalid Login")
    };
    console.log(error);
  }


  const createAcount = () => {
    console.warn('create Account')
    nav.navigate('Signup');

  }

  return (
      <View style={styles.MunroContainer}>

      <ImageBackground source={require('../../assets/images/nevis.webp')} style={styles.image}/> 
      <View style={styles.titles}>
        <Text style={styles.title}>Peaks</Text>
        <Text style={styles.subtitle}>The Sky is the Limit</Text>
      </View>
      
      
      <CustomInput placeholder="Email" value={email} setValue={setEmail}/>
      <CustomInput placeholder= "Password" value={password} setValue={setPassword} secureTextEntry={true}/>
      {error !=null && <Text style={styles.error}>{error}</Text>} 

      
      
      <Btn txt='Login' onClick={Login1}/>

      {/* <GoogleSignIn/> */}
      
      <Btn txt='Create Account' onClick={createAcount}/>


    </View>
    );
};

export default LoginPage;