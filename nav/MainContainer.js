import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Icon from 'react-native-vector-icons/Ionicons';

// Screens
import Dashboard from './screens/Dashboard';
import WorkoutsScreen from './screens/WorkoutsScreen';
import SettingsScreen from './screens/SettingsScreen';

//Screen names
const dashboardName = "Dashboard";
const workoutsName = "Workouts";
const settingsName = "Settings";

const Tab = createBottomTabNavigator();

function MainContainer() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={dashboardName}
        // screenOptions={({ route }) => ({
        //   tabBarIcon: ({ focused, color, size }) => {
        //     let iconName;
        //     let rn = route.name;

        //     if (rn === dashboardName) {
        //       iconName = focused ? 'home' : 'home-outline';

        //     } else if (rn === workoutsName) {
        //       iconName = focused ? 'list' : 'list-outline';

        //     } else if (rn === settingsName) {
        //       iconName = focused ? 'settings' : 'settings-outline';
        //     }

        //     return <Icon name={iconName} size={size} color={color} />;
        //   },
        // })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'grey',
          labelStyle: { paddingBottom: 10, fontSize: 10 },
          style: { padding: 10, height: 70}
        }}>

        <Tab.Screen name={dashboardName} component={Dashboard} />
        <Tab.Screen name={workoutsName} component={WorkoutsScreen} />
        <Tab.Screen name={settingsName} component={SettingsScreen} />

      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MainContainer;