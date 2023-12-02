import React from "react";
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

const Stack = createStackNavigator();

const App = () => {
  StatusBar.setBarStyle("light-content")
  StatusBar.setBackgroundColor("black")

  return (
    <View style={{ flex: 1, backgroundColor: "#1E1E1E" }}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="AddBudget"
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
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default App;
