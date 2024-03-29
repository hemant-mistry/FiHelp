import {useNavigation} from '@react-navigation/native';
import {firebase} from '@react-native-firebase/firestore';
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
  ImageBackground,
  TextInput,
  Keyboard
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
const AddTransaction = () =>{
  const databaseConnection = firebase.firestore().collection('Transaction')
  const navigation = useNavigation();
  const handleNavButtonClick = (screenName) => {
    navigation.navigate(screenName);
  };

  const [transactionDetail, setTransactionDetail] = useState('')
  const [amount, setAmount] = useState('')
  const [month, setMonth] = useState('');
  const [userEmail, setUserEmail] = useState('');
  useEffect(() => {
    // Get current month when the component mounts
    const currentDate = new Date();
    const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
    setMonth(currentMonth);
  }, []);

  const setTransaction = () => {
    const data = {
      TransactionDetail: transactionDetail,
      Amount: amount,
      Month: month, // Include the month in the data object
      useremail: userEmail
    };

    databaseConnection
      .add(data)
      .then(() => {
        setAmount('');
        setTransactionDetail('');
        Keyboard.dismiss();
      });
  };

  //Fetch the user email of the logged in user from firebase
useEffect(() => {
  const fetchUserEmail = async () => {
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      setUserEmail(currentUser.email);
    }
  };

  fetchUserEmail();
}, []);

    return(
        <View style={styles.addTransationContainer}>
        
        
        <View style={styles.HeadingContainer}>
        <View style={styles.AppTitle}>
          <Image
            source={require('../assets/images/FiHelpAppLogo.png')} // Update the path to your image
            style={styles.LogoImage}
          />
          <Text style={styles.MainTitle}>FiHelp</Text>
        </View>
      </View>
      <Text style={styles.AppSubtitle}>Add Transactions</Text>
<View style={styles.AddTransactionsContainer}>
      <View style={styles.AddTransactionForm}>
        <View style={styles.AddTransactionDetail}>
            <Text style={styles.DetailText}>Transaction Detail:</Text>
            <TextInput
                style={styles.inputTransactionDetail}
                placeholder="Enter transaction detail"
                keyboardType="default"
                onChangeText={text=>setTransactionDetail(text)}
                value={transactionDetail}
                
              />
        </View>
        <View style={styles.AddTransactionAmount}>
        <Text style={styles.AmountText}>Transaction Amount:</Text>
        <TextInput
                style={styles.inputTransactionAmount}
                placeholder="Enter transaction amount"
                keyboardType="default"
                onChangeText={text=>setAmount(text)}
                value={amount}
                
              />
        </View>
        <Pressable style={styles.submitButton} onPress={setTransaction}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </Pressable>
      </View>
      </View>
  {/*Footer navbar UI*/}
    {/* Add new transactions UI */}
    <View style={styles.addTransactionContainer}>
      <View style={styles.addTransaction}>
      <Text style={styles.addTransactionText}>+</Text>
      </View>
      </View>

      <ImageBackground    
        source={require('../assets/images/Navbar.png')} // Update the path to your image
        style={styles.footerNavbar}
        resizeMode="cover" // You can change the resizeMode as needed
      >

      <TouchableOpacity onPress={() => handleNavButtonClick('HomePage')}>
        <View style={styles.NavLink}>
        
        <Image
            source={require('../assets/images/HomeIconInActive.png')} // Update the path to your image
            style={styles.NavLinkIcon}
          />
        </View>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => handleNavButtonClick('PastTransactions')}>
        <View style={styles.NavLink}>
        
        <Image
            source={require('../assets/images/AnalysisInActive.png')} // Update the path to your image
            style={styles.NavLinkIcon}
          />
        </View>
        </TouchableOpacity>

        
        <TouchableOpacity onPress={() => handleNavButtonClick('AddBudget')}>
        <View style={styles.NavLink}>
        
        <Image
            source={require('../assets/images/WalletInActive.png')} // Update the path to your image
            style={styles.NavLinkIcon}
          />
        </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleNavButtonClick('UserProfile')}>
        <View style={styles.NavLink}>
        
        <Image
            source={require('../assets/images/UserProfileInActive.png')} // Update the path to your image
            style={styles.NavLinkIcon}
          />
        </View>
        </TouchableOpacity>

    </ImageBackground>
      </View>
    );
}

const styles = StyleSheet.create({
    addTransationContainer: {
    backgroundColor: 'black',
    flex: 1,
  },
  HeadingContainer: {
    backgroundColor: 'black',
    alignItems: 'center', // Center content horizontally
  },
  
  AppTitle: {
    flexDirection: 'row', // Arrange children in a row (horizontal)
    alignItems: 'center', // Align items in the center vertically
  },
  LogoImage: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  MainTitle: {
    color: 'white',
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'InterDisplay-SemiBoldItalic',
  },
  AppSubtitle:{
    color: 'white',
    fontSize: 24,
    textAlign: 'left',
    paddingLeft: 20,
    marginTop: 20,
    fontWeight: 'bold',
  },
  AddTransactionForm:{
    backgroundColor:"#121212",
    padding:20,
    borderRadius:24,
    width:"80%"
  },
  addTransactionContainer: {
    marginTop:"45%",
    alignItems: 'center', // Align components vertically
  },
  addTransaction: {
    backgroundColor: "#3AC586",
    width: 48,
    height: 48,
    borderRadius: 40,
    justifyContent:"center",
    alignItems:"center"
  },
  addTransactionText: {
    color: "white",
    fontSize:20
  },
  inputTransactionAmount: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: 'white',
    borderColor: '#282829',
    backgroundColor: '#282829',
    borderRadius: 14,
    
  },
  inputTransactionDetail: {
    height: 70,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: 'white',
    borderColor: '#282829',
    backgroundColor: '#282829',
    borderRadius: 14,
    
  },
  DetailText:{
    color:"white",
    fontSize:15,
    marginBottom:5
  },
  AmountText:{
    color:"white",
    fontSize:15,
    marginBottom:5
  },
  AddTransactionsContainer:{
    justifyContent:"center",
    alignItems:"center",
    marginTop:70
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
    fontWeight: 'bold',
  },
  footerNavbar:{
    padding:20,
    flexDirection:"row",
    justifyContent:"space-between",
    position:'absolute',
    bottom:0,
    left:0,
    right:0,
    
  },
  NavLinkIcon:{
    height:18,
    width:18
  }
});


export default AddTransaction;