import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';

export default function LogDetails({ navigation }) {
  const [dLogs, setDLogs] = useState();
  const getData = async () => {
    try {
      console.log('Getting data in Log Details');
      var currentTimestamps = await AsyncStorage.getItem('totalTimesArr');
      //alert(currentTimestamps);
      setDLogs(JSON.parse(currentTimestamps));
    } catch (error) {
      console.log(error);
    }
  };

  const load = navigation.addListener('didFocus', () => {
    getData();
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {navigation.getParam('month')}/{navigation.getParam('day')}/
        {navigation.getParam('year')}
      </Text>
      <Text style={styles.text}>
        Time Driven: {navigation.getParam('hours')}H{' '}
        {navigation.getParam('minutes')}M
      </Text>
      <TouchableOpacity>
        <MaterialIcons
          name="delete"
          size={28}
          style={styles.icon}
          onPress={() => {
            dLogs.splice(navigation.getParam('key'), 1);
            AsyncStorage.setItem('totalTimesArr', JSON.stringify(dLogs));
            AsyncStorage.setItem('editedData', JSON.stringify(dLogs));
            
          }}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
});
