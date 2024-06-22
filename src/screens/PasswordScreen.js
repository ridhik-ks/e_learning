import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Alert } from 'react-native'
import React, {useState} from 'react'
import PasswordLock from '../assets/images/password-lock.svg'
import DontView from '../assets/images/dont-view.svg'
import { useNavigation, useRoute } from '@react-navigation/native'

const PasswordScreen = () => {

    const navigation = useNavigation();
    const route = useRoute();
    const name = route.params?.name || '';
    

    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [password, setpassword] = useState('');
    const [passwordError, setpasswordError] = useState('');

    const [isLengthValid, setIsLengthValid] = useState(false);
    const [hasLowerCase, setHasLowerCase] = useState(false);
    const [hasUpperCase, setHasUpperCase] = useState(false);
    const [hasNumber, setHasNumber] = useState(false);
    const [hasSymbol, setHasSymbol] = useState(false);

    const validatePassword = (value) => {
        let lengthValid = value.length >= 8;
        let lowerCaseValid = /[a-z]/.test(value);
        let upperCaseValid = /[A-Z]/.test(value);
        let numberValid = /\d/.test(value);
        let symbolValid = /[!@#$%^&*?]/.test(value);

        setIsLengthValid(lengthValid);
        setHasLowerCase(lowerCaseValid);
        setHasUpperCase(upperCaseValid);
        setHasNumber(numberValid);
        setHasSymbol(symbolValid);

        if(lengthValid && lengthValid && upperCaseValid && numberValid && symbolValid) {
            setpasswordError('');
        } else {
            setpasswordError('Paswords does not meet requirements.');
        };
    }

    handlePress = () => {
        if (passwordError === '') {
        navigation.navigate('HomeScreenStack', { screen: 'AppTabs', params: {name}});
        } else {
            Alert.alert('Please fix password issues before submitting')
        }
    };
    

  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/password-page.jpg')} style={styles.image}/>
      <Text style={styles.text1}>Set a Strong Password</Text>
      <Text style={styles.text2}>Set a strong password for your account.</Text>
      <View style={styles.section}>
        <PasswordLock style={styles.passwordLock}/>
        <TextInput style={styles.textInput} 
                    secureTextEntry={secureTextEntry} 
                    value={password}
                    onChangeText={(value) => {
                        setpassword(value);
                        validatePassword(value);
                    }} 
        />
        <TouchableOpacity onPress={() => setSecureTextEntry(!secureTextEntry)}>
            <DontView style={styles.dontView}/>
        </TouchableOpacity>
      </View>
      {passwordError !== '' && <Text style={styles.text3}>{passwordError}</Text>}
      
    <View style={styles.checkBoxContainer}>
        <View style={isLengthValid ? styles.checkBox1 : styles.checkBox2}>
        <View style={isLengthValid ? styles.check : styles.check1}></View>
        </View>
        <Text style={isLengthValid ? styles.checkBoxText : styles.checkBoxText_1}>Should contain at least 8 characters</Text>
    </View>
    <View style={styles.checkBoxContainer}>
        <View style={hasLowerCase ? styles.checkBox1 : styles.checkBox2}>
            <View style={hasLowerCase ? styles.check : styles.check1}></View>
        </View>
        <Text style={hasLowerCase ? styles.checkBoxText : styles.checkBoxText_1}>Should contain a lowercase (small) letter (a - z)</Text>
    </View>
    <View style={styles.checkBoxContainer}>
        <View style={hasUpperCase ? styles.checkBox1 : styles.checkBox2}>
            <View style={hasUpperCase ? styles.check : styles.check1}></View>
        </View>
        <Text style={hasUpperCase ? styles.checkBoxText : styles.checkBoxText_1}>Should contain a uppercase (capital) letter (A - Z)</Text>
    </View>
    <View style={styles.checkBoxContainer}>
        <View style={hasNumber ? styles.checkBox1 : styles.checkBox2}>
            <View style={hasNumber ? styles.check : styles.check1}></View>
        </View>
        <Text style={hasNumber ? styles.checkBoxText : styles.checkBoxText_1}>Should contain at least one number (0-9)</Text>
    </View>
    <View style={styles.checkBoxContainer}>
        <View style={hasSymbol? styles.checkBox1 : styles.checkBox2}>
            <View style={hasSymbol ? styles.check : styles.check1}></View>
        </View>
        <Text style={hasSymbol ? styles.checkBoxText : styles.checkBoxText_1}>Should contain at least one symbol ($,@,#,%,!,*,?,&)</Text>
    </View>   
    <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.text4}>Submit</Text>
    </TouchableOpacity>
    </View>
  )
}

export default PasswordScreen

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        height: '100%',
    },
    image: {
        marginTop: 100
    },
    text1: {
        fontSize: 30,
        fontWeight: '500',
        color: '#000000',
        marginTop: 50,
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
        width: 350,
        borderRadius: 7,
        marginTop: 30,
        borderColor: '#00000030',
        width: 350,
        height: 60,
    },
    passwordLock: {
        marginLeft: 20
    },
    textInput: {
        width: 265,
        fontSize: 18,
        marginLeft: 5,
        fontFamily: 'DMSans-Medium'

    },
    text3: {
        fontSize: 16,
        fontWeight: '500',
        color: 'red',
        marginTop: 10,
        marginRight: 70,
        fontFamily: 'DMSans-Bold'

    },
    checkBoxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 22,
        width: '95%',
    },
    checkBoxText: {
        fontSize: 15,
        marginLeft: 10,
        color: '#726aec',
        fontFamily: 'DMSans-Medium'

    },
    button: {
        width: 350,
        height: 60,
        backgroundColor: '#726aec',
        marginTop: 80,
        borderRadius: 6,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text4: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: '500',
        fontFamily: 'DMSans-Bold'

    },
    checkBox: {
        borderRadius: 50
    },
    check: {
        borderWidth: 1,
        width: 15,
        height: 15,
        borderRadius: 20,
        borderColor: '#726aec',
        backgroundColor: '#726aec',
    },
    checkBox1: {
        borderWidth: 1,
        borderRadius: 20,
        padding: 5,
        borderColor: '#726aec',

    },
    check1: {
        width: 15,
        height: 15,
        borderRadius: 10,
    },
    checkBox2: {
        borderWidth: 1,
        borderRadius: 20,
        padding: 5,
        borderColor: '#000000',
    },
    checkBoxText_1: {
        fontSize: 15,
        marginLeft: 10,
        fontFamily: 'DMSans-Medium'

    },
})