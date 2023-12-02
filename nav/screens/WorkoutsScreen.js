import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { expertise } from './SettingsScreen';
import CustomButton from '../components/CustomButton';
import { menstrualPhase } from './Dashboard';

export default function WorkoutsScreen({ navigation }) {
    
    const [exercises, setExercises] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [refreshData, setRefreshData] = useState(false);

    const resetBtn = () => {
        setRefreshData(!refreshData)
    };

    apiUrl = "https://api.api-ninjas.com/v1/exercises"

    useEffect(() => {
        switch(expertise) {
            case "Beginner": 
                apiUrl = apiUrl + "?difficulty=beginner"
                break;
            case "Intermediate": 
                apiUrl = apiUrl + "?difficulty=intermediate"
                break;
            case "Advanced": 
                apiUrl = apiUrl + "?difficulty=expert"
                break;
        }
        switch(menstrualPhase) {
            case 'Menstrual Phase':
                apiUrl += '&type=stretching';
              break;
            case 'Follicular Phase':
                apiUrl += '&type=strength';
              break;
            case 'Ovulation Phase':
                apiUrl += '&type=plyometrics';
              break;
            case 'Luteal Phase':
                apiUrl += '&type=cardio';
              break;
            default:
                apiUrl += ''; 
          }
        console.log(menstrualPhase)
        console.log(apiUrl)
        fetch(apiUrl, {
            headers: {
                'X-Api-Key': 'dffAHMAuSZsm8iEPJ6wNog==W7WZH2da8wB81H4N'
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data && Array.isArray(data)) {
                    setExercises(data);
                } else {
                    console.error('Unexpected data format:', data);
                }
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setIsLoading(false);
            });
    }, [refreshData]);

    if (isLoading) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Loading exercises...</Text>
            </View>
        );
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <CustomButton label={"Refresh"} onPress={resetBtn}></CustomButton>
            <FlatList
                data={exercises}
                keyExtractor={item => item.id ? item.id.toString() : Math.random().toString()}
                renderItem={({ item }) => {
                let boxColor;
                switch(item.difficulty) {
                    case "beginner":
                        boxColor = "#FFC0CB";
                        break;
                    case "intermediate":
                        boxColor = "#fc84a4";
                        break;
                    case "expert":
                        boxColor = "#f85884";
                        break;
                    default:
                        boxColor = "white";
                }
        
                return (
                    <View style={{ paddingLeft: 30, paddingRight:30, paddingTop:10, paddingBottom:10, backgroundColor: boxColor, marginVertical: 5, marginHorizontal: 20, borderRadius: 5 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', borderBottomWidth: 1, paddingBottom: 5 }}>
                        {item.name || "No Name"}
                    </Text>
                    <Text>Muscle Group: {item.muscle || "Unknown"}</Text>
                    <Text>Difficulty: {item.difficulty || "Unknown"}</Text>
                    <Text>Type: {item.type || "Unknown"}</Text>
                    </View>
                );
                }}
            />
        </View>
      );
}