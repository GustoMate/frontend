import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const WelcomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>오직 <Text style={styles.highlight}>자취생</Text>을 위한</Text>
      <Text style={styles.subtitle}><Text style={styles.highlight}>식재료 교환</Text> 플랫폼</Text>
      <Text style={styles.logo}>GustoMate</Text>
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.buttonText}>로그인하기</Text>
      </TouchableOpacity>
      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>처음 방문하신다면?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.signupLink}>회원가입 하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#323232',
    textAlign: 'center',
  },
  highlight: {
    color: '#4ECB71',
  },
  subtitle: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#323232',
    textAlign: 'center',
    marginBottom: 16,
  },
  logo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#323232',
    marginBottom: 32,
  },
  button: {
    backgroundColor: '#4ECB71',
    paddingVertical: 12,
    paddingHorizontal: 45,
    borderRadius: 8,
    marginBottom: 16,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
  },
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#323232',
  },
  signupLink: {
    color: '#4ECB71',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    marginLeft: 4,
  },
});

export default WelcomeScreen;
