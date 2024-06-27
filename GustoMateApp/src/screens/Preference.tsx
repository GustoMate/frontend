import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView, Keyboard, SafeAreaView, Picker } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import GlobalStyles from '../styles/GlobalStyles';

const PreferenceScreen = () => {
    const [spiceLevel, setSpiceLevel] = useState('');
    const [cookingSkill, setCookingSkill] = useState('');
    const [isDieting, setIsDieting] = useState('');
    const [hasAllergies, setHasAllergies] = useState('');
    const [allergyTypes, setAllergyTypes] = useState<string[]>([]);
    const [otherAllergy, setOtherAllergy] = useState('');

    const isButtonActive = spiceLevel && cookingSkill && isDieting && hasAllergies && (hasAllergies === '없어요' || (hasAllergies === '있어요' && (allergyTypes.length > 0 || otherAllergy)));

    const navigation = useNavigation();

    const handleSubmit = () => {
        if (isButtonActive) {
            Keyboard.dismiss();
            navigation.navigate('MainTabNavigator');
        }
    };

    const toggleAllergyType = (type: string) => {
        if (allergyTypes.includes(type)) {
            setAllergyTypes(allergyTypes.filter(allergy => allergy !== type));
        } else {
            setAllergyTypes([...allergyTypes, type]);
        }
    };

    return (
        <SafeAreaView style={GlobalStyles.AndroidSafeArea1}>
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.headerText}>
                    선호도를 알려주시면 레시피 추천에 도움이 돼요
                </Text>
                <View style={styles.section}>
                        <Text style={styles.sectionTitle}>맵기 정도</Text>
                        <ScrollView
                            horizontal
                            contentContainerStyle={styles.horizontalScrollContainer}
                            showsHorizontalScrollIndicator={false}
                        >
                            {Array.from({ length: 10 }, (_, i) => (
                                <TouchableOpacity
                                    key={i}
                                    style={[styles.numberButton, spiceLevel === `${i}` && styles.activeButton]}
                                    onPress={() => setSpiceLevel(`${i}`)}
                                >
                                    <Text style={[styles.buttonText, spiceLevel === `${i}` && styles.activeButtonText]}>{i}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>요리 난이도</Text>
                    <View style={styles.buttonContainer}>
                        {['왕초보', '초보', '중급', '고수'].map((skill) => (
                            <TouchableOpacity
                                key={skill}
                                style={[styles.button, cookingSkill === skill && styles.activeButton]}
                                onPress={() => setCookingSkill(skill)}
                            >
                                <Text style={[styles.buttonText, cookingSkill === skill && styles.activeButtonText]}>{skill}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>다이어트 여부</Text>
                    <View style={styles.buttonContainer}>
                        {['안해요', '다이어트 중이에요'].map((diet) => (
                            <TouchableOpacity
                                key={diet}
                                style={[styles.button, isDieting === diet && styles.activeButton]}
                                onPress={() => setIsDieting(diet)}
                            >
                                <Text style={[styles.buttonText, isDieting === diet && styles.activeButtonText]}>{diet}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>알레르기 여부</Text>
                    <View style={styles.buttonContainer}>
                        {['없어요', '있어요'].map((allergy) => (
                            <TouchableOpacity
                                key={allergy}
                                style={[styles.button, hasAllergies === allergy && styles.activeButton]}
                                onPress={() => {
                                    setHasAllergies(allergy);
                                    if (allergy === '없어요') {
                                        setAllergyTypes([]);
                                        setOtherAllergy('');
                                    }
                                }}
                            >
                                <Text style={[styles.buttonText, hasAllergies === allergy && styles.activeButtonText]}>{allergy}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {hasAllergies === '있어요' && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>알레르기 종류</Text>
                        <View style={styles.buttonContainer}>
                            {['달걀', '생선', '조개', '땅콩', '우유', '밀', '밤', '콩'].map((type) => (
                                <TouchableOpacity
                                    key={type}
                                    style={[styles.button, allergyTypes.includes(type) && styles.activeButton]}
                                    onPress={() => toggleAllergyType(type)}
                                >
                                    <Text style={[styles.buttonText, allergyTypes.includes(type) && styles.activeButtonText]}>{type}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                        <TextInput
                            style={styles.textInput}
                            value={otherAllergy}
                            onChangeText={setOtherAllergy}
                            placeholder="기타 알레르기 (입력하세요)"
                            placeholderTextColor="#B3B3B3"
                        />
                    </View>
                )}
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
        marginBottom: 30,
        color: '#4ECB71',
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
    numberButton: {
        width: 25,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#B3B3B3',
        borderRadius: 25,
        margin: 5,
    },
    horizontalScrollContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonText: {
        color: '#000',
        justifyContent: 'center',
    },
    activeButtonText: {
        color: '#FFF',
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#B3B3B3',
        borderRadius: 20,
        paddingVertical: 8,
        paddingHorizontal: 16,
        height: 40,
        marginTop: 10,
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

export default PreferenceScreen;
