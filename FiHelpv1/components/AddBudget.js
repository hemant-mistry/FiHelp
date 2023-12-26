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
  ImageBackground,
  TextInput,
  Keyboard
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {firebase} from '@react-native-firebase/firestore';
import { keyboard } from '@testing-library/user-event/dist/keyboard';
const AddBudget = () =>{
  const databaseConnection = firebase.firestore().collection('Budget')
  const [month, setMonth] = useState('');
  const [budgetamount, setBudgetamount] = useState('')

  //State to keep track of whether the budget amount is fetched
  const [budgetFetched, setBudgetFetched] = useState(false);

  const navigation = useNavigation();

  const handleNavButtonClick = (screenName) => {
    navigation.navigate(screenName);
  };

  const setMonthlyBudget = () =>{
    console.log("Inside the setMonthlyBudget function");
    const data = {
      BudgetAmount: budgetamount,
      Month:month,
    };

    // Check if a budget entry for the current month already exists
  databaseConnection
  .where('Month', '==', month)
  .get()
  .then((querySnapshot) => {
    if (querySnapshot.size > 0) {
      // Update the existing entry
      querySnapshot.forEach((doc) => {
        databaseConnection.doc(doc.id).update(data);
      });
    } else {
      // Add a new entry
      databaseConnection.add(data);
    }

    
    
    Keyboard.dismiss();
  })
  .catch((error) => {
    console.error("Error checking/updating budget:", error);
  });
};

   // New useEffect hook to set the default month
   useEffect(() => {
    const currentDate = new Date();
    const defaultMonth = currentDate.toLocaleString('default', { month: 'long' });
    setMonth(defaultMonth);
  }, []); // Empty dependency array ensures that this effect runs only once, similar to componentDidMount


  //For fetching the existing data from the database
  useEffect(() => {
    // Fetch existing budget amount when the component mounts
    const fetchBudgetAmount = async () => {
      try {
        const snapshot = await databaseConnection.where('Month', '==', month).get();

        if (snapshot.size > 0) {
          snapshot.forEach((doc) => {
            const data = doc.data();
            setBudgetamount(data.BudgetAmount);
          });
        }

        // Mark that the budget amount has been fetched
        setBudgetFetched(true);
      } catch (error) {
        console.error('Error fetching budget amount:', error);
      }
    };

    // Call the function to fetch the budget amount
    fetchBudgetAmount();
  }, [month]); // Fetch the budget amount whenever the month changes



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
      <Text style={styles.AppSubtitle}>Set your Budget</Text>
<View style={styles.AddTransactionsContainer}>
      <View style={styles.AddTransactionForm}>
        <View style={styles.AddTransactionDetail}>
            <Text style={styles.DetailText}>Enter your Budget month:</Text>
            <TextInput
                style={styles.inputTransactionDetail}
                placeholder="Enter your budget month"
                keyboardType="default"
                onChangeText={text=>setMonth(text)}
                value={month}
                editable={false}
                defaultValue={month}
              />
        </View>
        <View style={styles.AddTransactionAmount}>
        <Text style={styles.AmountText}>Budget Amount:</Text>
        <TextInput
                style={styles.inputTransactionAmount}
                placeholder="Enter budget amount"
                keyboardType="default"
                onChangeText={text =>setBudgetamount(text)}
                value={budgetamount}
                editable={budgetFetched} //Allow editing only if the budget amount is fetched
              />
        </View>
        <Pressable style={styles.submitButton} onPress={setMonthlyBudget}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </Pressable>
      </View>
      </View>
  {/*Footer navbar UI*/}
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
            source={require('../assets/images/AnalysisInActive.png')} // Update the path to your image
            style={styles.NavLinkIcon}
          />
        </View>
        </TouchableOpacity>

        
        <TouchableOpacity onPress={() => handleNavButtonClick('AddBudget')}>
        <View style={styles.NavLink}>
        
        <Image
            source={require('../assets/images/WalletActive.png')} // Update the path to your image
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


export default AddBudget;