import React from "react";
import {View, TextInput, StyleSheet}  from 'react-native'
import MapView from 'react-native-maps';


const MapViewCustom = () => {
    return(
        <MapView 
            style={styles.map}
            initialRegion={{
              latitude: 1,
              longitude: 1,
              latitudeDelta:0.04,
              longitudeDelta:0.05
            }}>

            <MapView.Marker
              coordinate={{
                latitude: 1,
                longitude: 1
              }}
              title={"title"}
              description={"description"}
            />
            </MapView>
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
    },
    map: {
        width: "100%",
        height: 300
      },
})

export default MapViewCustom;