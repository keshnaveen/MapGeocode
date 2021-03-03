import React, {Component} from 'react';
import { Text, StyleSheet, View, TouchableOpacity, TextInput, ScrollView, SafeAreaView, Button } from 'react-native';
import { color } from 'react-native-reanimated';
import GetLocation from 'react-native-get-location'

import Http from './Api/http';

class Maps extends Component{
    state = {
        email: '',
        password: '',
        description: [],
        location: '',
         geocode: []
     }
     
     handleEmail = (text) => {
        this.setState({ email: text })
     }
     handlePassword = (text) => {
        this.setState({ password: text })
     }
     login = (email, pass) => {
        alert('email: ' + email + ' password: ' + pass)
     }

     searchLocation = async (text)=>{
        console.log(text);

        if(text.length > 5){
         const resp = await Http.get('/place/autocomplete/json', {
            params: {
             key: '<API KEY>',
             input: text
            }   
         });
         
         if(resp.data.status === "OK"){
            this.state.description = [];
            let textInput = this.state.description;
            let result = resp.data.predictions[0];
            if(result.description){
               // textInput.push(<Text style={styles.header} key="description">Prediction</Text>);
               this.state.location = resp.data.predictions[0].description;
               textInput.push(<Text style={styles.body} key={resp.data.predictions[0].description}>{resp.data.predictions[0].description}</Text>)
            }

            // if(result.structured_formatting){
            //    if(result.structured_formatting.main_text){
            //       textInput.push(<Text style={styles.header} key="main_text">Main Text Prediction</Text>);
            //       textInput.push(<Text style={styles.body} key={result.structured_formatting.main_text}>{result.structured_formatting.main_text}</Text>)
            //    }
            //    if(result.structured_formatting.secondary_text){
            //       textInput.push(<Text style={styles.header} key="secondary_text">Secondary Text Prediction</Text>);
            //       textInput.push(<Text style={styles.body} key={result.structured_formatting.secondary_text}>{result.structured_formatting.secondary_text}</Text>)
            //    }
            // }

            // textInput.push(<Text style={styles.header} key="Category">Categories</Text>);

            // if(result.terms && result.terms.length > 0){
            //    for (let i = 0; i<result.terms.length; i++){
            //       let typeText = result.types[i] ? result.types[i] : "UnKnown";

            //       textInput.push(<Text style={styles.header} key={typeText === "UnKnown" ? Date.now().toString() : typeText}>{typeText}</Text>);
            //       textInput.push(<Text style={styles.body} key={result.terms[i].value}>{result.terms[i].value}</Text>)
            //    }
            // }
            
            this.setState({textInput});
         }
        }
     }

     getGeoCodeInfo = async ()=>{
         const resp = await Http.get('/geocode/json', {
            params: {
            key: '<API KEY>',
            address: this.state.location
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

     render() {
        return (
            <SafeAreaView>
               <ScrollView>
                     <View style = {styles.container}>
                  
                     <TextInput style = {styles.input}
                        underlineColorAndroid = "transparent"
                        placeholder = "Search Here"
                        autoCapitalize = "none"
                        onChangeText = {this.searchLocation}/>
                     
                     {this.state.description.map((value, index) => {
                           return value
                     })}

                     <Button
                        style = {{padding: 20,
                           paddingTop: 2,
                           margin: 3}}
                        onPress={this.getGeoCodeInfo}
                        title="Confirm"
                        color="#000000"
                        accessibilityLabel="Learn more about this purple button"
                        />
                  
                        {this.state.geocode.map((value, index) => {
                              return value
                        })}
                     
                     </View>
               </ScrollView>
            </SafeAreaView>

        )
     }
}

export default Maps;

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