import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, SafeAreaView, Alert, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import GlobalStyles from '../styles/GlobalStyles';

const OCRScreen = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const navigation = useNavigation();

    const pickImage = () => {
        const localImage = require('../assets/images/receipt_image.jpg');
        setSelectedImage(localImage);
    };

    const handleOCR = async () => {
        try {
            const baseURL = Platform.OS === 'ios' ? 'http://localhost:8000' : 'http://10.0.2.2:8000';
            const response = await fetch(`${baseURL}/OCR`);
            const data = await response.json();
            if (response.ok) {
                console.log(data);
                navigation.navigate('AddIngredient', { ocrResults: data });
            } else {
                console.error('Error fetching OCR results:', data.detail);
                Alert.alert('Error', 'Failed to get OCR results');
            }
        } catch (error) {
            console.error('Error fetching OCR results:', error);
            Alert.alert('Error', 'An error occurred while processing OCR');
        }
    };

    return (
        <SafeAreaView style={GlobalStyles.AndroidSafeArea1}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>영수증 사진을 올려보세요</Text>
            </View>

            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    {selectedImage ? (
                        <Image source={selectedImage} style={styles.image} />
                    ) : (
                        <Text style={styles.imagePlaceholderText}>이미지가 여기에 표시됩니다</Text>
                    )}
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={pickImage}>
                        <Text style={styles.buttonText}>사진 업로드</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={handleOCR}>
                        <Text style={styles.buttonText}>OCR</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: '#ffffff',
        paddingHorizontal: 16,
        borderBottomColor: '#e0e0e0',
        marginBottom: 16,
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#323232',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
    },
    imageContainer: {
        width: '100%',
        height: 500,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#B3B3B3',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    image: {
        width: '90%',
        height: '90%',
        resizeMode: 'cover',
    },
    imagePlaceholderText: {
        fontSize: 16,
        color: '#B3B3B3',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    button: {
        flex: 1,
        backgroundColor: '#4ECB71',
        borderRadius: 8,
        paddingVertical: 12,
        alignItems: 'center',
        marginHorizontal: 5,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default OCRScreen;
