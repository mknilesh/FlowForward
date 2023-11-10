import React, {useState} from 'react';
import { View, Text } from 'react-native';
import Slider from '@react-native-community/slider';
import DropDownPicker from 'react-native-dropdown-picker';

export var expertise = "Beginner"

export default function SettingsScreen({ navigation }) {
    const [expertiseOpen, setExpertiseOpen] = useState(false);
    [expertise, setExpertise] = useState("Beginner");
    const [expertiseList, setExpertiseList] = useState([
        {label: "Beginner", value: "Beginner"}, 
        {label: "Intermediate", value: "Intermediate"}, 
        {label: "Advanced", value: "Advanced"}
    ]);

    const [dayAvailability, setDayAvailability] = useState(1);
    const [workoutDuration, setWorkoutDuration] = useState(30);
    
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 20, alignSelf: 'flex-start', paddingLeft: '5%', paddingBottom: 0}}>
                Current workout expertise: {expertise}
            </Text>
            <DropDownPicker
                containerStyle={{
                    paddingTop: '2%'
                }}            
                style={{
                    width: '80%', alignSelf: 'center', borderColor: "#ff80a0"
                }}
                dropDownContainerStyle={{
                    width: '80%', alignSelf: 'center', borderColor: "#ff80a0"
                }}
                textStyle={{
                    fontSize: 18
                }}
                open={expertiseOpen}
                value={expertise}
                items={expertiseList}
                setOpen={setExpertiseOpen}
                setValue={setExpertise}
                setItems={setExpertiseList}
            />
            <Text style={{ fontSize: 20, alignSelf: 'flex-start', paddingLeft: '5%', paddingTop: '10%'}}>
                Number of days available per week: {dayAvailability}
            </Text>
            <Slider
                style={{width: '80%', height: 40, paddingTop: '2%'}}
                step={1}
                minimumValue={1}
                maximumValue={7}
                value={dayAvailability}
                onValueChange={dayAvailability => setDayAvailability(dayAvailability)}
                minimumTrackTintColor="#ffcddc"
                maximumTrackTintColor="#d3d3d3"
                thumbTintColor="#ff80a0"
            />
            <Text style={{ fontSize: 20, alignSelf: 'flex-start', paddingLeft: '5%', paddingTop: '10%'}}>
                Desired workout duration (in min): {workoutDuration}
            </Text>
            <Slider
                style={{width: '80%', height: 40, paddingTop: '2%'}}
                step={15}
                minimumValue={30}
                maximumValue={120}
                value={workoutDuration}
                onValueChange={workoutDuration => setWorkoutDuration(workoutDuration)}
                minimumTrackTintColor="#ffcddc"
                maximumTrackTintColor="#d3d3d3"
                thumbTintColor="#ff80a0"
            />
            
        </View>
    );
}