import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import Map from './src/screens/Maps';
import Location from './src/screens/Location';

export default function App() {

  const [ showByText, setShowByText ] = useState(false)
  const [ showByLocation, setShowByLocation ] = useState(false)

  const showByTextInput = async ()=>{
    setShowByText(true);
    setShowByLocation(false);

  }

  const showByLocationInput = async ()=>{
    setShowByText(false);
    setShowByLocation(true);
  }

  return (
    <View style={styles.container}>
      {showByText === true && showByLocation === false ? <Map></Map> : showByText === false && showByLocation === true ? <Location></Location> : <View >
        <View><Button
        style = {{padding: 20,
                paddingTop: 2,
                margin: 3}}
                onPress={showByTextInput}
                title="Try With Text Input"
                color="#000000"
                accessibilityLabel="Try With Text Input"
        /></View>
        <View style={{marginTop: 20}}><Button
          style = {{padding: 30,
                  paddingTop: 20,
                  margin: 30}}
                  onPress={showByLocationInput}
                  title="Try With GPS Location"
                  color="#000000"
                  accessibilityLabel="Try With GPS Location"
        /></View>
      </View>}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    paddingTop: 20,
    //flex: 1,
    backgroundColor: '#fff',
    //alignItems: 'center',
    //ustifyContent: 'center',
  },
});
