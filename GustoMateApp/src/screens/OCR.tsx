import * as React from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity,SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import GlobalStyles from '../styles/GlobalStyles';
import AddIngredient from './AddIngredient';

const OCRScreen = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={GlobalStyles.AndroidSafeArea1}>
            <View style={styles.imageContainer}>

            </View>
            <Text>OCR here!</Text>
            <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddIngredient')}>
                <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addButton: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        backgroundColor: '#4CAF50',
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
      },
    addButtonText: {
    fontSize: 36,
    color: '#fff',
    },
});

export default OCRScreen;