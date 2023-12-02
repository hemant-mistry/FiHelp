import React from 'react';
import {View, Text, StyleSheet, Image, ImageBackground} from 'react-native';

const HomePage = () => {
  const percentage = 30;
  // Calculate the dynamic width of the progress bar
  const progressBarWidth = `${percentage}%`;
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
          <Text style={styles.AvailBalAmount}>₹3,578</Text>
          <Text style={styles.AvailBalSeeDetails}>See details</Text>
        </View>
      </View>
      <View style={styles.BudgetContentContainer}>
        <View style={styles.BudgetBalCard}>
          <View style={styles.BudgetHeaderContainer}>
            <Text style={styles.BudgetBalHeader}>Budget for October</Text>
            <Text style={styles.BudgetBalAmount}>₹3,578</Text>
          </View>
          <View style={styles.ProgressBarContainer}>
            <View
              style={[
                styles.ProgressBar,
                {width: progressBarWidth, backgroundColor: '#3AC586'}, // Set dynamic width and green color
              ]}
            />
          </View>
        </View>
      </View>

      {/* Add new transactions UI */}
      <View style={styles.addTransactionContainer}>
      <View style={styles.addTransaction}>
      <Text style={styles.addTransactionText}>+</Text>
      </View>
      </View>


      {/*Footer navbar UI*/}
   
    <ImageBackground    
        source={require('../assets/images/Navbar.png')} // Update the path to your image
        style={styles.footerNavbar}
        resizeMode="cover" // You can change the resizeMode as needed
      >
        <View style={styles.NavLink}>
        <Image
            source={require('../assets/images/HomeIconActive.png')} // Update the path to your image
            style={styles.NavLinkIcon}
          />
        </View>
        <View style={styles.NavLink}>
        <Image
            source={require('../assets/images/AnalysisInActive.png')} // Update the path to your image
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
    padding: 10,
    backgroundColor: 'white',
    width: '70%',
    borderRadius: 24,
    marginTop: 20,
  },
  BudgetBalHeader: {
    color: 'black',
    fontSize: 13,
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
    fontSize: 29,
    fontWeight: 'bold',
    marginLeft: 45,
  },
  ProgressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ProgressBar: {
    height: 10,
    borderRadius: 5,
    marginRight: 10,
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
    marginTop:"35%",
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
    height:24
  }
});

export default HomePage;
