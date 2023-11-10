import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Button } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { FIRESTORE_DB } from '../../FirebaseConfig';
import { addDoc, collection } from 'firebase/firestore';

export default function Dashboard({ navigation }) {
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
          <Button title="Submit Dates" onPress={onSubmit} />
          <Text style={styles.selectedDate}>
            Your phase for today: {(menstrualPhase)}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
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
