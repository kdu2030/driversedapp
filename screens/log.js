import React, { Component, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Modal,
  State,
  RCTAnimation,
} from 'react-native';
import { globalStyles } from '../styles/global';
import Card from '../shared/card';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';

export default function Log({ navigation }) {
  const [loadedData, setloadedData] = useState(false);

  const [email, setEmail] = useState({ studentEmail: '', parentEmail: '' });

  const getData = async () => {
    try {
      console.log('Getting data');
      var studentEmail = await AsyncStorage.getItem('studentEmail');
      var parentEmail = await AsyncStorage.getItem('parentEmail');
      var currentTimestamp = await AsyncStorage.getItem('totalTimesArr');
      //alert(currentTimestamp);
      //code begin

      var sent = await AsyncStorage.getItem('sent');
      checkDay(studentEmail, parentEmail, sent);

      //code end
      setLogs(JSON.parse(currentTimestamp));

      if (!loadedData) {
        setEmail({ studentEmail: studentEmail, parentEmail: parentEmail });
        setloadedData(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const setSent = async (sent) => {
    try {
      await AsyncStorage.setItem('sent', sent);
    } catch (error) {
      console.log(error);
    }
  };

  function checkDay(studentEmail, parentEmail, sent) {
    var date = new Date();
    if (date.getDay() == 5 && sent != 'true') {
      sendReport(studentEmail, parentEmail);
      setSent('true');
    } else if (date.getDay() != 5 && sent == 'true') {
      setSent('false');
    }
  }

  const load = navigation.addListener('didFocus', () => {
    getData();
  });

  const pressHandler = () => {
    navigation.navigate('Details');
  };

  const colorPicker = (dayTime) => {
    if (dayTime) {
      return '#14990f';
    }
    return '#1d0178';
  };

  const [logs, setLogs] = useState([]);

  //Sums the times during the day and times during the night
  var hrsDay = 0;
  var hrsNight = 0;

  if (logs.length == 0) {
    logs.forEach(function (obj) {
      if (obj.dayTime) {
        hrsDay += obj.minutes / 60;
        hrsDay += obj.hours;
      } else {
        hrsNight += obj.minutes / 60;
        hrsNight += obj.hours;
      }
    });
  }

  /*
  var reverse = [];

  if (logs.length != 0) {
    console.log(`Logs`);
    console.log(Log);
    var j = 0;
    for (var i = logs.length - 1; i <= 0; i++) {
      var entry = {
        month: logs[i].month,
        year: logs[i].year,
        day: logs[i].day,
        hours: logs[i].hours,
        minutes: logs[i].minutes,
        dayTime: logs[i].dayTime,
        key: j,
      };

      reverse.push(entry);
      j++;
    }
  }
  */

  //console.log(reverse);

  hrsDay = Math.trunc(hrsDay);
  hrsNight = Math.trunc(hrsNight);

  function convertTable(obj) {
    var table = '<table style="width: 100%">';
    table += '<tr><th>Date</th><th>Time</th><th>Time of Day</th></tr>';
    for (var i = 0; i < obj.length; i++) {
      table += '<tr>';
      table += `<td>${obj[i]['month']}/${obj[i]['day']}/${obj[i]['year']}</td>`;
      table += `<td>${obj[i]['hours']}H ${obj[i]['minutes']}M</td>`;
      if (obj[i]['dayTime']) {
        table += '<td>Daytime</td>';
      } else {
        table += '<td>Nighttime</td>';
      }
      table += '</tr>';
    }

    table += '</table>';
    return table;
  }

  function sendEmail(recipient) {
    console.log(recipient);
    var input = {
      r: recipient,
      hd: hrsDay,
      hn: hrsNight,
      table: convertTable(logs),
    };

    fetch(`https://driversed.pythonanywhere.com/api_1`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    }).then((response) => response.json());
  }

  function expLogs() {
    sendEmail(email.studentEmail);
    sendEmail(email.parentEmail);
  }

  function sendReport(studentEmail, parentEmail) {
    sendEmail(studentEmail);
    sendEmail(parentEmail);
  }

  return (
    <View style={globalStyles.container}>
      <TouchableOpacity onPress={expLogs}>
        <Text style={styles.exportTime}>Export</Text>
      </TouchableOpacity>

      <View style={styles.totalTime}>
        <View style={styles.times}>
          <Text style={styles.timeDay}>{hrsDay}</Text>
          <Text>DAY</Text>
        </View>
        <View style={styles.times}>
          <Text style={styles.timeNight}>{hrsNight}</Text>
          <Text>NIGHT</Text>
        </View>
      </View>

      <FlatList
        data={logs.reverse()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Details', item)}>
            <Card color={colorPicker(item.dayTime)}>
              <Text style={styles.textStyle}>
                {item.month}/{item.day}/{item.year}
              </Text>
              <Text style={styles.textStyle}>
                {item.hours}H {item.minutes}M
              </Text>
            </Card>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 15,
    color: 'white',
  },
  timeDay: {
    fontSize: 40,
    color: '#14990f',
  },
  timeNight: {
    fontSize: 40,
    color: '#1d0178',
  },
  totalTime: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 60,
    marginRight: 60,
  },
  times: {
    alignItems: 'center',
  },
  exportTime: {
    fontSize: 17,
    textAlign: 'right',
    fontWeight: 'bold',
  },
});
