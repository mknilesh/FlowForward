
import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity,Keyboard, Dimensions, Button } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
// import {firebase} from '../../FirebaseConfig';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/analytics';
import { getAnalytics, setUserId } from "firebase/analytics";
import {addDoc, collection} from 'firebase/firestore';


export default function Dashboard({ navigation }) {
 
  var user = firebase.auth().currentUser;
  var name, email, photoUrl, uid, emailVerified;

  if (user != null) {
    name = user.displayName;
    email = user.email;
    photoUrl = user.photoURL;
    emailVerified = user.emailVerified;
    uid = user.uid;  
 }


  const [addData, setAddData] = useState('');
  const addFirestore = (periodDates) => {
    const todoRef = firebase.firestore().collection('userDates/'+user.uid+'/' +periodDates);
        if (true){
        const timestamp = firebase.firestore.FieldValue.serverTimestamp();
        const data = {
          heading: periodDates,
          createdAt: timestamp

        };
        todoRef
        .add(data)
        .then(() => {
          setAddData('');
          Keyboard.dismiss()
        })
        .catch((error) => {
          alert(error);
        })
      }
    }

  const [selectedDate, setSelectedDate] = useState('');
  const [periodDates, setPeriodDates] = useState([]);
  const [menstrualPhase, setMenstrualPhase] = useState('');

  const updateDates = (day) => {
    const startPeriod = new Date(day.dateString);
    const newPeriodDates = [startPeriod.toISOString().split('T')[0]];

    for (let i = 1; i <= 4; i++) {
      let nextDate = new Date(startPeriod);
      nextDate.setDate(startPeriod.getDate() + i);
      newPeriodDates.push(nextDate.toISOString().split('T')[0]);
    }

    setPeriodDates(newPeriodDates);
    setSelectedDate(day.dateString);
  };

  useEffect(() => {
    if (periodDates.length > 0) {
      const today = new Date();
      const startPeriod = new Date(periodDates[0]);
      const endPeriod = new Date(periodDates[periodDates.length - 1]);
      const ovulationDay = new Date(startPeriod);
      ovulationDay.setDate(startPeriod.getDate() + 14);
      
      // Assuming the ovulation phase is about 4 days
      const startOvulationPhase = new Date(ovulationDay);
      startOvulationPhase.setDate(ovulationDay.getDate() - 2);
      const endOvulationPhase = new Date(ovulationDay);
      endOvulationPhase.setDate(ovulationDay.getDate() + 2);
  
      // Menstrual Phase
      if (today >= startPeriod && today <= endPeriod) {
        setMenstrualPhase('Menstrual Phase');
      } 
      // Follicular Phase
      else if (today < startOvulationPhase) {
        setMenstrualPhase('Follicular Phase');
      } 
      // Ovulation Phase
      else if (today >= startOvulationPhase && today <= endOvulationPhase) {
        setMenstrualPhase('Ovulation Phase');
      } 
      // Luteal Phase
      else {
        setMenstrualPhase('Luteal Phase');
      }
    }
  }, [periodDates]);
  
  const onSubmit = async () => {
      console.log(periodDates);
      

  };

  const markedDates = periodDates.reduce((acc, date) => {
    acc[date] = { selected: true, selectedColor: '#ff8080' };
    return acc;
  }, {});

  // Get the screen dimensions
  const { width, height } = Dimensions.get('window');

  return (
    <View style={styles.container}>
      {/* Wrap the Calendar with a View and apply the calendarWrapper style to control the height */}
      <View style={styles.calendarWrapper}>
        <Calendar
          style={styles.calendar}
          theme={{
            backgroundColor: '#ff6b81',
            calendarBackground: '#ffffff',
            textSectionTitleColor: '#ff6b81',
            selectedDayBackgroundColor: '#ff80a0',
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#ff6b81',
            dayTextColor: '#2d4150',
            textDisabledColor: '#808080',
            textDayFontFamily: 'Montserrat-Bold',
            textMonthFontFamily: 'Montserrat-Bold',
            textDayHeaderFontFamily: 'Montserrat-Bold',
          }}
          onDayPress={(day) => updateDates(day)}
          markedDates={markedDates}
        />
      </View>

      {selectedDate && (
        <View>
          <Button title="Submit Dates" onPress={() => { onSubmit(); addFirestore(periodDates); }  } />
          <Text style={styles.selectedDate}>
            Your phase for today: {(menstrualPhase)}
          </Text>
        </View>
      )}
   
    
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer : {
    flexDirection: 'row',
    height : 80,
    marginLeft:10,
    marginRight:10,
  },
  input : {
    height : 48,
    borderRadius : 5,
    overFlow: 'hidden',
    backgroundColor: 'white',
    paddingLeft: 16,
    flex:1,
    marginRight:5
  },
  button : {
    height : 47,
    borderRadius : 5,
    overFlow: 'hidden',
    backgroundColor: '#FFC0CB',
    width: 80,
    alignItem:'center',
    justifyContent: 'center'
  },
  buttonText : {
    color: 'ffffff',
    fontSize: 20
  },

  container: {
    flex: 1,
    alignItems: 'center',
  },
  calendarWrapper: {
    height: Dimensions.get('window').height/2,
    width: Dimensions.get('window').width - 10,
  },
  calendar: {
    borderWidth: 1,
    borderColor: '#ff6b81',
  },
  selectedDate: {
    fontSize: 18,
    marginTop: 20,
    fontFamily: 'Montserrat-Bold',
    color: '#ff6b81',
  },
  workoutText: {
    fontSize: 16,
    marginTop: 10,
    fontFamily: 'Montserrat-Bold',
    color: '#2d4150',
  },
});