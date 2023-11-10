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
  const [menstrualPhaseText, setMenstrualPhaseText] = useState('');
  const [flowText, setFlowText] = useState('');

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
        setMenstrualPhaseText('Menstruation is commonly known as a period. When you menstruate, your uterus lining sheds and flows out of your vagina. Your period contains blood, mucus and some cells from the lining of your uterus. The average length of a period is three to seven days.')
      } 
      // Follicular Phase
      else if (today < startOvulationPhase) {
        setMenstrualPhase('Follicular Phase');
        setMenstrualPhaseText('The follicular phase starts on the first day of your period and lasts for 13 to 14 days, ending in ovulation. The pituitary gland in the brain releases a hormone to stimulate the production of follicles on the surface of an ovary. This can happen from day 10 of your cycle. During this phase, your uterus lining also thickens in preparation for pregnancy.');
      } 
      // Ovulation Phase
      else if (today >= startOvulationPhase && today <= endOvulationPhase) {
        setMenstrualPhase('Ovulation Phase');
        setMenstrualPhaseText('Ovulation is when a mature egg is released from an ovary and moves along a fallopian tube towards your uterus. This usually happens once each month, about two weeks before your next period. Ovulation can last from 16 to 32 hours.');
      } 
      // Luteal Phase
      else {
        setMenstrualPhase('Luteal Phase');
        setMenstrualPhaseText('After ovulation, cells in the ovary (the corpus luteum), release progesterone and a small amount of oestrogen. This causes the lining of the uterus to thicken in preparation for pregnancy.');
      }

      // Flow
      console.log(startPeriod.getDate());
      console.log(today.getDate());
      if (today.getDate() === startPeriod.getDate() + 1 || (today.getDate() === startPeriod.getDate() + 2)  ){
        setFlowText('Heavy');
      } else if (today.getDate() === startPeriod.getDate() + 3 || today.getDate() === startPeriod.getDate() + 4) {
        setFlowText('Medium');
      } else if (today.getDate() === startPeriod.getDate() + 5) {
        setFlowText('Light');
      } else {
        setFlowText('N/A');
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
          <Text style={styles.selectedDate}>
            Flow: {flowText}
          </Text>
          <Text style={styles.phaseText}>
          {(menstrualPhaseText)}
          </Text>
          <Text style={styles.phaseText}>
            Please click *here* for more information.
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
    marginLeft: 5,
    fontFamily: 'Montserrat-Bold',
    color: '#ff6b81',
  },
  workoutText: {
    fontSize: 16,
    marginTop: 10,
    fontFamily: 'Montserrat-Bold',
    color: '#2d4150',
  },
  phaseText: {
    fontSize: 12,
    marginTop: 5,
    marginLeft: 5,
    fontFamily: 'Montserrat-Bold',
    color: '#000000',
  },
});
