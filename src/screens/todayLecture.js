import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import subjects from '../components/subjects';
import * as Progress from 'react-native-progress';
import BackArrow from '../assets/images/back-arrow.svg';

const TodayLecture = () => {
    const [selectedTab, setSelectedTab] = useState('Lectures');
    const navigation = useNavigation();

    const handlePress = (tab) => {
        setSelectedTab(tab);
    };

    const handleLecturePress = (subject) => {
        navigation.navigate('ClassScreen', { subjectTitle: subject.title, });
    };

    const filteredSubjects = subjects.filter(subject => {
        if (selectedTab === 'Lectures') return true;
        if (selectedTab === 'Ongoing') return subject.status === 'Running...';
        if (selectedTab === 'Completed') return subject.status === 'Finished';
        return false;
    });

    return (
        <ScrollView>
            <TouchableOpacity style={styles.container}>
                <TouchableOpacity style={styles.backHeader}>
                    <BackArrow/>
                    <Text style={styles.headText}>Today's lectures</Text>
                </TouchableOpacity>
                <View style={styles.header}>
                    <TouchableOpacity
                        style={[styles.button1, selectedTab === 'Lectures' && styles.activeButton]}
                        onPress={() => handlePress('Lectures')}>
                        <Text style={[styles.text1, selectedTab === 'Lectures' && styles.clickedText]}>Lectures</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button1, selectedTab === 'Ongoing' && styles.activeButton]}
                        onPress={() => handlePress('Ongoing')}>
                        <Text style={[styles.text1, selectedTab === 'Ongoing' && styles.clickedText]}>Ongoing</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button1, selectedTab === 'Completed' && styles.activeButton]}
                        onPress={() => handlePress('Completed')}>
                        <Text style={[styles.text1, selectedTab === 'Completed' && styles.clickedText]}>Completed</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    {filteredSubjects.map((subject) => (
                        <TouchableOpacity key={subject.key} onPress={() => handleLecturePress(subject)}>
                            <View style={styles.Lecture_section}>
                                <View style={[styles.Lecture_imageContainer, subject.style]}>
                                    <Image source={subject.image} style={styles.Lecture_image} />
                                </View>
                                <View style={styles.Lecture_section2}>
                                    <Text style={styles.text2}>{subject.title}</Text>
                                    <Text style={[styles.text3, subject.statusColor]}>{subject.status}</Text>
                                </View>
                                <Progress.Bar
                                    progress={subject.progress}
                                    width={170}
                                    height={8}
                                    color={subject.progressColor}
                                    style={styles.Lecture_progressBar}
                                />
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default TodayLecture;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f5f7fb',
        height: '100%',
    },
    backHeader: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 30,
        marginLeft: 20,
        
    },
    headText: {
        fontSize: 18,
        marginLeft: 10,
        fontWeight: '500',
        fontFamily: 'DMSans-Medium'

    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginTop: 30,
    },
    button1: {
        height: 30,
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    activeButton: {
        borderBottomWidth: 2,
        borderBottomColor: '#6367e9',
    },
    text1: {
        fontSize: 18,
        fontWeight: '500',
        textAlign: 'center',
        fontFamily: 'DMSans-Medium'

    },
    clickedText: {
        color: '#6367e9',
        fontFamily: 'DMSans-Medium'

    },
    Lecture_section: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginTop: 15,
        backgroundColor: '#FFFFFF',
        height: 90,
        borderRadius: 10,
        paddingHorizontal: 15,
    },
    Lecture_imageContainer: {
        width: 70,
        height: 60,
        backgroundColor: '#6367e9',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7,
    },
    Lecture_image: {
        width: 50,
        height: 50,
    },
    Lecture_section2: {
        flex: 1,
        marginLeft: 10,
    },
    text2: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        fontFamily: 'DMSans-Bold'

    },
    text3: {
        marginTop: 8,
        fontFamily: 'DMSans-Medium'

    },
    Lecture_progressBar: {
        backgroundColor: '#cbd6eb',
        borderColor: '#cbd6eb',
    },
});
