import * as React from 'react';
import { View, Text } from 'react-native';

export default function WorkoutsScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text
                onPress={() => navigation.navigate('Dashboard')}
                style={{ fontSize: 26, fontWeight: 'bold' }}>Workouts Screen</Text>
        </View>
    );
}