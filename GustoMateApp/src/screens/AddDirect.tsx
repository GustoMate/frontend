import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView, Keyboard, Platform, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// 입력한 재료명이 다시 Home.tsx에 입력되는 과정 필요함!!! 아직 깡통

const AddDirect = () => {
  const [ingredientName, setIngredientName] = useState('');
  const [productName, setProductName] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const navigation = useNavigation();

  const isButtonActive = ingredientName !== '';

  const handleAdd = async () => {
    if (isButtonActive) {
      Keyboard.dismiss();
      try {
        const baseURL = Platform.OS === 'ios' ? 'http://localhost:3000' : 'http://10.0.2.2:3000';
        const response = await fetch(`${baseURL}/items`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: ingredientName,
            description: productName,
            expiration: expirationDate,
          }),
        });

        if (response.ok) {
          Alert.alert('성공', '재료가 추가되었습니다.', [
            {
              text: '확인',
              onPress: () => navigation.navigate('Home'),
            },
          ]);
        } else {
          Alert.alert('오류', '재료를 추가하는데 실패했습니다.');
        }
      } catch (error) {
        console.error('Error adding item:', error);
        Alert.alert('오류', '서버와의 통신에 실패했습니다.');
      }
    } else {
      Alert.alert('오류', '재료명을 입력해주세요.');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.headerText}>재료를 입력해주세요</Text>
        <Text style={styles.requiredText}>* 필수</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>재료명* </Text>
          <TextInput
            style={styles.textInput}
            value={ingredientName}
            onChangeText={setIngredientName}
            placeholder="재료명을 입력하세요"
            placeholderTextColor="#B3B3B3"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>구체적인 상품명 </Text>
          <TextInput
            style={styles.textInput}
            value={productName}
            onChangeText={setProductName}
            placeholder="구체적인 상품명을 입력하세요"
            placeholderTextColor="#B3B3B3"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>유통기한 </Text>
          <TextInput
            style={styles.textInput}
            value={expirationDate}
            onChangeText={setExpirationDate}
            placeholder="유통기한을 입력하세요"
            placeholderTextColor="#B3B3B3"
          />
        </View>

        <TouchableOpacity
          style={[styles.submitButton, !isButtonActive && styles.disabledButton]}
          disabled={!isButtonActive}
          onPress={handleAdd}
        >
          <Text style={[styles.submitButtonText, !isButtonActive && styles.disabledButtonText]}>추가</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
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

    textAlign: 'right',
    marginBottom: 20,
  },
  section: {
    width: '100%',
    maxWidth: 400,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#B3B3B3',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    height: 40,
  },
  submitButton: {
    backgroundColor: '#4ECB71',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 32,
    alignItems: 'center',
    marginTop: 20,
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

export default AddDirect;
