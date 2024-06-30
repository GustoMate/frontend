import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Platform, Alert, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import GlobalStyles from '../styles/GlobalStyles';
import { login as kakaoLogin, getProfile as getKakaoProfile } from '@react-native-seoul/kakao-login';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const baseURL = Platform.OS === 'ios' ? 'http://localhost:8000' : 'http://10.0.2.2:8000';
      const formBody = new URLSearchParams();
      formBody.append('username', username);  // email 대신 username 사용
      formBody.append('password', password);

      const response = await fetch(`${baseURL}/account/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody.toString(),
      });
      console.log('Request Body:', formBody.toString());  // 디버깅을 위해 요청 본문 출력

      const responseText = await response.text();
      console.log('Response Text:', responseText);  // 디버깅을 위해 응답 텍스트 출력

      try {
        const data = JSON.parse(responseText);
        console.log('Response Data:', data);  // 디버깅을 위해 응답 데이터 출력

        if (response.ok) {
          navigation.navigate('MainTabNavigator');  // 네비게이션 페이지 이름 확인
        } else {
          Alert.alert('Error', data.detail || '로그인 실패');
        }
      } catch (error) {
        console.error('Error parsing JSON:', error);
        Alert.alert('Error', '서버 응답을 처리하는 중 문제가 발생했습니다.');
      }
    } catch (error) {
      console.error('Error:', error);  // 디버깅을 위해 에러 출력
      Alert.alert('Error', '문제가 발생했습니다. 나중에 다시 시도하세요.');
    }
  };

  const handleKakaoLogin = async () => {
    try {
      const token = await kakaoLogin();
      const profile = await getKakaoProfile();
      Alert.alert('Success', `Logged in as ${profile.nickname}`);
      console.log('Kakao Token:', token);
      console.log('Kakao Profile:', profile);
      // Perform further actions such as navigating to another screen or making API calls
      navigation.navigate('MainTabNavigator');
    } catch (err) {
      console.error('Kakao Login Failed:', err);
      Alert.alert('Error', 'Kakao 로그인 실패');
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
            value={username}  // email 대신 username 사용
            onChangeText={setUsername}
            placeholder="아이디(이메일주소)를 입력하세요"
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

        <TouchableOpacity
          style={[styles.button, !username || !password ? styles.disabledButton : null]}  
          onPress={handleLogin}
          disabled={!username || !password}  
        >
          <Text style={styles.buttonText}>다음</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.kakaoButton]}
          onPress={handleKakaoLogin}
        >
          <Text style={styles.buttonText}>카카오로 로그인</Text>
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
  kakaoButton: {
    backgroundColor: '#FEE500',
    marginTop: 12,
  },
});

export default LoginScreen;