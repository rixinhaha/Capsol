
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import AwesomeButton from "react-native-really-awesome-button";

const styles = StyleSheet.create(
    {
      box: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'red',
      },
      textalignheader: {
        textAlign: 'center',
        fontFamily: 'monospace',
        fontWeight: "bold",
        fontSize: 17,
      },
      textalign: {
        textAlign: 'center',
        fontFamily: 'monospace',
        marginBottom: 10,
        marginTop: 5,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        paddingTop: 5,
        paddingBottom: 5,
        backgroundColor: '#e3e7fa',
        fontSize: 20,
      },
});

class MedDisplay extends Component {

    render() {
        return (
            <View style={{flex: 1, flexDirection: 'column', }}>
                {this.props.Medlist.map((item) => {
                    return(
                        <View style={{
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 3,
                            },
                            shadowOpacity: 0.29,
                            shadowRadius: 4.65,
                            elevation: 7,
                            flex: 1, flexDirection: 'column', borderRadius: 14, borderColor:'black', backgroundColor: '#F6F6D0', marginTop: 8, marginBottom: 8, width: 400, paddingTop: 10, paddingBottom: 10, paddingLeft: 10, paddingRight: 10,}}>
                            <Text style={styles.textalignheader}>Name:</Text>
                            <Text style={styles.textalign}>{item.medication_name}</Text>
                            <Text style={styles.textalignheader}>Type:</Text>
                            <Text style={styles.textalign}>{item.medication_type}</Text>
                            <Text style={styles.textalignheader}>Box:</Text>
                            <Text style={styles.textalign}>{item.box_number}</Text>
                            <Text style={styles.textalignheader}>Number of Tablets:</Text>
                            <Text style={styles.textalign}>{item.medication_string}</Text>
                            <Text style={styles.textalignheader}>Time-remaining:</Text>
                            <Text style={styles.textalign}>{item.remaining_time}s</Text>
                            <View style={{flexDirection: 'row', justifyContent: 'center',}}>
                                <AwesomeButton textFontFamily={'monospace'} backgroundColor={'#e88580'} borderRadius={20} width={150} onPress={() => this.props.deleteHandler(item.box_number)}>Delete</AwesomeButton>
                            </View>          
                        </View>
                    )
                })}
            </View>
        )
    }
}

export default MedDisplay;
