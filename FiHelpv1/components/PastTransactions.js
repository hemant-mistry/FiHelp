import { firebase } from '@react-native-firebase/firestore';
import {useIsFocused, useNavigation} from '@react-navigation/native';
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
  ImageBackground
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const PastTransactions = () => {
  const navigation = useNavigation();
  const [transactionDetails, setTransactionDetails] = useState([])
  const handleNavButtonClick = (screenName) => {
    navigation.navigate(screenName);
  };


  useEffect(()=>{
    console.log(transactionDetails);

    const fetchTransactionDetails = async () =>{
      try{
        const snapshot = await firebase.firestore().collection('Transaction').get();
        const data =  snapshot.docs.map((doc)=>({id:doc.id,...doc.data()}));
        setTransactionDetails(data)
      }
      catch(error){
        console.error('Error fetching data from Firestore:',error)
      }
    }

    fetchTransactionDetails();
  }, )

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
    height:24
  }
});

export default PastTransactions;
