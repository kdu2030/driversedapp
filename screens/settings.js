import React, { useState, Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Formik } from 'formik';
import AsyncStorage from '@react-native-community/async-storage';

export default function SettingsForm({ navigation }) {
  const [email, setEmail] = useState({ studentEmail: '', parentEmail: '' });

  const getData = async () => {
    try {
      var studentEmail = await AsyncStorage.getItem('studentEmail');
      var parentEmail = await AsyncStorage.getItem('parentEmail');
      if (studentEmail != null && parentEmail != null) {
        setEmail({ studentEmail: studentEmail, parentEmail: parentEmail });
        console.log(email);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const load = navigation.addListener('didFocus', () => {
    getData()
  })

  return (
    <View style={styles.container}>
      <Formik
        enableReinitialize
        initialValues={{
          studentEmail: email.studentEmail,
          parentEmail: email.parentEmail,
        }}
        onSubmit={async (values, actions) => {
          try {
            await AsyncStorage.setItem('studentEmail', values.studentEmail);
            await AsyncStorage.setItem('parentEmail', values.parentEmail);
            actions.resetForm()
          } catch (error) {
            console.log(error);
          }
        }}>
        {(props) => (
          <View>
            <View style={styles.text}>
              <Text>Student Email</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Student Email"
              onChangeText={props.handleChange('studentEmail')}
              value={props.values.studentEmail}
            />
            <View style={styles.text}>
              <Text>Parent Email</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Parent Email"
              onChangeText={props.handleChange('parentEmail')}
              value={props.values.parentEmail}
            />

            <View style={styles.button}>
              <Button
                title="Submit"
                color="green"
                onPress={props.handleSubmit}
              />
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
    margin: 10,
  },
  button: {
    marginTop: 10,
    alignItems: 'center',
  },
  text: {
    marginLeft: 10,
  },
});
