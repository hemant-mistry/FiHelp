import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StatusBar,
  useColorScheme,
  ScrollView,
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
const SignUpPage = ({}) => {

  const navigation = useNavigation(); // Initialize navigation
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const createUser = () =>{
    auth()
    .createUserWithEmailAndPassword(
      email,
      password
    )
    .then(()=>{
      navigation.navigate('HomePage');
    })
    .catch(error=>{
      if(error.code === 'auth/email-already-in-use'){
        Alert.alert("That email addresss is already in use!")
        console.log('That email address is already in use!');
      }

      if(error.code == 'auth/invalid-email'){
        Alert.alert("That email address is invalid!")
        console.log('That email address is invalid!');
      }

      console.log(error);
    });
  }

  return (
    <View style={styles.maincontainer}>
      <Image
        source={require('../assets/images/signup.png')} // Update the path to your image
        style={styles.LoginPageImage}
      />
      <View style={styles.inputcontainer}>
        <Text style={styles.maintitle}>Email: </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          keyboardType="default"
          value={email}
          onChangeText={txt=>setEmail(txt)}
        />
        <Text style={styles.maintitle}>Password: </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          keyboardType="default"
          value={password}
          onChangeText={txt=>setPassword(txt)}
        />
        <Pressable style={styles.submitButton} onPress={()=>{createUser();}}>
          <Text style={styles.submitButtonText}>Sign Up</Text>
        </Pressable>
        <Pressable onPress={()=>{
           navigation.navigate('Login');
        }}>
          <Text style={styles.clickheretext}>
            Already have an account? Click here to login
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: '#000000',
    paddingTop: 10,
  },
  maintitle: {
    color: 'white',
  },
  LoginPageImage: {
    marginTop: 5,
    height: '30%',
    width: '60%',
    alignSelf:"center"
  },
  input: {
    height: 35,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: 'white',
    borderColor: '#424549',
    backgroundColor: '#424549',
    borderRadius: 14,
  },
  submitButton: {
    backgroundColor: '#7289DA',
    height: 28,
    width: 77,
    textAlign: 'center',
    marginTop: 10,
    borderRadius: 10,
    alignSelf: 'center', // Center the button horizontally
  },
  submitButtonText: {
    textAlign: 'center',
    color: 'white',
    marginTop: 5,
  },
  inputcontainer: {
    padding: 30,
  },
  clickheretext:{
    marginTop:10,
    fontSize:12,
    textAlign:'center',
    color:"white"
  }
});

export default SignUpPage;
