import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, Dimensions,style } from 'react-native';
import React, { useEffect } from 'react';
import NotificationIcon from '../assets/images/notification.svg';
import Whiteplay from '../assets/images/white-play-button.svg';
import * as Progress from 'react-native-progress';
import cards from '../components/cards'; 
import subjects from '../components/subjects';
import Carousel from 'react-native-reanimated-carousel';
import { useRoute } from '@react-navigation/native';

const Home = () => {
  
    const route = useRoute();
    const name = route.params?.name || '';
    const width = Dimensions.get('window').width;   

    const pendingSubject = subjects.filter(subject => subject.status === 'Running...');       

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                    <View style={styles.header_left}>
                        <Image source={require('../assets/images/person.jpg')} style={styles.image1} />
                        <View style={styles.textContainer}>
                            <Text style={styles.text1}>Hey, {name}👋</Text>
                            <Text style={styles.text2}>Let's get started</Text>
                        </View>
                    </View>
                    <View style={styles.header_right}>
                        <NotificationIcon style={styles.notificationIcon} />
                        <View style={styles.dot}></View>
                    </View>
                </View>
                <Carousel
                loop
                width={width}
                height={220}
                autoPlay={true}
                data={subjects}
                scrollAnimationDuration={2000}
                renderItem={({ item }) => (
                    <View style={[styles.slider, item.style]}>
                        <View style={styles.slider_left}>
                            <Text style={styles.text3}>{item.ongoing}</Text>
                            <Text style={styles.text4}>{item.title}</Text>
                            <View style={styles.section1}>
                                <Text style={[styles.text5]}>{item.percentage}%</Text>
                                <Progress.Bar progress={item.progress} width={100} height={7} color={item.cardProgressBar} style={[styles.progressbar, {borderColor: item.cardProgressBarBorderColor}]} />
                            </View>
                            <TouchableOpacity style={[styles.slider_button, {backgroundColor: item.cardButton}]}>
                                <Text style={styles.text6}>Continue</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.slider_right}>
                            <Image source={item.image} style={styles.slider_image} />
                        </View>
                    </View>
                    )}
                />   
                <View style={styles.courseSection}>
                    <Text style={styles.text7}>Choose Your Course</Text>
                    <View style={styles.cardContainer}>
                        {cards.map((card) => (
                            <View key={card.key} style={[styles.courseCard, card.style]}>
                                <Text style={styles.text8}>{card.title}</Text>
                                <View style={styles.courseContainer}>
                                    <View style={styles.courseCard_left}>
                                        <Text style={[styles.text9, card.classColor]}>{card.classes} Classes</Text>
                                        <View style={styles.whiteplay_container}>
                                            <Whiteplay style={[styles.whiteplay, ]} />
                                        </View>
                                    </View>
                                    <View style={styles.courseCard_right}>
                                        <Image source={card.image} style={styles.ui} />
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
                <View style={styles.today}>
                    <Text style={styles.text10}>Today's Lecture</Text>
                    <View>
                        {pendingSubject.map((subject) => (
                            <View style={styles.today_section} key={subject.key}>
                                <View style={styles.today_imageContainer}>
                                    <Image source={subject.image} style={styles.today_image} />
                                </View>
                                <View style={styles.today_section2}>
                                    <Text style={styles.text11}>{subject.title}</Text>
                                    <Text style={styles.text12}>Running...</Text>
                                </View>
                                <Progress.Bar progress={subject.progress} width={170} height={8} color="#6367e9" style={styles.today_progressBar} />
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f5f7fb'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 30,
    },
    header_left: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 20,
    },
    image1: {
        width: 60,
        height: 60,
        borderRadius: 50,
    },
    textContainer: {
        marginLeft: 10,
    },
    text1: {
        fontSize: 18,
        color: '#000000',
        fontWeight: '500',
        marginBottom: 5,
        fontFamily: 'DMSans-Bold'
    },
    text2: {
        fontSize: 14,
        color: '#888888',
        fontFamily: 'DMSans-Medium'


    },
    header_right: {
        position: 'relative',
        marginRight: 20,
    },
    notificationIcon: {
    },
    dot: {
        width: 10,
        height: 10,
        backgroundColor: 'red',
        borderRadius: 10,
        position: 'absolute',
        right: 0,
        top: 2,
    },
    slider: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#6367e9',
        height: 180,
        paddingHorizontal: 10,
        marginHorizontal: 12,
        marginTop: 40,
        borderRadius: 25,
    },
    slider_left: {
        marginLeft: 10,
    },
    text3: {
        fontSize: 14,
        color: '#fff',
        marginBottom: 15,
        fontFamily: 'DMSans-Medium'

    },
    text4: {
        fontSize: 18,
        color: '#fff',
        fontWeight: '500',
        marginBottom: 8,
        fontFamily: 'DMSans-Bold'

    },
    text5: {
        fontSize: 14,
        color: '#fff',
        fontFamily: 'DMSans-Medium'

    },
    section1: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    slider_button: {
        backgroundColor: '#8689f2',
        width: 100,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 16,
        marginTop: 10,
    },
    text6: {
        fontSize: 14,
        color: '#fff',
        fontWeight: '500',
        fontFamily: 'DMSans-Bold'

    },
    slider_image: {
        width: 100,
        height: 100,
        marginRight: 20
    },
    progressbar: {
        backgroundColor: '#8689f2',
        borderColor: '#6367e9',
        marginLeft: 10,
    },
    courseSection: {
        marginTop: 30,
        paddingHorizontal: 10,
    },
    text7: {
        fontSize: 18,
        fontWeight: '500',
        color: '#555555',
        fontFamily: 'DMSans-Medium'

    },
    courseCard: {
        backgroundColor: '#6367e9',
        borderRadius: 9,
        width: 190,
        height: 160,
        marginTop: 10,
        marginLeft: 5,
    },
    courseContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    text8: {
        fontSize: 18,
        color: '#fff',
        fontWeight: '500',
        marginBottom: 10,
        marginLeft: 10,
        marginTop: 20,
        fontFamily: 'DMSans-Bold'

    },
    text9: {
        fontSize: 14,
        color: '#8db0ff',
        marginBottom: 30,
        fontFamily: 'DMSans-Medium'

    },
    ui: {
        width: 90,
        height: 90,
    },
    whiteplay_container: {
        backgroundColor: '#8cadff',
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
    },
    whiteplay: {
        padding: 10,
    },
    cardContainer: {
        flexWrap: 'wrap',
        height: 350,
    },
    today: {
        padding: 12,
    },
    text10: {
        fontSize: 18,
        fontWeight: '500',
        color: '#555555',
        fontFamily: 'DMSans-Medium'

    },
    today_section: {
        display: 'flex',
        flexDirection: 'row',
                direction: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginTop: 15,
        backgroundColor: '#FFFFFF',
        height: 90,
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 15
    },
    today_imageContainer: {
        width: 70,
        height: 60,
        backgroundColor: '#6367e9',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7,
    },
    today_image: {
        width: 50,
        height: 50,
    },
    today_section2: {
        flex: 1,
        marginLeft: 10,
    },
    text11: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        fontFamily: 'DMSans-Bold'

    },
    text12: {
        color: '#6367e9',
        marginTop: 8,
        fontFamily: 'DMSans-Medium'

    },
    today_progressBar: {
        backgroundColor: '#cbd6eb',
        borderColor: '#cbd6eb',
    },
});

