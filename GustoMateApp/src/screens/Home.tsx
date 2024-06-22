import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, Platform, TouchableOpacity } from 'react-native';
import GlobalStyles from '../styles/GlobalStyles';

const items = [
  { name: '달걀', description: '계림농장 특란 30입', expirDate: '2024/6/7' },
  { name: '우유', description: '매일우유 저지방 1%', expirDate: '2024/6/10' },
  { name: '방울토마토', description: '탐마루 방울토마토 500g', expirDate: '2024/6/27' },
  { name: '토마토케찹', description: '오뚜기 토마토케찹 500g', expirDate: '2024/7/3' },
  { name: '아이스크림', description: '하겐다즈 파인트', expirDate: '2024/7/11' },
  { name: '소금', description: '청정원 구운소금 1kg', expirDate: '2024/9/12' },
  { name: '콜라', description: '펩시 제로슈거라임 500ml', expirDate: '2024/9/15' },
  { name: '라면', description: '진라면 매운맛 6봉', expirDate: '2024/12/5' },
];

const Home: React.FC = () => {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const fetchName = async () => {
      try {
        const baseURL = Platform.OS === 'ios' ? 'http://localhost:3000' : 'http://10.0.2.2:3000';
        const response = await fetch(`${baseURL}/users`);
        const data = await response.json();
        if (response.ok) {
          setUsername(data[0].username);
        } else {
          console.error('Error fetching name:', data.message);
        }
      } catch (error) {
        console.error('Error fetching name:', error);
      }
    };

    fetchName();
  }, []);

  const getDateColor = (expirDate: string) => {
    const formattedDate = expirDate.replace(/\//g, '-');
    const now = new Date();
    const expirationDate = new Date(formattedDate);
    const diffTime = expirationDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 7) {
      return styles.red;
    } else if (diffDays <= 14) {
      return styles.orange;
    } else {
      return styles.green;
    }
  };

  return (
    <SafeAreaView style={GlobalStyles.AndroidSafeArea1}>
        <Text style={styles.header}>{username}님의 냉장고</Text>
        <View style={styles.container}>
            {items.slice(0, 6).map((item, index) => (
            <View key={index} style={styles.item}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemDescription}>{item.description}</Text>
                <Text style={[styles.itemDate, getDateColor(item.expirDate)]}>{item.expirDate}</Text>
            </View>
            ))}
        </View>
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddItem')}>
            <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#4CAF50',
      marginBottom: 16,
      paddingHorizontal: 16,
    },
    container: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
    },
    item: {
      width: '45%',
      aspectRatio: 1,
      backgroundColor: '#f5f5f5',
      padding: 16,
      marginVertical: 8,
      borderRadius: 100, // Makes the view circular
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5,
    },
    itemName: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    itemDescription: {
      fontSize: 14,
      marginBottom: 8,
      textAlign: 'center',
    },
    itemDate: {
      fontSize: 14,
      color: '#FF5722',
    },
    red: {
      color: '#F44336',
    },
    orange: {
      color: '#FF9800',
    },
    green: {
      color: '#4CAF50',
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
  
  export default Home;