import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import { useRoute, useNavigation } from '@react-navigation/native';

  
const CELL_COUNT = 4;

export default function Otp() {

  const route = useRoute();
  const navigation = useNavigation();
  const phoneNumber = route.params?.phoneNumber;
  const [countdown, setCountdown] = React.useState(16);

    const [value, setValue] = React.useState('');
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
      value,
      setValue,
    });

    handleVerifyPress = () => {
      navigation.navigate('NameScreenStack', { screen: 'NameScreen' });
    };

    React.useEffect(() => {
      if (countdown > 0) {
        const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        return () => clearTimeout(timer);
      }
    },[countdown]);
    

  return (
    <View style={styles.container} >
      <Image source={require('../assets/images/otp-page.jpg')} style={styles.image}/>
      <Text style={styles.text1}>Verify OTP</Text>
      <Text style={styles.text2}>Please enter the 4 digit verification code that is send to you at <Text style={styles.text3}>+91 {phoneNumber}</Text></Text>
      <View style={styles.otp}>
      <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => (
          <View
            onLayout={getCellOnLayoutHandler(index)}
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}
          >
            <Text style={styles.cellText}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          </View>
        )}
      />      
      </View>
      <Text style={styles.text4}>Don't receive code?<Text style={styles.text5}> {countdown} Sec</Text></Text>
      <TouchableOpacity style={styles.button} onPress={handleVerifyPress}>
        <Text style={styles.text6} >Verify</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        backgroundColor: '#FFFFFF',
    },
    image: {
        marginTop: 100
    },
    text1: {
        fontSize: 30,
        color: '#000000',
        fontWeight: '500',
        marginTop: 50,
        fontFamily: 'DMSans-Bold'
    },
    text2: {
        fontSize: 17,
        marginTop: 30,
        width: 360,
        textAlign: 'center',
        lineHeight: 30,
        fontFamily: 'DMSans-Medium',

    },
    text3: {
        color: '#726aec',
        fontWeight: '500',
        fontFamily: 'DMSans-Bold'


    },
    otp: {
        height: 120,
        fontFamily: 'Quantico-Bold'

    },
    text4 : {
        color: '#000000',
        paddingLeft: 180,
        fontFamily: 'DMSans-Medium'
    },
    text5 : {
        color: '#726aec',
        fontFamily: 'DMSans-Medium'

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
    text6: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: '500',
        fontFamily: 'DMSans-Bold'

    },
    cell: {
        display: 'flex',
        flexWrap: 'wrap',
        width: 70,
        height: 70,
        lineHeight: 38,
        borderWidth: 1,
        borderColor: '#00000030',
        marginLeft: 15,
        borderRadius: 7,
        marginTop: 30,
        alignItems: 'center',
        justifyContent: 'center',
      },
      focusCell: {
        borderColor: '#000',
      },   
      cellText: {
        fontSize: 30,
        marginLeft: 50,
        color: '#000000',
        fontWeight: '500'
      }, 
})