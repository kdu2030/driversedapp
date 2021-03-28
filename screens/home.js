import React, { Component, useState } from 'react';
import { AppRegistry, StyleSheet, Text, View, Button } from 'react-native';
import Card from '../shared/card';
import { SQLite } from 'expo-sqlite';
import Constants from 'expo-constants';
import { Formik } from 'formik';
import AsyncStorage from '@react-native-community/async-storage';
import { createStackNavigator, createAppContainer } from 'react-navigation';

var hr = 0;
var min = 0;
var sec = 0;
var interval = 0;
var numClicked = 0;
var timeStampArr = { tsHours: '', tsMinutes: '', tsSeconds: '' };
var totalTime;
var currentHour;
var storeData;
var currentTimestamp;
var allTimes = [];
var q = -1;
var t = -1;
export default function Home({ navigation }) {
  // create a path you want to write to

  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });

  const [showSave, setShowSave] = useState(false);
  const clickHandlerSave = () => {
    if (numClicked % 2 === 0) {
      numClicked++;
    } else {
      clearInterval(interval);
      setButton({ color: 'green', text: 'Start' });
    }
    setShowSave(true);
    currentHour = new Date().getHours();
    if (showSave === true) {
      numClicked++;
    }

    q++;
    if (currentHour >= 17) {
      /*
      month: 6,
      day: 25,
      year: 2020,
      hours: 4,
      minutes: 45,
      dayTime: true,
      */
      currentTimestamp = {
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
        day: new Date().getDate(),
        hours: hr,
        minutes: min,
        dayTime: false,
        key: q,
      };
    } else {
      currentTimestamp = {
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
        day: new Date().getDate(),
        hours: hr,
        minutes: min,
        dayTime: true,
        key: q,
      };
    }
    setTime({ hours: 0, minutes: 0, seconds: 0 });
    hr = 0;
    min = 0;
    sec = 0;
    //alert(JSON.stringify(currentTimestamp));
    allTimes.push(currentTimestamp);
    AsyncStorage.setItem('totalTimesArr', JSON.stringify(allTimes));
    //alert(JSON.stringify(allTimes));
  };
  const [button, setButton] = useState({ color: 'green', text: 'Start' });

  const clickHandler = () => {
    if (numClicked % 2 === 0) {
      interval = setInterval(update, 1000);
      setButton({ color: 'red', text: 'Pause' });
    } else {
      clearInterval(interval);
      setButton({ color: 'green', text: 'Start' });
    }
    setShowSave(true);
    numClicked++;
  };

  function pad(n) {
    return ('00' + n).substr(-2);
  }

  function update() {
    sec++;
    if (sec >= 60) {
      min += sec / 60;
      sec = sec % 60;
    }

    if (min >= 60) {
      hr += min / 60;
      min = min % 60;
    }
    setTime({ hours: hr, minutes: min, seconds: sec });
  }
  const makeWork = async () => {
    try {
      console.log(await AsyncStorage.getItem('totalTimesArr'));
      allTimes = JSON.parse(await AsyncStorage.getItem('totalTimesArr'));
    } catch {
      console.log('async caught');
    }
  };

  //Credit: John C. Bullard ~Debugger
  const load = navigation.addListener('didFocus', () => {
    if (q >= 0) {
      makeWork();
    }
  });

  /*
  const getData = async () => {
    try {
      console.log("Getting data")
      allTimes = [JSON.parse(await AsyncStorage.getItem('totalTimesArr'))];
      //alert(taco);
    } catch (error) {
      allTimes = []
    }
  };

  const getData = async () => {
    try {
      console.log('Getting data');
      var taco = await AsyncStorage.getItem('currentTimeStamp');
      console.log(taco);
    } catch (error) {
      console.log(error);
    }
  };
  */
  return (
    <View style={styles.container}>
      <Text style={styles.time}>
        {pad(time.hours)}:{pad(time.minutes)}:{pad(time.seconds)}
      </Text>
      <View>
        <Button
          title={button.text}
          color={button.color}
          onPress={clickHandler}
        />
      </View>
      <View style={styles.saveButton}>
        {showSave && (
          <Button
            title=" Save "
            onPress={() => {
              //getData();
              clickHandlerSave();
            }}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  time: {
    fontSize: 50,
    textAlign: 'center',
    margin: 10,
  },
  saveButton: {
    marginTop: 10,
  },
});
