import React, { useState } from "react";
import {View, Text, Button, ImageBackground} from "react-native";
import styles from "./styles.js"
import CustomInput from "../CustomInput";
import Btn from "../Btn/Btn";
import { useNavigation } from "@react-navigation/native";

import {authentication} from '../../Firebase/Firebase'
import {createUserWithEmailAndPassword} from 'firebase/auth/'









const signUpPage = () =>{
  const [email, setEmail] = useState();//set inputs empty string
  const [password, setPassword] = useState();
  const [repeatPassword, setRepeat] = useState('');
  const [error, setError] = useState();



  function SubmitSignUp(event) {
    if(email == ""){
      setError("Email must be complete");
    }else if(password == ""){
      setError("Password must be complete");
    }
    else{

      event.preventDefault();//prevent page refresh
      try{
        if(password==repeatPassword){
            createUserWithEmailAndPassword(authentication,email, password)
            .then((re) =>{
              console.log(re)
              nav.navigate('Login');
              
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
                setError("Password must contain 6 or more characters")
              }
            
            });
        }else{setError('Passwords do not match!')}

      }catch(e){setError(e)};
    }
  }






  const nav = useNavigation();


  // const handleClick = () => {nav.navigate('Home')}

  const accountAlready = () => {nav.navigate('Login')}

  // const GoogleSign = () => {nav.navigate('Login')}

  return (
    
      <View style={styles.MunroContainer}>
      <ImageBackground source={require('../../assets/images/nevis.webp')} style={styles.image}/> 

      <View style={styles.titles}>
        <Text style={styles.title}>Peaks</Text>
        <Text style={styles.subtitle}>The Sky is the Limit</Text>
      </View>

      <CustomInput placeholder="Email" value={email} setValue={setEmail}/>
      <CustomInput placeholder= "Password" value={password} setValue={setPassword} secureTextEntry={true}/>
      <CustomInput placeholder= "repeatPassword" value={repeatPassword} setValue={setRepeat} secureTextEntry={true}/>
      {error !=null && <Text style={styles.error}>{error}</Text>} 
      {/* only show error if the error text is greater than 1  */}



      <Btn txt='SignUp' onClick={SubmitSignUp}/>

      <Btn txt='Already have an Account? Login' onClick={accountAlready}/>

    </View>
    );
};

export default signUpPage;