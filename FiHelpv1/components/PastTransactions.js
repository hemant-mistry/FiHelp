import { firebase } from '@react-native-firebase/firestore';
import {useFocusEffect, useIsFocused, useNavigation} from '@react-navigation/native';
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
  Button
} from 'react-native';

import LottieView from "lottie-react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';


//Loading screen till data fetching
const LoadingScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#000000" }}>
    <LottieView
    style={{
      width:200,
      height:200
    }}
      source={require('../assets/animations/LoadingAnimation.json')}
      autoPlay
      loop
    />
  </View>
);



const PastTransactions = () => {
  //Initializing the navigation
  const navigation = useNavigation();
  //Handling the loading states
  const [isLoading, setIsLoading] = useState(true);
  //Handling the transaction details
  const [transactionDetails, setTransactionDetails] = useState([])

  //Handling button clicks
  const handleNavButtonClick = (screenName) => {
    navigation.navigate(screenName);
  };

  //Handling delete transaction interaction
  const handleDeleteTransaction = async(transactionId) => {
    try{

      //Update the Firestore database to remove the transaction
      await firebase.firestore().collection('Transaction').doc(transactionId).delete();

      //Updating the local state to remove the deleted transactions
      setTransactionDetails((prevTransactions)=>
        prevTransactions.filter((transaction)=>transaction.id!==transactionId)
      );

    } catch(error){
      console.error('Error deleting transaction:', error)
      
  }
  }

  
  useEffect(() => {
    const loadData = async () => {
      // Simulate loading data
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    };

    loadData();
  }, []);

 

  useFocusEffect(()=>{
    const fetchTransactionDetails = async () =>{
      try{
        const snapshot = await firebase.firestore().collection('Transaction').get();
        const data =  snapshot.docs.map((doc)=>({id:doc.id,...doc.data()}));
        setTransactionDetails(data)
        setIsLoading(false)
      }
      catch(error){
        console.error('Error fetching data from Firestore:',error)
        setIsLoading(false)
      }
    }

    fetchTransactionDetails();
  }, )

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.PastTransactionContainer}>
    <ScrollView style={styles.PastTransactionContainer}>
    
      <View style={styles.HeadingContainer}>
        <View style={styles.AppTitle}>
          <Image
            source={require('../assets/images/FiHelpAppLogo.png')} // Update the path to your image
            style={styles.LogoImage}
          />
          <Text style={styles.MainTitle}>FiHelp</Text>
        </View>
      </View>
      <Text style={styles.AppSubtitle}>Past Transactions</Text>

    {/* Past transactions card*/}
    {transactionDetails.map((transaction, index) => (
          <View key={index} style={styles.PastTransactionsContainer}>
            <View style={styles.PastTransactionsCard}>
            <View style={styles.deleteButtonContainer}>
                <TouchableOpacity onPress={() => handleDeleteTransaction(transaction.id)}>
                  <Image
                    source={require('../assets/images/DeleteIcon.png')} // Update the path to your image
                    style={styles.deleteButtonIcon}
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.PastTransactionCardTitle}>Transaction Detail:</Text>
              <Text style={styles.PastTransactionCardDesc}>{transaction.TransactionDetail}</Text>
              <Text style={styles.PastTransactionCardAmount}>₹{transaction.Amount}</Text>
             
            </View>
          </View>
        ))}

      

    
    </ScrollView>

     {/* Add new transactions UI */}
     <TouchableOpacity onPress={() => handleNavButtonClick('AddTransaction')}>
      <View style={styles.addTransactionContainer}>
      <View style={styles.addTransaction}>
      <Text style={styles.addTransactionText}>+</Text>
      </View>
      </View>
      </TouchableOpacity>
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
            source={require('../assets/images/AnalysisActive.png')} // Update the path to your image
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
};
const styles = StyleSheet.create({
  PastTransactionContainer: {
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
  AppSubtitle: {
    color: 'white',
    fontSize: 24,
    textAlign: 'left',
    paddingLeft: 20,
    marginTop: 20,
    fontWeight: 'bold',
  },
  PastTransactionsContainer: {
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  PastTransactionsCard: {
    backgroundColor: '#121212',
    width:"80%",
    padding: 20,
    borderRadius: 24,
  },

  PastTransactionCardTitle: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom:5
    
  },
  PastTransactionCardDesc: {
    color: 'white',
    fontSize: 12,
    marginBottom:5
  },
  PastTransactionCardAmount: {
    color: 'white',
    fontSize: 18,
  },

  addTransactionContainer: {
    marginBottom:"10%",
    alignItems: 'center', // Align components vertically
    backgroundColor:"transparent"
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
  },
  deleteButtonContainer: {
    position: 'absolute',
    top: 20, // Adjust the top position as needed
    right: 10, // Adjust the right position as needed
  },
  deleteButtonIcon: {
    width: 14, // Adjust the width as needed
    height: 14, // Adjust the height as needed
    tintColor: 'red', // Adjust the color as needed
  },
});

export default PastTransactions;
