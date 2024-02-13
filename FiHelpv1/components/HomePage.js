import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, Image, ImageBackground} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { firebase } from '@react-native-firebase/firestore';
import PushNotification  from 'react-native-push-notification';
import LottieView from "lottie-react-native";
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const HomePage = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true); // Track loading state
  const [percentage, setPrecentage] = useState(0);
  const [availableBalance, setAvailableBalance] = useState('');
  const [budgetData, setBudgetData] = useState([]);
  const [progressBarColor, setProgressBarColor] = useState('#3AC586')


    // Get the current month
    const currentMonth = new Date().getMonth() + 1;
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const currentMonthName = monthNames[currentMonth - 1];
  
    console.log(currentMonthName);


  const LoadingScreen = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#000000" }}>
      <LottieView
      style={{
        width:400,
        height:400
      }}
        source={require('../assets/animations/FiHelpStartScreenAnimation.json')}
        autoPlay
        loop
      />
    </View>
  );
  


  const handleNavButtonClick = (screenName) => {
    navigation.navigate(screenName);
  };

  const calPercentage = (budgetData, availableBalance) => {
    const percentage = ((availableBalance) / parseFloat(budgetData[0].BudgetAmount)) * 100;
    
    if (percentage<0){
      setPrecentage(100)
      setProgressBarColor('#F15A59')
    }else{
      setPrecentage(100-percentage); 
      setProgressBarColor('#3AC586'); // Set default green color
    }
   
  }

  //Check notification permissions
  const checkNotificationPermissions = async () =>{
    
    const results = await check(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
    console.log(results)
    if(results === RESULTS.DENIED){
      const permissionRequestResult = await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
      if(permissionRequestResult === RESULTS.GRANTED){
        console.log("Notifications permissions granted");
      }
      else{
        console.log("Notification permissions denied");
      }
    }
  }

  const showNotification = () =>{
    PushNotification.localNotification({
      channelId: '1',
      title:'Budget Alert',
      message:'Your budget has crossed 50%',
    })
  }

  const fetchTransactionData = async (budgetData) =>{
    try{
      const snapshot = await firebase
      .firestore()
      .collection('Transaction')
      .where('Month', '==', currentMonthName)
      .get();
      const data = snapshot.docs.map((doc)=>({id:doc.id,...doc.data()}));
      //Extract the "Amount" values from the array and convert them to numbers
      const amounts = data.map((transaction)=>parseFloat(transaction.Amount) || 0);
      //Sum of the total past transactions
      const totalAmount = amounts.reduce((sum,amount)=> sum+amount,0);
      setAvailableBalance(parseFloat(budgetData[0].BudgetAmount)-totalAmount)
      setLoading(false); // Set loading to false once data is fetched
    }
    catch(error){
      setLoading(false); // Set loading to false once data is fetched
      console.error('Error fetching Transaction data from Firestore:',error)
    }
  }
  const fetchData = async () =>{
      
    try{
      const snapshot = await firebase.firestore().collection('Budget').get();
      const data =  snapshot.docs.map((doc)=>({id:doc.id,...doc.data()}));
      setBudgetData(data);
     
      
      fetchTransactionData(data);
      calPercentage(data,availableBalance) 
      setLoading(false); // Set loading to false once data is fetched
    } catch(error){
      console.error('Error fetching data from Firestore:',error)
      setLoading(false); // Set loading to false once data is fetched
    }
  }

  {/*useEffect(()=>{
    checkNotificationPermissions();
  },[])*/}
  
  useFocusEffect(()=>{    
    fetchData();
  },);

  if (loading){
    return <LoadingScreen />;
  }

  return (
    <View style={styles.HomePageContainer}>
      <View style={styles.HeadingContainer}>
        <View style={styles.AppTitle}>
          <Image
            source={require('../assets/images/FiHelpAppLogo.png')} // Update the path to your image
            style={styles.LogoImage}
          />
          <Text style={styles.MainTitle}>FiHelp</Text>
        </View>
        <Text style={styles.AppSubtitle}>
          Turning pennies into possibilities, one budget at a time.
        </Text>
        <Text style={styles.spanTitle}>
          Discover financial freedom with FiHelp!
        </Text>
      </View>
      <View style={styles.AvailBalContainer}>
        <View style={styles.AvailBalCard}>
          <Text style={styles.AvailBalHeader}>Available balance</Text>
          <Text style={styles.AvailBalAmount}>₹{availableBalance}</Text>
          <Text style={styles.AvailBalSeeDetails}>See details</Text>
        </View>
      </View>
      <View style={styles.BudgetContentContainer}>
        <View style={styles.BudgetBalCard}>
          <View style={styles.BudgetHeaderContainer}>
          <Text style={styles.BudgetBalHeader}>Budget for {budgetData.length > 0 ? budgetData[0].Month : ''}</Text>
          <Text style={styles.BudgetBalAmount}>₹ {budgetData.length > 0 ? budgetData[0].BudgetAmount : ''}</Text>
          </View>
          <View style={styles.ProgressBarContainer}>
          <View
    style={[
      styles.ProgressBar,
      {
        width: `${percentage}%`,
        backgroundColor: progressBarColor,
      },
    ]}
  />
          </View>
        </View>
      </View>

      {/* Add new transactions UI */}
      <TouchableOpacity onPress={() => handleNavButtonClick('AddTransaction')}>
      <View style={styles.addTransactionContainer}>
      <View style={styles.addTransaction}>
      <Text style={styles.addTransactionText}>+</Text>
      </View>
      </View>
      </TouchableOpacity>

      {/*Footer navbar UI*/}
   
    <ImageBackground    
        source={require('../assets/images/Navbar.png')} // Update the path to your image
        style={styles.footerNavbar}
        resizeMode="cover" // You can change the resizeMode as needed
      >

      <TouchableOpacity onPress={() => handleNavButtonClick('HomePage')}>
        <View style={styles.NavLink}>
        
        <Image
            source={require('../assets/images/HomeIconActive.png')} // Update the path to your image
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
};

const styles = StyleSheet.create({
  HomePageContainer: {
    backgroundColor: 'black',
    flex: 1,
  },
  HeadingContainer: {
    backgroundColor: 'black',
    alignItems: 'center', // Center content horizontally
    paddingTop: 20, // Add padding at the top
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
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 15,
    marginTop: 15,
  },
  spanTitle: {
    color: '#3AC586',
    fontSize: 12,
    lineHeight: 12,
    textAlign: 'center',
    width: '73%',
    marginTop: 8,
  },
  AvailBalContainer: {
    marginTop: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  AvailBalCard: {
    padding: 20,
    backgroundColor: '#121212',
    width: '80%', // Adjust the width as needed
    borderRadius: 24, // Add borderRadius for a rounded appearance if desired
  },
  AvailBalHeader: {
    color: 'white',
    fontSize: 15,
  },
  AvailBalAmount: {
    marginTop: 10,
    color: 'white',
    fontSize: 29,
    fontWeight: 'bold',
  },
  AvailBalSeeDetails: {
    marginTop: 10,
    color: 'white',
  },
  BudgetBalCard: {
    flexDirection: 'column', // Change to 'column' for vertical alignment
    paddingLeft:8,
    paddingTop:10,
    backgroundColor: 'white',
    width: '70%',
    borderRadius: 20,
    marginTop: 20,
    overflow:'hidden',
  },
  BudgetBalHeader: {
    color: 'black',
    fontSize: 14,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  BudgetContentContainer: {
    flexDirection: 'row', // Arrange components side by side
    justifyContent: 'center', // Distribute components with equal spacing
    alignItems: 'center', // Align components vertically
    marginBottom: 20, // Add margin at the bottom
  },
  BudgetBalAmount: {
    color: 'black', // Change the color as needed
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: '10%',
  },
  ProgressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight:10,
    paddingLeft:6
    
  },
  ProgressBar: {
    height: 8,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#e0e0e0',
  },
  ProgressBarText: {
    color: 'black', // Change the color as needed
  },
  BudgetHeaderContainer: {
    flexDirection: 'row', // Arrange BudgetBalHeader and BudgetBalAmount side by side
    alignItems: 'center', // Align components vertically
    marginBottom: 20, // Add margin at the bottom
  },
  
  addTransactionContainer: {
    marginTop:"40%",
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


export default HomePage;
