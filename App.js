/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
} from 'react-native';
import Modal from "react-native-modal";
import MedDisplay from "./MedicationDisplay";
import AwesomeButton from "react-native-really-awesome-button";
import styles from './Style';
import BluetoothSerial from 'react-native-bluetooth-serial';

const a_styles = StyleSheet.create(
  {
    form_header: {
      color: 'black',
      fontWeight: 'bold',
      textAlign: "center",
      marginTop: 10,
      fontFamily: 'monospace',
      fontSize: 19,
    },
    inputContainer: {
      paddingTop: 5,
      marginTop: 5,
      flex: 1,
      flexDirection: "column",
      justifyContent: 'space-around',
      backgroundColor: 'white',
      opacity: 1,
      fontFamily: 'monospace'
    },
    textInput: {
      borderColor: 'black',
      borderWidth: 2,
      width: 360,
      fontSize: 20,
      paddingLeft: 20,
      paddingRight: 20,
      marginTop: 10,
      fontFamily: 'monospace',
      borderRadius: 3,
    },
    textInputInstructions: {
      borderColor: 'black',
      borderWidth: 2,
      width: 360,
      fontSize: 14,
      paddingLeft: 20,
      paddingRight: 20,
      marginTop: 10,
      fontFamily: 'monospace',
      borderRadius: 3,
    },
    submitbutton: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: "center",
      marginTop: 13,
      marginBottom: 9,
      width: 160,
    },
});

class App extends Component {
  constructor(props) {
    super(props);
    //this.MedDis = React.createRef();
  this.state = {
    msg:"",
    connected: false,
    instructs: "",
    medlist: [
      {
        medication_name: "Paracetamol",
        medication_type: 'Cold',
        box_number: 'A',
        medication_interval: 15,
        medication_string: 2,
        remaining_time: 15,
      },
    ],
    temp: {
      medication_name: "",
      medication_type: "",
      medication_interval: 0,
      box_number: "",
      medication_string: 0,
    },
    isModalVisible: false, //this is for the modal control
    isAlertModalVisible: false,
    
  }

  }

deleteHandler = (box_id) =>
{
  var state_x = [...this.state.medlist]
  state_x.forEach(function(result, index) {
    if(result['box_number'] === box_id) {
      //Remove from array
      state_x.splice(index, 1);
    }    
  });
  this.setState({medlist: state_x})
  //console.log(this.state.medlist)
}

// componentWillMount() {
//     Promise.all([BluetoothSerial.isEnabled(), BluetoothSerial.list()]).then(
//       values => {
//         const [isEnabled, devices] = values;
//         this.setState({ isEnabled, devices, devicesFormatted });
//       }
//     );
//     console.log('here');

//     BluetoothSerial.on("bluetoothEnabled", () =>
//       console.log("Bluetooth enabled")
//     );

//     BluetoothSerial.on("bluetoothDisabled", () =>
//       console.log("Bluetooth disabled")
//     );

//     BluetoothSerial.on("error", err => {
//       console.log("error", err);
//     });

//     BluetoothSerial.on("connectionLost", () => {
//       if (this.state.device) {
//         this.connect(this.state.device)
//           .then(res => {})
//           .catch(err => {
//             console.log("error", err);
//           });
//       }
//     });

//   }

  componentDidMount(){
    BluetoothSerial.connect("00:21:13:01:14:38")
    .then((res) => {
      console.log('connected');
      this.setState({ connected: true, });
      console.log(this.state);
    })
    .catch((err) => console.log(err.message))

    this.onStart();
  }


  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  alertModal = () => {
    this.setState({ isAlertModalVisible: true });
  };


  //send msg
  sendMsg(msg){
    BluetoothSerial.write(msg)
  }

