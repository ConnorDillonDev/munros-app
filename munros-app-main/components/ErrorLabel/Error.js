import React from "react"
import {View} from 'react-native'
import {Alert} from 'react-bootstrap'


const errorLabel = ({variant, txt}) => {
        return(
            <View style={styles.container}>
                <Alert variant={variant}>
                <Alert.Heading>{txt}</Alert.Heading>
                </Alert>
            </View>
        )
}

export default errorLabel;