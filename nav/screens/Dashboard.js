import * as React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Calendar } from 'react-native-calendars';

export default function Dashboard({ navigation }) {
  const [selectedDate, setSelectedDate] = React.useState(new Date().toISOString().split('T')[0]);

  const onDayPress = (day) => {
    // Handle the selected date here
    setSelectedDate(day.dateString);
  };

  const reformatDate = (dateString) => {
    const date = new Date(dateString);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${month}/${day}`;
  };

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
          onDayPress={onDayPress}
          markedDates={{
            [selectedDate]: { selected: true, selectedColor: '#ff80a0' },
          }}
        />
      </View>

      {selectedDate && (
        <View>
          <Text style={styles.selectedDate}>
            Your phase for {reformatDate(selectedDate)} --insert phase here--
          </Text>

          <Text style={styles.workoutText}>
            Workout Routine: --insert workout routine here--
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
