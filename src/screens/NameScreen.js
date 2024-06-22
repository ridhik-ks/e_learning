import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native'
import React, { useState } from 'react'
import Profile from '../assets/images/profile.svg'
import { useNavigation } from '@react-navigation/native'

const NameScreen = () => {

  const navigation = useNavigation();
  const [name, setName] = useState('');

  handlePress = () => {
    navigation.navigate('PasswordScreenStack', { screen: 'PasswordScreen', params:{name}});
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/name-page.jpg')} style={styles.image}/>
      <Text style={styles.text1}>Enter Your name</Text>
      <Text style={styles.text2}>Enter your full name for your account.</Text>
      <View style={styles.section}>
        <Profile style={styles.profile}/>
        <TextInput placeholder='Enter name' style={styles.textinput} value={name} onChangeText={setName}/>
      </View>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.text3}>Submit</Text>
      </TouchableOpacity>
    </View>
  )
}

export default NameScreen

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        backgroundColor: '#ffffff',
    },
    image: {
        marginTop: 60,
    },
    text1: {
        fontSize: 30,
        color: '#000000',
        fontWeight: '500',
        marginTop: 60,
        fontFamily: 'DMSans-Bold'

    },
    text2: {
        fontSize: 18,
        marginTop: 20,
        fontFamily: 'DMSans-Medium'

    },
    section: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#00000030',
        width: 350,
        height: 60,
        marginTop: 40,
        borderRadius: 7
    },
    profile: {
        marginLeft: 20
    },
    textinput: {
        fontSize: 18,
        color: '#000',
        marginLeft: 20,
        width: 280,
        fontFamily: 'DMSans-Medium'

    },
    button: {
        width: 350,
        height: 60,
        backgroundColor: '#726aec',
        marginTop: 280,
        borderRadius: 6,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text3: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: '500',
        fontFamily: 'DMSans-Bold'

    }
})