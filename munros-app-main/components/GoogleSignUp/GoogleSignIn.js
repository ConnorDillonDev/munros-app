import React from "react"
import {View} from 'react-native'
import Btn from '../Btn/Btn'

const GoogleSignIn = () => {
    const onSigninWithGoogle = () => {
        console.warn('Google');
    }

    return(
        <View>
            <Btn txt='Sign in with Google' onClick={onSigninWithGoogle} />
        </View>
    )
}

export default GoogleSignIn;