  onStart = () => {
    this._interval = setInterval(() => {
      for(let x=0;x<this.state.medlist.length;x++){
        var new_x = [...this.state.medlist]
        
        if(new_x[x]['remaining_time'] <= 0){
          continue;
        }
        new_x[x]['remaining_time'] -= 1;
        // this.state.medlist[x]['remaining_time'] -= 1;


        //time is up
        if(new_x[x]['remaining_time']<=0){
          //send alert
          this.sendMsg(new_x[x]['box_number'] + ':' + new_x[x]['medication_string']+"\n");
          //console.log('Time for ' + this.state.medlist[x].medication_name);

          
          this.state.instructs += 'Box ' + new_x[x]['box_number'] + ': ' + new_x[x]['medication_string']+"\n";
          //reset remaining_time
          
        } 
        this.setState({medlist: new_x})

    }

    if(this.state.instructs){      
      this.alertModal();
      
    }
          
 }, 1000);
}

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: '#c2dbff', }}>
        <AwesomeButton textSize={22} textFontFamily={'monospace'} style={{ marginTop: 20, marginBottom: 10,}}stretch={true} backgroundColor={'#e88580'} progressLoadingTime={1000} onPress={this.toggleModal}>Add Medicine +</AwesomeButton>
           
        <ScrollView>
           <Modal coverScreen={true} isVisible={this.state.isModalVisible} backdropColor='#f7edd0' backdropOpacity={1}>
            <View style={styles.inputContainer}>
              <Text style={a_styles.form_header}>Name</Text>
              <TextInput
                style={a_styles.textInput}
                placeholder="Clarinase"
                maxLength={40}
                value = {this.state.temp.medication_name}
                onChangeText={(text)=>{
                  var newtemp = {...this.state.temp}
                  newtemp.medication_name = text;
                  this.setState({temp: newtemp})
                  //console.log(this.state.temp.medication_name);
                }}
              />
              <Text style={a_styles.form_header}>Type</Text>
              <TextInput
                style={a_styles.textInput}
                placeholder="Cold"
                maxLength={40}
                value = {this.state.temp.medication_type}
                onChangeText={(text)=>{
                  var newtemp = {...this.state.temp}
                  newtemp.medication_type = text;
                  this.setState({temp: newtemp})
                  //console.log(this.state.temp.medication_type);
                }}
              />
              <Text style={a_styles.form_header}>Time-interval in Hours</Text>
              <TextInput 
                keyboardType={'numeric'}
                style={a_styles.textInput}
                placeholder="5"
                maxLength={40}
                value = {this.state.temp.medication_interval}
                onChangeText={(text)=>{
                  var newtemp = {...this.state.temp}
                  newtemp.medication_interval = text;
                  this.setState({temp: newtemp})
                  //console.log(this.state.temp.medication_interval);
                }}
              />
              <Text style={a_styles.form_header}>Box</Text>
              <TextInput
                style={a_styles.textInput}
                placeholder="A"
                maxLength={1}
                value = {this.state.temp.box_number}
                onChangeText={(text)=>{
                  var newtemp = {...this.state.temp}
                  newtemp.box_number = text;
                  this.setState({temp: newtemp})
                  //console.log(this.state.temp.box_number);
                }}
              />
              <Text style={a_styles.form_header}>Number of Tablets:</Text>
              <TextInput
                keyboardType={'numeric'}
                style={a_styles.textInputInstructions}
                placeholder="2"
                maxLength={400}
                value = {this.state.temp.medication_string}
                onChangeText={(text)=>{
                  // this.state.temp.medication_string = text
                  // this.setState({temp: {medication_string : text}});
                  var newtemp = {...this.state.temp}
                  newtemp.medication_string = text;
                  this.setState({temp: newtemp})
                  //console.log(this.state.temp.medication_string);
                }}
              />
              <View style={{ flex: 1, justifyContent: "space-around", flexDirection: "row",}}>
                <AwesomeButton borderRadius={14} textSize={16} textFontFamily='monospace' backgroundColor='#a3bf47' width={150} style={{ marginTop: 18,}} onPress={() => {
                  if(this.state.temp.medication_name==="" ||
                  this.state.temp.medication_type=== "" ||
                  this.state.temp.medication_interval===0 ||
                  this.state.temp.box_number==="" ||
                  this.state.temp.medication_string===0                 
                  ){
                    this.setState({msg: "Please fill in all blanks!"});
                    return;
                  }

                  var used = "";
                  var state_x = [...this.state.medlist];
                  state_x.forEach(function(result, index) {
                    used += result['box_number'];    
                  });
                  if(!"ABCD".includes(this.state.temp.box_number)){
                    this.setState({msg: "Fill in a valid box number!"});
                    return;
                  } else if(used.includes(this.state.temp.box_number)) {
                    this.setState({msg: "Box " + this.state.temp.box_number + " already in use."});
                    return;
                  }
                  
                  this.state.medlist.push(
                    {
                      medication_name: this.state.temp.medication_name,
                      medication_type: this.state.temp.medication_type,
                      medication_interval: this.state.temp.medication_interval,
                      box_number: this.state.temp.box_number,
                      medication_string: this.state.temp.medication_string,
                      remaining_time: this.state.temp.medication_interval,
                    }
                  )
                  var newtemp = {
                    medication_name: "",
                    medication_type: "",
                    medication_interval: 0,
                    box_number: "",
                    medication_string: 0,
                  }
                  this.setState({temp:newtemp})
                  this.toggleModal()
                  this.state.msg = "";
                  //console.log(this.state.medlist)
                }}>Add Medication</AwesomeButton>
                <AwesomeButton borderRadius={14} textSize={16} textFontFamily='monospace' backgroundColor='#c7504a'width={150} onPress={() => {
                  this.toggleModal(); 
                  this.setState({msg:""})
                  var newtemp = {
                    medication_name: "",
                    medication_type: "",
                    medication_interval: 0,
                    box_number: "",
                    medication_string: 0,
                  }
                  this.setState({temp:newtemp})
                  
                  }} style={{ marginTop: 18,}}>Cancel</AwesomeButton>
              </View>
              <Text style={{color: 'red', paddingTop:100,fontWeight: 'bold',fontFamily: 'monospace',fontSize: 19}}>{this.state.msg}</Text>
              </View>
          </Modal>
          <Modal isVisible={this.state.isAlertModalVisible} >
              <View style={{ paddingTop: 10, paddingBottom: 10, flexGrow: 0.1, flexDirection: 'column', justifyContent: "space-around", backgroundColor: '#f5ebd5', borderRadius: 14,}}>
                <Text style={{ fontWeight: 'bold', fontFamily: 'monospace', textAlign: 'center', paddingTop: 9, paddingBottom: 9,}}>Time to take your pills</Text>
                <Text style={{ fontFamily: 'monospace', textAlign: 'center', paddingTop: 9, paddingBottom: 9,}}>{this.state.instructs}</Text>
                <View style={{ fontFamily: 'monospace', flex:1, flexDirection: 'row', justifyContent: "center", }}>
                  <AwesomeButton style={{ marginBottom: 16, }} textSize={14} width={130} textFontFamily={"monospace"} backgroundColor={'#93d678'} onPress={() => {
                  this.setState({isAlertModalVisible: false });
                  this.setState({instructs: ""});
                  for(let x=0;x<this.state.medlist.length;x++){
                    var new_x = [...this.state.medlist]
                    if(new_x[x]['remaining_time']!=0){
                      continue;
                    }
                    new_x[x]['remaining_time'] = this.state.medlist[x].medication_interval;
                    this.sendMsg('E');
                  }
                  }}>Done</AwesomeButton>
                </View>
              </View>
          </Modal>
          <MedDisplay deleteHandler={this.deleteHandler} Medlist={this.state.medlist}/>
        </ScrollView>
      </View>
    );
  }
}

export default App;
