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

    const signIn = async () => {
        setLoading(true);
        try {
          const response = await signInWithEmailAndPassword(auth, email, password);
          console.log(response);
          alert("Successfully Signed In!");
        } catch (error) {
          console.error(error);
          alert(`Failed to Sign In: ${error.message}`);
        } finally {
          setLoading(false);
        }
      }
      
      const signUp = async () => {
        setLoading(true);
        try {
          const response = await createUserWithEmailAndPassword(auth, email, password);
          console.log(response);
          alert("Successfully Signed Up!");
        } catch (error) {
          console.error(error);
          alert(`Failed to Sign Up: ${error.message}`);
        } finally {
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