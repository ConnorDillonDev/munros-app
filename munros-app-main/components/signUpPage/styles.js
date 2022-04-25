import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    MunroContainer: {
        width: '100%',
        height: '100%',
      },

      image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        position: 'absolute'
      },
    
      titles: {
        marginTop :'10%',
        width: '100%',
        alignItems: 'center',
      }, 
    
      title: {
        fontSize: 50,
      },
      
      subtitle: {
        color: '#fff',
        fontStyle: 'italic',
        padding: 10
        
      },
      special: {
        color: '#fff',
        textAlign: 'center',
      },
      error:{
        textAlign: 'center',
        color: 'red',
        fontWeight: 'bold',
        fontSize:20
      }
});

export default styles;