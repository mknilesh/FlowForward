// import React, {useState} from 'react';
// import { View, Text } from 'react-native';
// import Slider from '@react-native-community/slider';
// import DropDownPicker from 'react-native-dropdown-picker';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

// const Stack = createNativeStackNavigator();


// export default function Login({ navigation }) {

   
//     // const [expertiseOpen, setExpertiseOpen] = useState(false);
//     // const [expertise, setExpertise] = useState("Beginner");
//     // const [expertiseList, setExpertiseList] = useState([
//     //     {label: "Beginner", value: "Beginner"}, 
//     //     {label: "Intermediate", value: "Intermediate"}, 
//     //     {label: "Advanced", value: "Advanced"}
//     // ]);

//     // const [dayAvailability, setDayAvailability] = useState(1);
//     // const [workoutDuration, setWorkoutDuration] = useState(30);

//     return (
//         <NavigationContainer>
//             <Stack.Navigator initialRouteName = "Login" independent = "true">
//                 <Stack.Screen name = "Login" component = {Login} independent = "true">

//                 </Stack.Screen>
//             </Stack.Navigator>

//         </NavigationContainer>

//     );
// }

// HERE
// import React from 'react';
// import {
//   SafeAreaView,
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
// } from 'react-native';

// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import Ionicons from 'react-native-vector-icons/Ionicons';


// import CustomButton from '../components/CustomButton';
// import InputField from '../components/InputField';

// const LoginScreen = ({navigation}) => {
//   return (
//     <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
//       <View style={{paddingHorizontal: 25}}>
//         {/* <View style={{alignItems: 'center'}}>
//           <LoginSVG
//             height={300}
//             width={300}
//             style={{transform: [{rotate: '-5deg'}]}}
//           />
//         </View> */}

//         <Text
//           style={{
//             fontFamily: 'Roboto-Medium',
//             fontSize: 28,
//             fontWeight: '500',
//             color: '#333',
//             marginBottom: 30,
//           }}>
//           Login
//         </Text>

//         <InputField
//           label={'Email ID'}
//           icon={
//             <MaterialIcons
//             name="alternate-email"
//             size={20}
//             color="#666"
//             style={{marginRight: 5}}
//           />
//           }
//           keyboardType="email-address"
//         />

// <InputField
//           label={'Password'}
//           icon={
//             <Ionicons
//             name="ios-lock-closed-outline"
//             size={20}
//             color="#666"
//             style={{marginRight: 5}}
//           />
//           }
//           inputType="password"
//           fieldButtonLabel={"Forgot?"}
//           fieldButtonFunction={() => {}}
//         />
        
//         <CustomButton label={"Login"} onPress={() => {}} />

//         <Text style={{textAlign: 'center', color: '#666', marginBottom: 30}}>
//           Or, login with ...
//         </Text>

//         <View
//           style={{
//             flexDirection: 'row',
//             justifyContent: 'space-between',
//             marginBottom: 30,
//           }}>
          
//         </View>

//         <View
//           style={{
//             flexDirection: 'row',
//             justifyContent: 'center',
//             marginBottom: 30,
//           }}>
//           <Text>New to the app?</Text>
//           <TouchableOpacity onPress={() => navigation.navigate('Register')}>
//             <Text style={{color: '#AD40AF', fontWeight: '700'}}> Register</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default LoginScreen;
//HERE

import { View, Text,TextInput, StyleSheet, ActivityIndicator, Button } from 'react-native';
import React, {useState} from 'react';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import CustomButton from '../components/CustomButton';
// import { TextInput } from 'react-native-gesture-handler';

const Login = () => {
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;

    const signIn = async() => {
        setLoading(true);
        try{
            const response = await signInWithEmailAndPassword(auth, email, password);
            console.log(response);
            alert("Successfully Signed In!");
        } catch(error){
            console.log(error);
            alert("Failed to Sign In : " + error.log);
        } finally{
            setLoading(false);
        }
    }
    const signUp = async() => {
        setLoading(true);
        try{
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log(response);
            alert("Successfully Signed Up!");
        } catch(error){
            console.log(error);
            alert("Failed to Sign Up" + error.log);
        } finally{
            setLoading(false);
        }
    }

    return(
        <View style={styles.container} >
            <Text style={styles.flow}>FlowForward</Text>
            <TextInput secureTextEntry = {false} value = {email} style={styles.input} placeholder='Email' autoCapitalize='none'onChangeText={(text) => setEmail(text)}></TextInput>
            <TextInput secureTextEntry = {true} value = {password} style={styles.input} placeholder='Password' autoCapitalize='none'onChangeText={(text) => setPassword(text)}></TextInput>

            { loading ? (
            <ActivityIndicator size = "large" color = "#FFC0CB" />
            ) : (
                <>
                    <CustomButton label={"Login"} onPress={signIn} color = "#FFC0CB" style={styles.log} />
                    <CustomButton label={"Create Account"} onPress={signUp} color = "#FFC0CB"  style={styles.log}/>
                </>
            )}
        
            

        </View>

    );
};
export default Login;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        flex:1,
        justifyContent: 'center'
    },
    input: {
        marginVertical: 4,
        height : 50,
        borderWidth : 1,
        borderRadius: 4,
        padding : 10,
        backgroundColor: 'fff'

    },
    log: {
        marginVertical: 4,
        height : 100,
        borderWidth : 1,
        borderRadius: 4,
        padding : 10,
        backgroundColor: 'fff'

    },
    flow: {
        color: '#000000',
        font: "Serif",
        fontSize: 50,
        fontWeight: 'bold',
        justifyContent: 'center',
        height : 100,
        padding : 10,
        backgroundColor: 'fff'

    }
});