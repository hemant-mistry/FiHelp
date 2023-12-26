import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, ImageBackground} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {firebase} from '@react-native-firebase/firestore';
import PushNotification from 'react-native-push-notification';
import LottieView from 'lottie-react-native';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

const UserProfile = () => {
  const navigation = useNavigation();
  const handleNavButtonClick = screenName => {
    navigation.navigate(screenName);
  };
  return (
    <View style={styles.userProfileContainer}>
      <Text style={styles.userProfileText}>
        You are logged in as: <Text style={styles.usernameSpan}>XXXXX</Text>
      </Text>

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
              source={require('../assets/images/HomeIconInActive.png')} // Update the path to your image
              style={styles.NavLinkIcon}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleNavButtonClick('PastTransactions')}>
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
        <TouchableOpacity disabled>
          <View style={styles.NavLink}>
            <Image
              source={require('../assets/images/UserProfileActive.png')} // Update the path to your image
              style={styles.NavLinkIcon}
            />
          </View>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  userProfileContainer: {
    backgroundColor: 'black',
    flex: 1,
    alignItems: 'center',
  },
  userProfileText: {
    marginTop: '75%',
    color: 'white',
  },
  usernameSpan: {
    color: '#3AC586',
  },
  footerNavbar: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  NavLinkIcon: {
    height: 18,
    width: 18,
  },
  addTransactionContainer: {
    marginTop:"645%",
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
});

export default UserProfile;
