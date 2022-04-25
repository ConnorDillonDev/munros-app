import React, {useState} from 'react';
import {TextInput, TouchableOpacity, Keyboard, ScrollView, StyleSheet, Text, View, Alert, Dimensions} from 'react-native';
import Note from '../NewsCards/NewsCards';
import {Button} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DialogInput from 'react-native-dialog-input';



export default function App() {
  const [note, setNote] = useState();
  const [noteItems, setNoteItems] = useState([]);
  const [visible, setVisible] = useState();
  const [selectIndex, setSelectIndex] = useState();
  
  isEmpty();
  

  async function isEmpty(){
    try
    {
      const jsonValue = await (AsyncStorage.getItem('@location')) //check to see if the space is empty as this was causing a crash with no errors
      let jsonValue2 = JSON.parse(jsonValue);

      if(jsonValue2.length > 0)
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
        const jsonValue = await AsyncStorage.getItem('@location')
        // var myArray = JSON.parse(JSON.stringify(jsonValue.replace(/['"]+/g, '')));
 

        if(noteItems.length == 0){
            setNoteItems([...JSON.parse(jsonValue)]); //copy data from persistant storage to notes to be displayed
        }

      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
        Alert.alert(e);
      // error reading value
    }
  }


  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@location', jsonValue)
    } catch (e) {
      // saving error
      Alert.alert(e);
    }
  }

  const AddToPage = () => {
    Keyboard.dismiss();
    //set datetime
    let dateTime= new Date().toLocaleString();
    let dateTime_Note = dateTime + " " + note; // adding date time to the note for future manipulation
    setNoteItems([...noteItems, dateTime_Note]) // map current notes and then add the new note
    let copyNotes = [...noteItems];
    copyNotes.push(dateTime_Note);
    setNoteItems(copyNotes);
    setNote(null); //set to null to avoid duplicates
    storeData(copyNotes);
  }

  const RemoveFromPage = (index) => {
    let notesCopy = [...noteItems]; //all notes copied
    notesCopy.splice(index, 1); //from the selected splice to next
    setNoteItems(notesCopy) //call effect the update notes state
    storeData(notesCopy); //save to persistnat storage

  }

  const handleCancel = () => {
    setVisible(false);
  };

  const handleShow = (index) => {
    //set key for edit mode
    setSelectIndex(index);
    setVisible(true);//shows input prompt
  }


  const saveEdit = (note) => {
    let dateTime= new Date().toLocaleString();
    let dateTime_Note = dateTime + " " + note; // adding date time to the note for future manipulation



    let notesCopy = [...noteItems]; //all notes copied
    notesCopy[selectIndex] = dateTime_Note; //update the copied array with the new text
    

    setNoteItems(notesCopy) //call effect the update notes state
    storeData(notesCopy); //save to persistnat storage

    setVisible(false); //close popup

  };


  return (
    <><View style={{ paddingTop: 100, backgroundColor:'#add8e6' }}>

      {visible == true &&


        <DialogInput isDialogVisible={true}
          title={"Editing Note"}
          message={"Enter new note"}
          hintInput={"new note here..."}
          submitInput={(inputText) => { saveEdit(inputText); } }
          closeDialog={() => { handleCancel(true); } }>
        </DialogInput>}



      <ScrollView keyboardShouldPersistTaps='always' style={styles.scrollContain}>
        <Text style={styles.heading}>Notes</Text>
        <Text style={styles.smallText}>Tap to remove</Text>

          
        {noteItems.map((desc, index) => {
          let dateTime = desc.substring(0, 20);
          let description = desc.substring(21);



          return (
            <View style={styles.container2}>
              <TouchableOpacity style={styles.bin} key={index} //send index to the the function
                onPress={() => RemoveFromPage(index)}
              >
                <Note description={description} dateTime={dateTime} />
              </TouchableOpacity>

              <Button
                style={styles.editbtn}
                key2={index}
                title="Edit"
                onPress={() => handleShow(index)} />
            </View>
          );
        })}

      </ScrollView>
    </View>
    <View style={styles.containerHold}>
        <TextInput style={styles.inputNote} placeholder={'Create a note'} value={note} onChangeText={text => setNote(text)} />
    </View>
    <Button
            style={styles.btn}
            title="Add"
            onPress={() => AddToPage()}>
      </Button>
    <View style={styles.hold}>
      
      
    </View>
      
      </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  heading: {
      fontSize:40,
      textAlign: 'center'
  },
  inputNote:{
      marginTop:20,
      borderWidth: 1,
      padding:10,
      width:300
  }, 
  smallText:{
      textAlign: 'center',
      fontStyle: 'italic',
  },
  btn:{
    justifyContent: 'center',
    width: '50%',
    maxWidth:300,
    height: 40,
    alignSelf: 'center',
    margin: 20,
    backgroundColor: '#0000FF',
    borderRadius: 10,
    marginRight:60


  },
  container2:{
      flex:1,
      flexDirection:'row',
      justifyContent: 'center',
      
  },
  editbtn: {
      flex:1,
      marginBottom:25,
      justifyContent: 'flex-end',
  },
  containerHold:{
    flex:1,
    flexDirection:'row',
    justifyContent: 'center', 
    maxHeight: 100,
    marginRight:40
  },
  hold:{
    position:'absolute',
    bottom:50

  },
  scrollContain:{
    maxHeight:655
  },
  centerMe:{
      
  }

});