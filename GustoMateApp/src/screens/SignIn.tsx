import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Keyboard, Platform, Alert, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import GlobalStyles from '../styles/GlobalStyles';

const SignInScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [region, setRegion] = useState('');

  const navigation = useNavigation();

//   const handleSignIn = async () => {
//     try {
//       const baseURL = Platform.OS === 'ios' ? 'http://localhost:3000' : 'http://10.0.2.2:3000';
//       const response = await fetch(`${baseURL}/signin`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           username,
//           password,
//           nickname,
//           email,
//           region,
//         }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         Alert.alert('Success', 'Logged in successfully');
//         navigation.navigate('Preference', {
//           username,
//           password,
//           nickname,
//           email,
//           region,
//         });
//       } else {
//         Alert.alert('Error', data.message || 'Login failed');
//       }
//     } catch (error) {
//       Alert.alert('Error', 'Something went wrong. Please try again later.');
//     }
//   };

  const handleSignIn = async () => {
    // 서버 요청 생략하고 일단 다음 화면으로 이동 ...
    if (username && password && nickname && email && region) {
      navigation.navigate('Preference', {
        username,
        password,
        nickname,
        email,
        region,
      });
    } else {
      Alert.alert('Error', 'All fields are required');
    }
  };

  return (
  <SafeAreaView style={GlobalStyles.AndroidSafeArea1}>
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.headerText}>로그인</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>아이디</Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          placeholder="아이디를 입력하세요"
          placeholderTextColor="#B3B3B3"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>비밀번호</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="비밀번호를 입력하세요"
          placeholderTextColor="#B3B3B3"
          secureTextEntry
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>닉네임</Text>
        <TextInput
          style={styles.input}
          value={nickname}
          onChangeText={setNickname}
          placeholder="닉네임을 입력하세요"
          placeholderTextColor="#B3B3B3"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>이메일 주소</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="이메일 주소를 입력하세요"
          placeholderTextColor="#B3B3B3"
          keyboardType="email-address"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>지역</Text>
        <TextInput
          style={styles.input}
          value={region}
          onChangeText={setRegion}
          placeholder="지역을 입력하세요"
          placeholderTextColor="#B3B3B3"
        />
      </View>
      <TouchableOpacity
        style={[styles.button, !username || !password || !nickname || !email || !region ? styles.disabledButton : null]}
        onPress={handleSignIn}
        disabled={!username || !password || !nickname || !email || !region}
      >
        <Text style={styles.buttonText}>다음</Text>
      </TouchableOpacity>
    </ScrollView>
  </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#323232',
    marginBottom: 24,
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: '#323232',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#B3B3B3',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    height: 40,
    backgroundColor: '#F5F5F5',
  },
  button: {
    backgroundColor: '#4ECB71',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 32,
    alignItems: 'center',
    marginTop: 24,
  },
  disabledButton: {
    backgroundColor: '#B3B3B3',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SignInScreen;
