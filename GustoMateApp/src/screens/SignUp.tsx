import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Platform, Alert, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import GlobalStyles from '../styles/GlobalStyles';

const SignUpScreen = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [region, setRegion] = useState('');
  const [profileImage, setProfileImage] = useState('');

  const navigation = useNavigation();

  const handleSignUp = async () => {
    try {
      const baseURL = Platform.OS === 'ios' ? 'http://localhost:8000' : 'http://10.0.2.2:8000';
      const body = JSON.stringify({
        username: username,
        useremail: email,
        password: password,
        profile_image: profileImage || 'none',
        location: region,
      });
      console.log('Request Body:', body);  // 디버깅을 위해 요청 본문 출력

      const response = await fetch(`${baseURL}/account/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body,
      });

      const responseText = await response.text();
      console.log('Response Text:', responseText);  // 디버깅을 위해 응답 텍스트 출력

      try {
        const data = JSON.parse(responseText);
        console.log('Response Data:', data);  // 디버깅을 위해 응답 데이터 출력

        if (response.ok) {
          Alert.alert('Success', '회원가입 성공');
          navigation.navigate('SignIn');
        } else {
          Alert.alert('Error', data.detail || '회원가입 실패');
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

  return (
    <SafeAreaView style={GlobalStyles.AndroidSafeArea1}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.headerText}>회원가입하기</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>이름</Text>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            placeholder="이름을 입력하세요"
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
          <Text style={styles.label}>지역</Text>
          <TextInput
            style={styles.input}
            value={region}
            onChangeText={setRegion}
            placeholder="지역을 입력하세요"
            placeholderTextColor="#B3B3B3"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>프로필 이미지 (선택)</Text>
          <TextInput
            style={styles.input}
            value={profileImage}
            onChangeText={setProfileImage}
            placeholder="프로필 이미지 URL을 입력하세요"
            placeholderTextColor="#B3B3B3"
          />
        </View>
        <TouchableOpacity
          style={[styles.button, !username || !password || !email || !region ? styles.disabledButton : null]}
          onPress={handleSignUp}
          disabled={!username || !password || !email || !region}
        >
          <Text style={styles.buttonText}>회원가입</Text>
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

export default SignUpScreen;
