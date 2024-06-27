import * as React from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity, SafeAreaView, Platform, Image, TextInput } from 'react-native';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import GlobalStyles from '../styles/GlobalStyles';

const AddIngredient: React.FC = () => {
    const [receiptList, setReceiptList] = React.useState([]); 
    const [isEditingDate, setIsEditingDate] = React.useState(false); // 날짜 편집 상태
    const [year, setYear] = React.useState('2024년');
    const [month, setMonth] = React.useState('6월');
    const [day, setDay] = React.useState('2일');

    const toggleEditingDate = () => {
        setIsEditingDate(!isEditingDate);
    }   

    useEffect(() => {
        const fetchReceipt = async () => {
            try {
                const baseURL = Platform.OS === 'ios' ? 'http://localhost:3000' : 'http://10.0.2.2:3000';
                const response = await fetch(`${baseURL}/receiptList`);
                const data = await response.json();
                if (response.ok) {
                    setReceiptList(data.receipt);
                } else {
                    console.error('Error fetching receipt:', data.message);
                }
            } catch (error) {
                console.error('Error fetching receipt:', error);
            }
        };
    
        fetchReceipt();
    }, []);


    return(
        <SafeAreaView style={GlobalStyles.AndroidSafeArea1}>
            <View style={styles.container}>
                <Text style={styles.header}>냉장고 재료 등록하기</Text>
                <Image source={require('../assets/images/receipt.jpg')} style={styles.receiptImage}/>
                <View style={styles.dataContainer}>
                    {isEditingDate ? (
                        <>
                            <TextInput
                                style={styles.dateInput}
                                value={year}
                                onChangeText={setYear}
                            />
                            <TextInput
                                style={styles.dateInput}
                                value={month}
                                onChangeText={setMonth}
                            />
                            <TextInput
                                style={styles.dateInput}
                                value={day}
                                onChangeText={setDay}
                            />
                        </>
                    ) : (
                        <>
                            <Text style={styles.dataText}>{year}</Text>
                            <Text style={styles.dataText}>{month} {day}</Text>
                        </>
                    )}
                    <TouchableOpacity style={styles.editButton} onPress={toggleEditingDate}>
                        <Text style={styles.editButtonText}>{isEditingDate ? '저장하기' : '수정하기'}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.receiptDetails}>
                    <Text style={styles.detailsHeader}> 영수증 내역 </Text>
                    <View style={styles.receiptRow}>
                        <Text style={styles.receiptColumn}>상품명</Text>
                        <Text style={styles.receiptColumn}>상품명</Text>
                        <Text style={styles.receiptColumn}>상품명</Text>
                        <Text style={styles.receiptColumn}>상품명</Text>
                    </View>
                    <View style={styles.receiptRow}>
                        <Text style={styles.receiptColumn}>상품명</Text>
                        <Text style={styles.receiptColumn}>상품명</Text>
                        <Text style={styles.receiptColumn}>상품명</Text>
                        <Text style={styles.receiptColumn}>상품명</Text>
                    </View>
                    <View style={styles.receiptRow}>
                        <Text style={styles.receiptColumn}>상품명</Text>
                        <Text style={styles.receiptColumn}>상품명</Text>
                        <Text style={styles.receiptColumn}>상품명</Text>
                        <Text style={styles.receiptColumn}>상품명</Text>
                    </View>
                </View>
                
            </View>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
      },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#323232',
    },
    receiptImage: {
        width: '90%',
        backgroundColor: '#515151',
        height: 150,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    dataContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    dataText: {
        fontSize: 18,
    },
    dateInput: {
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#ccc',
        marginRight: 10,
        padding: 5,
    },
    editButton: {
        backgroundColor: '#e0e0e0',
        padding: 10,
        borderRadius: 5,
    },
    editButtonText: {
        fontSize: 16,
    },
    receiptDetails: {
        backgroundColor: '#f9f9f9',
        padding: 10,
        borderRadius: 10,
        marginBottom: 20,
    },
    detailsHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    receiptRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    receiptColumn: {
        flex: 1,
        fontSize: 14,
        textAlign: 'center',
    },
});

export default AddIngredient;
