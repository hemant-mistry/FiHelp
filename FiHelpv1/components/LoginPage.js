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
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginPage = ({}) => {
  const navigation = useNavigation(); // Initialize navigation
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    // Check if user is already logged in
    const checkLoggedIn = async () => {
      try {
        const userCredentials = await AsyncStorage.getItem('userCredentials');
        if (userCredentials) {
          const { email, password } = JSON.parse(userCredentials);
          signIn(email, password);
        }
      } catch (error) {
        console.error('Error reading user credentials from AsyncStorage:', error);
      }
    };
    checkLoggedIn();
  }, []);

  const signIn = async (email, password) => {
    try {
      const response = await auth().signInWithEmailAndPassword(email, password);
      if (response) {
        // Store user credentials in AsyncStorage
        await AsyncStorage.setItem('userCredentials', JSON.stringify({ email, password }));
        navigation.navigate('HomePage');
      }
    } catch (error) {
      Alert.alert('Login Failed', 'Invalid email or password. Please try again.');
      console.error('Error signing in:', error);
    }
  };

  const userSignin = () => {
    signIn(email, password);
  };

  return (
    <View style={styles.maincontainer}>
      <Image
        source={require('../assets/images/login.png')} // Update the path to your image
        style={styles.LoginPageImage}
      />
      <View style={styles.inputcontainer}>
        <Text style={styles.maintitle}>Email: </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          keyboardType="default"
          value={email}
          onChangeText={txt=> setEmail(txt)}
        />
        <Text style={styles.maintitle}>Password: </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          keyboardType="default"
          value={password}
          onChangeText={txt => setPassword(txt)}
        />
        <Pressable style={styles.submitButton} onPress={userSignin}>
          <Text style={styles.submitButtonText}>Login</Text>
        </Pressable>
        <Pressable onPress={()=>{
          navigation.navigate('SignUpPage');
        }}>
          <Text style={styles.clickheretext}>
            New here? Click here to create an account!
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
    marginTop: 40,
    height: '40%',
    width: '100%',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: 'white',
    borderColor: '#424549',
    backgroundColor: '#424549',
    borderRadius: 14,
  },
  submitButton: {
    backgroundColor: '#3AC586',
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

export default LoginPage;
