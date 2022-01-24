import React, { useState } from 'react';
import { Modal, Pressable, Text, TextInput, View, StyleSheet,TouchableOpacity, Picker, Image, ImageBackground, Alert} from 'react-native';
import Constants from 'expo-constants';

// You can import from local files
import AssetExample from './components/AssetExample';

// or any pure javascript modules available in npm
import { Card, Appbar, Button} from 'react-native-paper';

export default function App() {

  const [heigh, setheigh] = useState(0);
  const [weigh, setweigh] = useState(0);
  const [bmi, setbmi] = useState(" ");
  const [heightUnit, setheightUnit] = useState("cm");
  const [weightUnit, setweightUnit] = useState("Kg");


  function cal_bmi(lbs, ins)
{
   let h2 = (ins) * (ins);
   let bmi = (lbs)/h2 * 703
   let f_bmi = Math.floor(bmi);
   let diff  = bmi - f_bmi;
   diff = diff * 10;
   diff = Math.round(diff);
   if (diff == 10)
   {
      f_bmi += 1;
      diff   = 0;
   }
   bmi = f_bmi + "." + diff;
   return bmi;
}

function chnages(wei, weiType, hei, heiType){
    var weCh = wei;
    var heCh = hei;
    if(isNaN(weCh) || weCh <=0){

  alert("Enter Valid Value For -> Weight"); 
  return "Not Valid Input"
    }
    else if(isNaN(heCh) || heCh <=0){

  alert("Enter Valid Value For -> Height");
  return "Not Valid Input"
    }
    else{
    if(weiType == "Kg"){
        weCh = wei * 2.20462;
    }
    if(heiType == "Feet.Inch"){
        heCh = (parseInt(hei)*12)+((hei - parseInt(hei))*10);
    }
    if(heiType == "cm"){
        heCh = hei/2.54;
    }
    return cal_bmi(weCh,heCh);}
}


  const [modalVisible, setModalVisible] = useState(false);
  return (
    
    <View style={styles.container}>
     <ImageBackground source={require("./assets/bg.jpeg")} resizeMode="cover" style={styles.container}>
    <ImageBackground source={require("./assets/rate.png")} resizeMode="cover" style={styles.container}>
    </ImageBackground>

      <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>This application can determine a person's body fatness by dividing their weight in kilos by the square of their height in meters. Once you've entered your height and weight, the app will compute your BMI for you instantly.</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Close Info</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>BMI Calculator Information</Text>
      </Pressable>
    </View>

      <Text style={styles.title}>FAIR WEIGHT</Text>
    
      
     

      <View style={[{maxHeight: 500, width: "100%"}]}>
      <Text style={styles.text}>Height</Text>

      
      

      <View style={[styles.inpV,{flexDirection: "row"}]}>
        <TextInput
          style={[styles.inpo,{flex:1}]}
          placeholder={heightUnit} 
          keyboardType="numeric"
          onChangeText={(text) => {
            setheigh(parseFloat(text));
          }}>
        </TextInput>
      <Picker style={[styles.selector,{width: 50}]} selectedValue={heightUnit}
        onValueChange={(itemValue, itemIndex) => setheightUnit(itemValue)}>
        <Picker.Item label="cm" value="cm" />
        <Picker.Item label="Feet.Inch" value="Feet.Inch" />
      </Picker>
      </View>
      <Text style={styles.text}>Weight</Text>
      <View style={[styles.inpV,{flexDirection: "row"}]}>
        <TextInput
        keyboardType="numeric"
          style={[styles.inpo,{flex:1}]}
          placeholder={weightUnit}
          onChangeText={(text) => {
            setweigh(parseFloat(text));
          }}
        ></TextInput>
        <Picker style={[styles.selector,{width: 50}]} selectedValue={weightUnit}
        onValueChange={(itemVale, itemIndx) => setweightUnit(itemVale)}>
        <Picker.Item label="Kg" value="Kg" />
        <Picker.Item label="Lbs" value="Lbs" />
      </Picker>
      </View>

      </View>
      
<View style={[{width: "100%",flexDirection: "row",alignContent:"center", justifyContent:"center"}]}>
<TouchableOpacity
        style={[styles.submi,styles.shadow]}
        onPress={() => {
          setbmi("BMI = " + chnages(weigh,weightUnit , heigh, heightUnit));
        }}
        title="Submit"
      ><Text style={styles.text}>Submit</Text></TouchableOpacity></View>
      <Text style={styles.text2}>{bmi}</Text>
      </ImageBackground>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  shadow:{shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 5.84,

elevation: 10,},
  submi: {
    borderRadius: 50,
    backgroundColor: "#BDFFF3",
    padding: 2,
    borderWidth: 2,
    width: 100,
    textAlignment: "center",
    textAlign: "center",
    gravity: "center",
    alignContent: "center",
    justifyContent: "center"
    
  },
  inpV:{
    borderBottomWidth: 2,
    borderColor:"#999",
    marginHorizontal: 15,
    marginBottom:25,
    paddingHorizontal: 8},
  inpo: {
  },
  title: {
    fontWeight: "Bold",
    fontSize: 30,
    top: 0,
    marginVertical: 20,
    textAlign: "center",
    },
  text: {
    textAlign: "center",
    fontSize: 18,
    lineHeight: 35,
  },
  text2: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "Bold",
    marginTop: 15,
    lineHeight: 35,
  },
   modalView: {
    margin: 40,
    backgroundColor: "#F8E0E6",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    margin: 10,
    borderRadius: 60,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#8904B1",
  },
  buttonClose: {
    backgroundColor: "#8904B1",
  },
  textStyle: {
    color: "white",
    fontWeight: "Bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    
  }


  
});
