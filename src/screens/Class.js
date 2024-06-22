import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Video from 'react-native-video';
import Completed from '../assets/images/compleated.svg';
import Lock from '../assets/images/lock.svg';
import DropDown from '../assets/images/drop-down.svg';
import syllabus from '../components/syllabus';

const Class = () => {
    const route = useRoute();
    const { subjectTitle, subjectStatus } = route.params;
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [pressedIndex, setPressedIndex] = useState(null);
    const [isSectionVisible, setIsSectionVisible] = useState({ lesson1: true });
    const [activeSection, setActiveSection] = useState('lesson1');
    const [VideoUri, setVideoUri] = useState(null);
    const [text2, setText2] = useState(subjectTitle);
    const [isCompleted, setIsCompleted] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [completedLessons, setCompletedLessons] = useState({ lesson1: [], lesson2: [] });
    const videoRef = useRef(null);

    useEffect(() => {
        const lessons = syllabus[subjectTitle] || [];
        if (activeSection === 'lesson1' && lessons[0]?.lesson1) {
            setVideoUri(lessons[0].lesson1[pressedIndex]?.video || null);
            setText2(lessons[0].lesson1[pressedIndex]?.title || subjectTitle);
        } else if (activeSection === 'lesson2' && lessons[1]?.lesson2) {
            setVideoUri(lessons[1].lesson2[pressedIndex]?.video || null);
            setText2(lessons[1].lesson2[pressedIndex]?.title || subjectTitle);
        }
    }, [pressedIndex, activeSection, subjectTitle]);

    const handlePress = (index) => {
        setPressedIndex(index);
        setIsCompleted(false);
        setIsPlaying(false);
        const lessons = syllabus[subjectTitle] || [];
        if (activeSection === 'lesson1' && lessons[0]?.lesson1) {
            setVideoUri(lessons[0].lesson1[index]?.video || null);
            setText2(lessons[0].lesson1[index]?.title || subjectTitle);
        } else if (activeSection === 'lesson2' && lessons[1]?.lesson2) {
            setVideoUri(lessons[1].lesson2[index]?.video || null);
            setText2(lessons[1].lesson2[index]?.title || subjectTitle);
        }
    };

    const toggleCompletion = () => {
        if (pressedIndex !== null) {
            const sectionLessons = [...completedLessons[activeSection]];
            if (!sectionLessons.includes(pressedIndex)) {
                sectionLessons.push(pressedIndex);
                setCompletedLessons({ ...completedLessons, [activeSection]: sectionLessons });
            }
        }
    };

    const toggleSection = (section) => {
        setIsSectionVisible(prevState => ({ ...prevState, [section]: !prevState[section] }));
        setActiveSection(section);
    };

    const handleEnd = () => {
        setIsCompleted(true);
        setIsPlaying(false);
    };

    const handlePlay = () => {
        setIsPlaying(true);
        setIsCompleted(false);
    };

    const sectionHeight = useRef(new Animated.Value(200)).current;

    const animateSectionHeight = (toValue) => {
        Animated.timing(sectionHeight, {
            toValue,
            duration: 300,
            useNativeDriver: false,
        }).start();
    };

    useEffect(() => {
        const height = isSectionVisible[activeSection] ? 350 : 0;
        animateSectionHeight(height);
    }, [isSectionVisible, activeSection]);

    const lessons = syllabus[subjectTitle] || [];
    const hasLesson2 = lessons[1]?.lesson2 && lessons[1].lesson2.length > 0;

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
            <View style={styles.section1}>
                <Video
                    ref={videoRef}
                    source={{ uri: VideoUri }}
                    style={styles.backgroundVideo}
                    controls={true}
                    volume={10}
                    fullscreenOrientation='landscape'
                    resizeMode="contain"
                    onPlay={handlePlay}
                    onPause={() => setIsPlaying(false)}
                    onEnd={handleEnd}
                />
            </View>
            <View style={styles.section2}>
                <View style={styles.section2_left}>
                    <Text style={styles.text1}>Introduction</Text>
                    <Text style={styles.text2}>{text2}</Text>
                </View>
                <TouchableOpacity style={styles.section2_right} onPress={toggleCompletion}>
                    <Completed style={styles.completed} />
                    <Text style={styles.text3}>Mark as Completed</Text>
                </TouchableOpacity>
            </View>
            <ScrollView>
                <TouchableOpacity style={styles.section3} onPress={() => toggleSection('lesson1')}>
                    <Text style={styles.text4}>Lesson1</Text>
                    <DropDown style={styles.dropDown} />
                </TouchableOpacity>
                {activeSection === 'lesson1' && lessons[0]?.lesson1 && (
                    <Animated.View style={[styles.section4, { height: sectionHeight }]}>
                        {lessons[0].lesson1.map((lesson, index) => (
                            <TouchableOpacity
                                key={lesson.key}
                                style={[
                                    styles.chapters,
                                    hoveredIndex === index && styles.chapterHover,
                                    pressedIndex === index && styles.chapterPressed
                                ]}
                                onPress={() => handlePress(index)}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            >
                                <View style={styles.chapters_left}>
                                    {(completedLessons.lesson1.includes(index) || subjectStatus === 'Finished') ? (
                                        <Completed fill={'#fff'} style={styles.completed} />
                                    ) : (
                                        <Lock fill={'#fff'} style={styles.completed} />
                                    )}
                                    <Text style={[styles.text5, (hoveredIndex === index || pressedIndex === index) && styles.chapterPressed_text]}>
                                        {lesson.title}
                                    </Text>
                                </View>
                                <View style={styles.chapters_right}>
                                    <Text style={[styles.text6, (hoveredIndex === index || pressedIndex === index) && styles.chapterPressed_text]}>
                                        {lesson.duration}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </Animated.View>
                )}
                {hasLesson2 && (
                    <>
                        <TouchableOpacity style={styles.section3} onPress={() => toggleSection('lesson2')}>
                            <Text style={styles.text4}>Lesson2</Text>
                            <DropDown style={styles.dropDown} />
                        </TouchableOpacity>
                        {activeSection === 'lesson2' && lessons[1]?.lesson2 && (
                            <Animated.View style={[styles.section4, { height: sectionHeight }]}>
                                {lessons[1].lesson2.map((lesson, index) => (
                                    <TouchableOpacity
                                        key={lesson.key}
                                        style={[
                                            styles.chapters,
                                            hoveredIndex === index && styles.chapterHover,
                                            pressedIndex === index && styles.chapterPressed
                                        ]}
                                        onPress={() => handlePress(index)}
                                        onMouseEnter={() => setHoveredIndex(index)}
                                        onMouseLeave={() => setHoveredIndex(null)}
                                    >
                                        <View style={styles.chapters_left}>
                                            {(completedLessons.lesson2.includes(index) || subjectStatus === 'Finished') ? (
                                            <Completed fill={'#fff'} style={styles.completed} />
                                            ) : (
                                                <Lock fill={'#fff'} style={styles.completed} />
                                            )}
                                            <Text style={[
                                                styles.text5,
                                                (hoveredIndex === index || pressedIndex === index) && styles.chapterPressed_text
                                            ]}>
                                                {lesson.title}
                                            </Text>
                                        </View>
                                        <View style={styles.chapters_right}>
                                            <Text style={[
                                                styles.text6,
                                                (hoveredIndex === index || pressedIndex === index) && styles.chapterPressed_text
                                            ]}>
                                                {lesson.duration}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                ))}
                            </Animated.View>
                        )}
                    </>
                )}
            </ScrollView>
        </ScrollView>
    );
};


export default Class;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f5f7fb'
    },
    backgroundVideo: {
        height: 250,
        width: '100%',
    },
    section2: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        marginTop: 20
    },
    text1: {
        fontSize: 25,
        fontWeight: '500',
        color: '#000',
        fontFamily: 'DMSans-Bold'

    },
    text2: {
        fontSize: 16,
        marginTop: 5,
        fontFamily: 'DMSans-Medium'

    },
    section2_right:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        borderWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderColor: '#726aeb',
        borderRadius: 7
    },
    text3: {
        marginLeft: 8,
        color: '#726aeb',
        fontWeight: '500',
        fontFamily: 'DMSans-Medium'

    },
    section3: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        marginTop: 30,
        borderWidth: 0.2,
        height: 60,
        marginHorizontal: 15,
        borderRadius: 3,
        backgroundColor: '#fff',
        borderColor: '#eaeaeb'
    },
    text4: {
        fontSize: 18,
        fontWeight: '500',
        color: '#272727',
        fontFamily: 'DMSans-Bold'

    },
    section4: {
        overflow: 'hidden',
    },
    chapters: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10,
        marginHorizontal: 15,
        paddingHorizontal: 30,
        height: 60,
        borderRadius: 4,
    },
    chapterHover: {
        backgroundColor: '#726aeb'
    },
    chapterPressed:{
        backgroundColor: '#726aeb'
    },
    chapters_left: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    text5: {
        fontSize: 16,
        marginLeft: 8,
        fontFamily: 'DMSans-Medium'

    },
    chapterPressed_text: {
        color: '#fff',
        fontFamily: 'DMSans-Medium'

    },
});
