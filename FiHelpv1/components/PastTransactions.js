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
  ImageBackground
} from 'react-native';

const PastTransactions = () => {
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
      <View style={styles.PastTransactionsContainer}>
        <View style={styles.PastTransactionsCard}>
          <Text style={styles.PastTransactionCardTitle}>
            Transaction Detail:
          </Text>
          <Text style={styles.PastTransactionCardDesc}>
            Weekend Burger King order
          </Text>
          <Text style={styles.PastTransactionCardAmount}>₹4365</Text>
        </View>
      </View>

      <View style={styles.PastTransactionsContainer}>
        <View style={styles.PastTransactionsCard}>
          <Text style={styles.PastTransactionCardTitle}>
            Transaction Detail:
          </Text>
          <Text style={styles.PastTransactionCardDesc}>
            Weekend Burger King order
          </Text>
          <Text style={styles.PastTransactionCardAmount}>₹4365</Text>
        </View>
      </View>

      <View style={styles.PastTransactionsContainer}>
        <View style={styles.PastTransactionsCard}>
          <Text style={styles.PastTransactionCardTitle}>
            Transaction Detail:
          </Text>
          <Text style={styles.PastTransactionCardDesc}>
            Weekend Burger King order
          </Text>
          <Text style={styles.PastTransactionCardAmount}>₹4365</Text>
        </View>
      </View>

      <View style={styles.PastTransactionsContainer}>
        <View style={styles.PastTransactionsCard}>
          <Text style={styles.PastTransactionCardTitle}>
            Transaction Detail:
          </Text>
          <Text style={styles.PastTransactionCardDesc}>
            Weekend Burger King order
          </Text>
          <Text style={styles.PastTransactionCardAmount}>₹4365</Text>
        </View>
      </View>

      <View style={styles.PastTransactionsContainer}>
        <View style={styles.PastTransactionsCard}>
          <Text style={styles.PastTransactionCardTitle}>
            Transaction Detail:
          </Text>
          <Text style={styles.PastTransactionCardDesc}>
            Weekend Burger King order
          </Text>
          <Text style={styles.PastTransactionCardAmount}>₹4365</Text>
        </View>
      </View>

      <View style={styles.PastTransactionsContainer}>
        <View style={styles.PastTransactionsCard}>
          <Text style={styles.PastTransactionCardTitle}>
            Transaction Detail:
          </Text>
          <Text style={styles.PastTransactionCardDesc}>
            Weekend Burger King order
          </Text>
          <Text style={styles.PastTransactionCardAmount}>₹4365</Text>
        </View>
      </View>

    
    </ScrollView>

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
        <View style={styles.NavLink}>
        <Image
            source={require('../assets/images/HomeIconInActive.png')} // Update the path to your image
            style={styles.NavLinkIcon}
          />
        </View>
        <View style={styles.NavLink}>
        <Image
            source={require('../assets/images/AnalysisActive.png')} // Update the path to your image
            style={styles.NavLinkIcon}
          />
        </View>
        <View style={styles.NavLink}>
        <Image
            source={require('../assets/images/WalletInActive.png')} // Update the path to your image
            style={styles.NavLinkIcon}
          />
        </View>
        <View style={styles.NavLink}>
        <Image
            source={require('../assets/images/UserProfileInActive.png')} // Update the path to your image
            style={styles.NavLinkIcon}
          />
        </View>

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
