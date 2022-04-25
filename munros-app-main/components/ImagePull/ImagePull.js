import React from 'react';
import {View, Text, StyleSheet, Button, ScrollView} from 'react-native';
import GallerySwiper from "react-native-gallery-swiper";



const ImagePull = (props) => {
    //Call to where the Photos are stored (api key needs to be moved to .env file)
    //https://371452735915724:yzXi9cRVv-hlsJsSF0Jv73K9WMs@api.cloudinary.com/v1_1/dfy12rpmk/resources/image
    //secure_url

    let images;
  
    Object.values(props).forEach(value => {
        images = value.params
    });


    return(
        <ScrollView>
            <View style={{padding:5}}>
            <GallerySwiper
            images={images}
            initialNumToRender={5}
            sensitiveScroll={false}
            />
            </View>
        </ScrollView>
    );
}

export default ImagePull;