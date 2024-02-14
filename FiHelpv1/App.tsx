import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomePage from "./components/HomePage";
import {
  StatusBar,
  View,
} from 'react-native';
import addTransaction from "./components/AddTransaction";
import PastTransactions from "./components/PastTransactions";
import AddBudget from "./components/AddBudget";
import LottieView from "lottie-react-native";
import UserProfile from "./components/UserProfile";
import { getToken, notificationListener, requestUserPermission } from "./components/utils";
import SignUpPage from "./components/SignUpPage";
import LoginPage from "./components/LoginPage";
import auth from '@react-native-firebase/auth';

const Stack = createStackNavigator();

const LoadingScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#000000" }}>
    <LottieView
    style={{
      width:400,
      height:400
    }}
      source={require('./assets/animations/FiHelpStartScreenAnimation.json')}
      autoPlay
      loop
    />
  </View>
);

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState('LoginPage'); // Set initial route to LoginPage by default
  StatusBar.setBarStyle("light-content");
  StatusBar.setBackgroundColor("black");


  useEffect(()=>{
    requestUserPermission();
    notificationListener();
    getToken();
  }, []);
  
  useEffect(() => {
    const loadData = async () => {
      // Check if user is already logged in
      const user = auth().currentUser;
      if (user) {
        // User is logged in, navigate to HomePage
        setInitialRoute('HomePage');
      }
      
      // Simulate loading data
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    };

    loadData();
  }, []);
 
  if (isLoading) {
    console.log("splash")
    return <LoadingScreen />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#1E1E1E" }}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={initialRoute} // Set initial route dynamically
          screenOptions={{
            headerStyle: {
              backgroundColor: "#1E1E1E",
            },
            headerTintColor: "#FFFFF",
            headerTitleStyle: {
              color: "#FFFFF",
            },
          }}
        >
          <Stack.Screen
            name="HomePage"
            component={HomePage}
            options={{ headerTitle: "Home", headerShown: false }}
          />

          <Stack.Screen
            name="AddBudget"
            component={AddBudget}
            options={{ headerTitle: "AddBudget", headerShown: false }}
          />

          <Stack.Screen
            name="PastTransactions"
            component={PastTransactions}
            options={{ headerTitle: "PastTransactions", headerShown: false }}
          />
          <Stack.Screen
            name="AddTransaction"
            component={addTransaction}
            options={{ headerTitle: "AddTransaction", headerShown: false }}
          />
          <Stack.Screen
            name="UserProfile"
            component={UserProfile}
            options={{ headerTitle: "UserProfile", headerShown: false }}
          />
          <Stack.Screen
            name="LoginPage"
            component={LoginPage}
            options={{ headerTitle: "UserProfile", headerShown: false }}
          />
          <Stack.Screen
            name="SignUpPage"
            component={SignUpPage}
            options={{ headerTitle: "UserProfile", headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default App;
