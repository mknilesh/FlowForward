import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';

export default function WorkoutsScreen({ navigation }) {
    const [exercises, setExercises] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('https://api.api-ninjas.com/v1/exercises', {
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
    }, []);

    if (isLoading) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Loading exercises...</Text>
            </View>
        );
    }
    
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
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
                <View style={{ padding: 10, backgroundColor: boxColor, marginVertical: 5, borderRadius: 5 }}>
                  <Text style={{ fontSize: 18, fontWeight: 'bold', borderBottomWidth: 1, paddingBottom: 5 }}>
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