import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import * as Progress from 'react-native-progress';
import { Svg, G } from 'react-native-svg';
import Inforamtion from '../assets/images/information.svg';
import BackArrow from '../assets/images/back-arrow.svg';
import PaymentHistory from '../assets/images/payment-history.svg';
import cards from '../components/cards';
import { useRoute } from '@react-navigation/native';


const Profile = () => {

    const route = useRoute();
    const name = route.params?.name || '';


  return (
    <ScrollView style={styles.container}>
      <View style={styles.section1}>
        <Image source={require('../assets/images/person.jpg')} style={styles.profileImage}/>
        <Text style={styles.text1}>{name}</Text>
        <Text style={styles.text2}>{name}@gmail.com</Text>
      </View>
      <View style={styles.section2}>
        <Text style={styles.head1}>Course You're Taking</Text>
        <ScrollView style={styles.cardSection} horizontal={true} showsHorizontalScrollIndicator={false}>
      {cards.map((card) => (
        <View style={[styles.card,card.style]} key={card.key}>
            <Text style={styles.text3}>{card.title}</Text>
            <Text style={styles.text4}>{card.hours} Hour Spend</Text>
            <View style={styles.progress}>
                <Text style={styles.text5}>{card.percentage}%</Text>
                <Progress.Bar
                    progress={card.progress}
                    color="#fff"
                    width={130}
                    height={8}
                    style={[styles.progressBar, card.progressBackground]}
                />
            </View>
        </View>
      ))}
      </ScrollView>
      </View>
      <View style={styles.accountSection}>
        <Text style={styles.text6}>Account</Text>
        <TouchableOpacity style={styles.section3}>
            <View style={styles.section4}>
                <Inforamtion style={styles.inforamtion}/>
                <Text style={styles.text7}>Educational Information</Text>
            </View>
            <Svg width={24} height={24} viewBox="0 0 24 24" style={styles.rotatedArrow}>
              <G rotation="180" origin="12, 12">
                <BackArrow style={styles.backArrow} />
              </G>
            </Svg>
        </TouchableOpacity>    
        <TouchableOpacity style={styles.section3}> 
            <View style={styles.section4}>
                <PaymentHistory style={styles.paymentHistory}/>
                <Text style={styles.text7}>Payment History</Text>
            </View>
            <Svg width={24} height={24} viewBox="0 0 24 24" style={styles.rotatedArrow}>
              <G rotation="180" origin="12, 12">
                <BackArrow style={styles.backArrow} />
              </G>
            </Svg>
        </TouchableOpacity>
        <TouchableOpacity style={styles.section3}>
            <View style={styles.section4}>
                <PaymentHistory style={styles.paymentHistory}/>
                <Text style={styles.text7}>Payment History</Text>
            </View>
            <Svg width={24} height={24} viewBox="0 0 24 24" style={styles.rotatedArrow}>
              <G rotation="180" origin="12, 12">
                <BackArrow style={styles.backArrow} />
              </G>
            </Svg>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f5f7fb'
    },
    section1: {
        display: 'flex',
        alignItems: 'center',
        marginTop: 60
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60
    },
    text1: {
        fontSize: 30,
        fontWeight: '500',
        marginTop: 20,
        fontFamily: 'DMSans-Bold'

    },
    text2: {
        fontSize: 16,
        marginTop: 10,
        fontFamily: 'DMSans-Medium'

    },
    section2 : {
        marginLeft: 20,
        marginTop: 30
    },
    head1: {
        fontSize: 26,
        fontWeight: '500',
        color: '#4c4c4c',
    },
    cardSection: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    card: {
        backgroundColor: '#6367e9',
        width: 200,
        height: 120,
        display: 'flex',
        justifyContent: 'center',
        paddingHorizontal: 10,
        borderRadius: 12,
        marginTop: 20,
        marginRight: 10
    },
    text3: {
        fontSize: 18,
        color: '#fff',
        fontWeight: '500',
        marginBottom: 6,
        fontFamily: 'DMSans-Bold'

    },
    text4: {
        color: '#fff',
        marginBottom: 10,
        fontFamily: 'DMSans-Medium'


    },
    progress: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        
    },
    text5: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'DMSans-Medium'

    },
    progressBar: {
        marginLeft: 10,
        backgroundColor: '#8689f2',
        borderColor: '#6367e9',
    },
    accountSection: {
        marginTop: 30,
        marginHorizontal: 15,
    },
    text6: {
        fontSize: 26,
        fontWeight: '500',
        marginBottom: 10,
        color: '#4c4c4c',
        fontFamily: 'DMSans-Bold'

    },
    section3: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 65,
        paddingHorizontal: 15,
        marginTop: 10,
        borderRadius: 6,
        backgroundColor: '#FFFFFF',
    },
    inforamtion: {

    },
    text7: {
        fontSize: 16,
        marginLeft: 15,
        color: '#4c4c4c',
        fontWeight: '500',
        fontFamily: 'DMSans-Medium'


    },
    section4: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },

})