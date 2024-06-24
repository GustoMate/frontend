import * as React from 'react';
import { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, TextInput, Alert, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import images from '../constants/images';

const SignIn: React.FC = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Function to handle sign in
    const handleSignIn =  async () => {
        try {
            // Send a POST request to the server
            const response = await fetch('http://localhost:3000/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                    confirmPassword,
                }),
            });

            const data = await response.json();

            // Handling response based on the status
            if (response.ok) {
                Alert.alert('Success', 'Logged in succesfully');
                nav.navigate('Survey'); // 로그인 성공 시 Survey 페이지로 이동
            } else {
                Alert.alert('Error', data.message || 'Login failed');
            }
        } catch (error) {
            Alert.alert('Error', 'Something went wrong. Please try again later.');
        }
    };


    return (
        <View style={styles.container}>
            <ImageBackground source={images.SignInBackground} resizeMode="cover" style={styles.image}>
                <TextInput
                    style = {styles.input}
                    placeholder='Email'
                    value={email}
                    onChangeText={setEmail}
                    keyboardType='email-address'
                />
                <TextInput
                    style = {styles.input}
                    placeholder='Password'
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <TextInput
                    style = {styles.input}
                    placeholder='Confirm Password'
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                />
                <Button title='Sign In' onPress={handleSignIn} />
            </ImageBackground>
        </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontsize: 42,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000c0',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    marginHorizontal: 30,
    paddingHorizontal: 8,
    backgroundColor: '#b1aea6',
  }
});

export default SignIn;
