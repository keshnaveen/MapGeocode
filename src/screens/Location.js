
// App.js

import React, { Component } from 'react';
import { Alert, StyleSheet, Text, View, TouchableOpacity, SafeAreaView,  ScrollView, Button} from 'react-native';
import GetLocation from 'react-native-get-location'
import Http from './Api/http';

export default class App extends Component {
	state = {
		locationStr: <Text>{''}</Text>,
		location: null,
		geocode: []
	};

	findCoordinates = async () => {
		try{
			let location = await GetLocation.getCurrentPosition({
				enableHighAccuracy: true,
				timeout: 15000,
			});
			this.setState({locationStr: <Text>{JSON.stringify(location)}</Text>});
			this.setState({ location });

			console.log(this.state.location.latitude)
			console.log(this.state.location.longitude)

			const resp = await Http.get('/geocode/json', {
				params: {
				key: '<API KEY>',
				//latlng: this.state.location.latitude + ',' + this.state.location.longitude
				latlng: "-2.3132523,120.3049901"
				}   
			});

			if(resp.data.status === "OK"){
				this.state.geocode = [];
				let textInput = this.state.geocode;
				let result = resp.data.results[0];
	
				for (let i=0; i< result.address_components.length; i++){
				   let desc ='';
				   for(let y of result.address_components[i].types){
					  if(desc === '')
						 desc += y;
					  else
						 desc += ' / '+y;
				   }
	
				   console.log(desc);
				   console.log(result.address_components[i].long_name);
	
				   textInput.push(<Text style={styles.header} key={Date.now().toString()}>{desc}</Text>);
				   textInput.push(<Text style={styles.body} key={Date.now().toString()}>{result.address_components[i].long_name}</Text>)
				}
	
				this.setState({textInput});
	
			 }
		}
		catch(ex){
			Alert.alert(ex.message)
		}
	};

	render() {
		return (
			<SafeAreaView>
            	<ScrollView>
					<View style={styles.container}>
					<Button
                        style = {{padding: 20,
                           paddingTop: 2,
                           margin: 3}}
                        onPress={this.findCoordinates}
                        title="Get Location"
                        color="#000000"
                        accessibilityLabel="Learn more about this purple button"
                        />
						{/* <TouchableOpacity onPress={this.findCoordinates}>
							<Text style={styles.welcome}>Find My Coords?</Text>
							<Text>Location: {this.state.location}</Text>
						</TouchableOpacity> */}

						{this.state.locationStr}

						{this.state.geocode.map((value, index) => {
                              return value
                        })}
					</View>
				</ScrollView>
            </SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
    container: {
       paddingTop: 20,
       backgroundColor: '#ffffff'
    },
    input: {
       margin: 15,
       marginLeft: 3,
       height: 40,
       padding: 2,
       //borderColor: '#7a42f4',
       borderWidth: 1
    },
    submitButton: {
       backgroundColor: '#7a42f4',
       padding: 10,
       margin: 15,
       height: 40,
    },
    submitButtonText:{
       color: 'white'
    },
    header:{
       padding: 10,
       paddingBottom: 0,
       margin: 5,
       fontSize: 10,
       fontWeight: "300"
    },
    body:{
      padding: 10,
      paddingTop: 2,
      margin: 3,
      fontSize: 10,
      fontWeight: "bold"
   }
 })