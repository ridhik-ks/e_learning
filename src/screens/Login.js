import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DropDown from '../assets/images/drop-down.svg';
import Phone from '../assets/images/phone.svg';

export default function Login() {

  const [phoneNumber,setPhoneNumber] = useState('');
  const navigation = useNavigation();

  handleCreatePress = () => {
    navigation.navigate('CreateAccountStack', { screen: 'CreateAccountScreen' });
  };

  handleJoinPress = () => {
    navigation.navigate('JoinStack', { screen: 'OtpScreen', params: { phoneNumber: phoneNumber } });
  }

  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/login-page.jpg')} style={styles.image1} />
      <Text style={styles.text1}>Login to your account</Text>
      <Text style={styles.text2}>Login with your phone number</Text>
      <View style={styles.section}>
        <TouchableOpacity style={styles.section1}>
          <Image source={require('../assets/images/flag.png')} style={styles.flag} />
          <DropDown style={styles.down}/>
        </TouchableOpacity>
        <View style={styles.section2}>
          <Phone style={styles.phone} />
          <Text style={styles.text3}>+91</Text>
          <TextInput style={styles.textInput} value={phoneNumber} onChangeText={setPhoneNumber} keyboardType='phone-pad'/>
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleJoinPress}>
        <Text style={styles.text4}>Join Now</Text>
      </TouchableOpacity>
      <View style={styles.section3}>
        <Text style={styles.text5}>don't have an account? </Text>
        <TouchableOpacity onPress={handleCreatePress}>
          <Text style={styles.button2}>Create an Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    height: '100%',
  },
  image1: {
    marginTop: 50,
    
  },
  text1: {
    fontSize: 32,
    color: '#000000',
    marginTop: 40,
    fontWeight: '500',
    fontFamily: 'DMSans-Medium'
  },
  text2: {
    fontSize: 16,
    marginTop: 20,
    fontFamily: 'DMSans-Medium'

  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginRight: 20
  },
  section1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginRight: 10,
  },
  flag: {
    width: 80,
    height: 80,
    position: 'relative',

  },
  down: {
    width: 10,
    height: 10,
    position: 'absolute',
  },
  section2: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#51459F', 
    borderRadius: 8,
    width: 300,
    padding: 5, 
  },
  phone: {
    marginLeft: 10,
  },
  textInput: {
    fontSize: 18,
    fontWeight: '500',
    width: 200,
    fontFamily: 'DMSans-Bold'

  },
  text3: {
    marginLeft: 8,
    fontSize: 18,
    color: '#000000',
    fontFamily: 'DMSans-Bold'

  },
  button: {
    width: 350,
    height: 60,
    backgroundColor: '#726aec',
    marginTop: 50,
    borderRadius: 6,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text4: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '500',
    fontFamily: 'DMSans-Medium'

  },
  section3: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20
  },
  text5: {
    fontSize: 16,
    fontWeight: '200',
    fontFamily: 'DMSans-Bold'

  },
  button2: {
    fontSize: 16,
    fontWeight: '500',
    color: '#726aec',
    fontFamily: 'DMSans-Bold'

  },
  
});
