import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView, Keyboard, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import GlobalStyles from '../styles/GlobalStyles';

const QuestionScreen = () => {
const [foodType, setFoodType] = useState('');
const [country, setCountry] = useState('');
const [cookingTime, setCookingTime] = useState('');
const [situationInput, setSituationInput] = useState('');

const isButtonActive = foodType && country && cookingTime;
const navigation = useNavigation();

const handleSubmit = () => {
    if (isButtonActive) {
        Keyboard.dismiss();
        navigation.navigate('RecipeResult');
    }
};

return (
    <SafeAreaView style={GlobalStyles.AndroidSafeArea1}>
    <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Text style={styles.headerText}>
                몇 가지를 알려주시면 레시피를 추천해드릴게요
            </Text>
            <Text style={styles.requiredText}>* 필수</Text>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>음식 종류* </Text>
                <View style={styles.buttonContainer}>
                    {['메인요리', '반찬', '디저트'].map((type) => (
                        <TouchableOpacity
                            key={type}
                            style={[styles.button, foodType === type && styles.activeButton]}
                            onPress={() => setFoodType(type)}
                        >
                            <Text style={[styles.buttonText, foodType === type && styles.activeButtonText]}>{type}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>선호하는 국가 음식* </Text>
                <View style={styles.buttonContainer}>
                    {['한식', '양식', '일식', '중식', '퓨전', '멕시칸', '이탈리안', '동남아시아'].map((cuisine) => (
                        <TouchableOpacity
                            key={cuisine}
                            style={[styles.button, country === cuisine && styles.activeButton]}
                            onPress={() => setCountry(cuisine)}
                        >
                            <Text style={[styles.buttonText, country === cuisine && styles.activeButtonText]}>{cuisine}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>최대 조리 시간* </Text>
                <View style={styles.buttonContainer}>
                    {['15분', '30분', '60분', '상관없어요'].map((time) => (
                        <TouchableOpacity
                            key={time}
                            style={[styles.button, cookingTime === time && styles.activeButton]}
                            onPress={() => setCookingTime(time)}
                        >
                            <Text style={[styles.buttonText, cookingTime === time && styles.activeButtonText]}>{time}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>추천받고 싶은 상황</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="예시) 매운 음식 땡길 때"
                    placeholderTextColor="#B3B3B3"
                    value={situationInput}
                    onChangeText={setSituationInput}
                    multiline
                    scrollEnabled
                    onSubmitEditing={handleSubmit}
                    returnKeyType="done"
                />
            </View>
        </ScrollView>

            <TouchableOpacity
                style={[styles.submitButton, !isButtonActive && styles.disabledButton]}
                disabled={!isButtonActive}
                onPress={handleSubmit}
            >
                <Text style={[styles.submitButtonText, !isButtonActive && styles.disabledButtonText]}>추천받기</Text>
            </TouchableOpacity>
    </View>
    </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        padding: 20,
    },
    scrollContainer: {
        padding: 5,
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#323232',
    },
    requiredText: {
        fontSize: 12,
        color: '#FF0000',
        textAlign: 'right',
        marginBottom: 20,
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#323232',
        paddingHorizontal: 8,
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    button: {
        borderWidth: 1,
        borderColor: '#B3B3B3',
        borderRadius: 20,
        paddingVertical: 8,
        paddingHorizontal: 16,
        margin: 5,
    },
    activeButton: {
        backgroundColor: '#4ECB71',
        borderColor: '#4ECB71',
    },
    buttonText: {
        color: '#000',
        justifyContent: 'center'
    },
    activeButtonText: {
        color: '#FFF',
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#B3B3B3',
        borderRadius: 20,
        paddingVertical: 1,
        paddingHorizontal: 16,
        height: 35,  // 입력란의 고정 높이
    },
    submitButton: {
        backgroundColor: '#4ECB71',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 32,
        alignItems: 'center',
        marginBottom: 20,
    },
    disabledButton: {
        backgroundColor: '#B3B3B3',
    },
    submitButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    disabledButtonText: {
        color: '#FFF',
    },
});

export default QuestionScreen;
