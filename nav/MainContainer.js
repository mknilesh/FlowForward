import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Screens
import Dashboard from './screens/Dashboard';
import WorkoutsScreen from './screens/WorkoutsScreen';
import SettingsScreen from './screens/SettingsScreen';
import Login from './screens/Login';

//Screen names
const dashboardName = "Dashboard";
const workoutsName = "Workouts";
const settingsName = "Settings";
const loginName = "Login";

const Tab = createBottomTabNavigator();

function MainContainer() {
  return (
    //<NavigationContainer>
      <Tab.Navigator
        initialRouteName={loginName}
        screenOptions={{
            tabBarActiveTintColor: '#ff80a0',
            tabBarInactiveTintColor: 'grey',
            tabBarLabelStyle: { paddingBottom: 10, fontSize: 10 },
            tabBarStyle: { padding: 10, height: 70}
        }}>
        <Tab.Screen title={"Dashboard"} name={dashboardName} component={Dashboard}/>
        <Tab.Screen title={"Workouts"} name={workoutsName} component={WorkoutsScreen} />
        <Tab.Screen title={"Settings"} name={settingsName} component={SettingsScreen} />
      
      </Tab.Navigator>
    //</NavigationContainer>
  );
}

export default MainContainer;