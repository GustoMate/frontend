import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, SafeAreaView, ScrollView, Alert, Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import GlobalStyles from '../styles/GlobalStyles';

const AddIngredient = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const ocrResults = route.params?.ocrResults || [];

    const transformOCRData = (ocrData) => {
        const items = ocrData[0].Item;
        const cleanedItems = ocrData[0]["Cleaned Item"];

        return Object.keys(items).map((key, index) => ({
            id: index + 1,
            name: cleanedItems[key],
            description: items[key],
            expiration: '2024-08-28' // 예시로 유통기한을 임의로 설정
        }));
    };

    const [receiptList, setReceiptList] = useState([]);
    const [isEditing, setIsEditing] = useState({});
    const [year, setYear] = useState('2024년');
    const [month, setMonth] = useState('6월');
    const [day, setDay] = useState('28일');

    useEffect(() => {
        if (ocrResults.length > 0) {
            setReceiptList(transformOCRData(ocrResults));
        }
    }, [ocrResults]);

    const handleEditToggle = (id, key) => {
        setIsEditing(prev => ({
            ...prev,
            [`${id}-${key}`]: !prev[`${id}-${key}`]
        }));
    };

    const handleInputChange = (id, key, value) => {
        setReceiptList(prev =>
            prev.map(item =>
                item.id === id ? { ...item, [key]: value } : item
            )
        );
    };

    const handleRegister = () => {
        console.log('Registered:', receiptList);
        // Home 화면으로 데이터 전달
        navigation.navigate('Home', { newIngredients: receiptList });
    };

    return (
        <SafeAreaView style={GlobalStyles.AndroidSafeArea1}>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>냉장고 재료 등록하기</Text>
            </View>

            <View style={styles.container}>
                <View style={styles.dateContainer}>
                    <Text style={styles.dateText}>{year} {month} {day}</Text>
                </View>
                <ScrollView style={styles.scrollView}>
                    <View style={styles.receiptDetails}>
                        <Text style={styles.detailsHeader}>영수증 내역</Text>
                        <View style={styles.receiptRow}>
                            <Text style={[styles.receiptColumn, styles.ingredientColumn, styles.columnHeader]}>식재료명</Text>
                            <Text style={[styles.receiptColumn, styles.descriptionColumn, styles.columnHeader]}>상세 설명</Text>
                            <Text style={[styles.receiptColumn, styles.expiryDateColumn, styles.columnHeader]}>유통기한</Text>
                        </View>
                        {receiptList.map((item) => (
                            <View key={item.id} style={styles.receiptRow}>
                                <TouchableOpacity
                                    style={[styles.receiptColumn, styles.ingredientColumn]}
                                    onPress={() => handleEditToggle(item.id, 'ingredient')}
                                >
                                    {isEditing[`${item.id}-ingredient`] ? (
                                        <TextInput
                                            style={styles.input}
                                            value={item.name}
                                            onChangeText={(value) => handleInputChange(item.id, 'name', value)}
                                            onBlur={() => handleEditToggle(item.id, 'ingredient')}
                                            autoFocus
                                        />
                                    ) : (
                                        <Text style={styles.receiptText}>{item.name}</Text>
                                    )}
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.receiptColumn, styles.descriptionColumn]}
                                    onPress={() => handleEditToggle(item.id, 'description')}
                                >
                                    {isEditing[`${item.id}-description`] ? (
                                        <TextInput
                                            style={styles.input}
                                            value={item.description}
                                            onChangeText={(value) => handleInputChange(item.id, 'description', value)}
                                            onBlur={() => handleEditToggle(item.id, 'description')}
                                            autoFocus
                                        />
                                    ) : (
                                        <Text style={styles.receiptText}>{item.description}</Text>
                                    )}
                                </TouchableOpacity>
                                <View style={[styles.receiptColumn, styles.expiryDateColumn]}>
                                    <TextInput
                                        style={styles.input}
                                        value={item.expiration}
                                        onChangeText={(value) => handleInputChange(item.id, 'expiration', value)}
                                        placeholder="유통기한 입력"
                                    />
                                </View>
                            </View>
                        ))}
                    </View>
                </ScrollView>
                <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
                    <Text style={styles.registerButtonText}>등록</Text>
                </TouchableOpacity>
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
    header: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#323232',
    },
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    dateContainer: {
        flexDirection: 'row',
        borderColor: '#D9D9D9',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    dateText: {
        fontSize: 16,
    },
    scrollView: {
        flex: 1,
    },
    receiptDetails: {
        backgroundColor: '#FFF',
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#D9D9D9',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        width: '100%',
    },
    detailsHeader: {
        fontSize: 16,
        color: '#323232',
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    receiptRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        width: '100%',
    },
    receiptColumn: {
        padding: 5,
        textAlign: 'center',
    },
    ingredientColumn: {
        flex: 2,
    },
    descriptionColumn: {
        flex: 4,
    },
    expiryDateColumn: {
        flex: 2,
    },
    input: {
        fontSize: 14,
        borderBottomWidth: 1,
        borderColor: '#ccc',
        padding: 5,
        textAlign: 'center',
    },
    registerButton: {
        backgroundColor: '#4ECB71',
        borderRadius: 8,
        paddingVertical: 12,
        alignItems: 'center',
        marginTop: 20,
    },
    registerButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    receiptText: {
        fontSize: 14,
        color: '#323232',
    },
    columnHeader: {
        fontWeight: 'bold',
        color: '#323232',
    },
});

export default AddIngredient;
