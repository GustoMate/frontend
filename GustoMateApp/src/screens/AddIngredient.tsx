import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import GlobalStyles from '../styles/GlobalStyles';

const initialReceiptData = [
    {
        id: 1,
        ingredient: '계란',
        description: '풀무원 신선한 목초란 12구',
        quantity: '1',
        expiryDate: ''
    },
    {
        id: 2,
        ingredient: '라면',
        description: '농심) 신라면',
        quantity: '1',
        expiryDate: ''
    }
];

// 데이터 냉장고로 보내는 과정 필요

const AddIngredient: React.FC = () => {
    const [receiptList, setReceiptList] = useState(initialReceiptData);
    const [isEditing, setIsEditing] = useState<{ [key: string]: boolean }>({});
    const [year, setYear] = useState('2024년');
    const [month, setMonth] = useState('6월');
    const [day, setDay] = useState('28일');
    const navigation = useNavigation();

    const handleEditToggle = (id: number, key: string) => {
        setIsEditing(prev => ({
            ...prev,
            [`${id}-${key}`]: !prev[`${id}-${key}`]
        }));
    };

    const handleInputChange = (id: number, key: string, value: string) => {
        setReceiptList(prev =>
            prev.map(item =>
                item.id === id ? { ...item, [key]: value } : item
            )
        );
    };

    const handleExpiryDateChange = (id: number, value: string) => {
        setReceiptList(prev =>
            prev.map(item =>
                item.id === id ? { ...item, expiryDate: value } : item
            )
        );
    };

    const handleRegister = () => {
        // Handle register logic
        console.log('Registered:', receiptList);
        // 서버에 데이터 저장 로직 추가
        // 데이터를 저장한 후 Home으로 이동
        navigation.navigate('Home');
    };

    return (
        <SafeAreaView style={GlobalStyles.AndroidSafeArea1}>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>냉장고 재료 등록하기</Text>
            </View>

            <View style={styles.container}>
                <View style={styles.dateContainer}>
                    <Text style={styles.dateText}>{year} {month} {day}</Text>
                    {/* <TouchableOpacity style={styles.editButton} onPress={() => {}}>
                        <Text style={styles.editButtonText}>수정하기</Text>
                    </TouchableOpacity> */}
                </View>
                <View style={styles.receiptDetails}>
                    <Text style={styles.detailsHeader}>영수증 내역</Text>
                    <View style={styles.receiptRow}>
                        <Text style={[styles.receiptColumn, styles.ingredientColumn, styles.columnHeader]}>식재료명</Text>
                        <Text style={[styles.receiptColumn, styles.descriptionColumn, styles.columnHeader]}>상세 설명</Text>
                        <Text style={[styles.receiptColumn, styles.quantityColumn, styles.columnHeader]}>수량</Text>
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
                                        value={item.ingredient}
                                        onChangeText={(value) => handleInputChange(item.id, 'ingredient', value)}
                                        onBlur={() => handleEditToggle(item.id, 'ingredient')}
                                        autoFocus
                                    />
                                ) : (
                                    <Text style={styles.receiptText}>{item.ingredient}</Text>
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
                            <TouchableOpacity
                                style={[styles.receiptColumn, styles.quantityColumn]}
                                onPress={() => handleEditToggle(item.id, 'quantity')}
                            >
                                {isEditing[`${item.id}-quantity`] ? (
                                    <TextInput
                                        style={styles.input}
                                        value={item.quantity}
                                        onChangeText={(value) => handleInputChange(item.id, 'quantity', value)}
                                        onBlur={() => handleEditToggle(item.id, 'quantity')}
                                        autoFocus
                                    />
                                ) : (
                                    <Text style={styles.receiptText}>{item.quantity}</Text>
                                )}
                            </TouchableOpacity>
                            <View style={[styles.receiptColumn, styles.expiryDateColumn]}>
                                <TextInput
                                    style={styles.input}
                                    value={item.expiryDate}
                                    onChangeText={(value) => handleExpiryDateChange(item.id, value)}
                                    placeholder="유통기한 입력"
                                />
                            </View>
                        </View>
                    ))}
                </View>
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
    // editButton: {
    //     backgroundColor: '#e0e0e0',
    //     padding: 10,
    //     borderRadius: 5,
    // },
    // editButtonText: {
    //     fontSize: 10,
    // },
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
    quantityColumn: {
        flex: 1,
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
