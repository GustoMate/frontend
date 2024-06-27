import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, Platform, TouchableOpacity, ScrollView } from 'react-native';
import GlobalStyles from '../styles/GlobalStyles';
import { useNavigation } from '@react-navigation/native';

const Home: React.FC = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [itemList, setItemList] = useState([]);
  const [showUploadOptions, setShowUploadOptions] = useState(false);
  const navigation = useNavigation();

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

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const baseURL = Platform.OS === 'ios' ? 'http://localhost:3000' : 'http://10.0.2.2:3000';
        const response = await fetch(`${baseURL}/items`);
        const data = await response.json();
        if (response.ok) {
          setItemList(data);
        }
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []);

  const getDateColor = (expirDate: string) => {
    const formattedDate = expirDate.replace(/\//g, '-');
    const now = new Date();
    const expirationDate = new Date(formattedDate);
    const diffTime = expirationDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 3) {
      return styles.red;
    } else if (diffDays <= 7) {
      return styles.orange;
    } else {
      return styles.green;
    }
  };

  const formatDate = (expirDate: string) => {
    return expirDate.slice(2);
  };

  return (
    <SafeAreaView style={GlobalStyles.AndroidSafeArea1}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>
          <Text style={styles.highlightColor}>{username}</Text> 님의 냉장고
        </Text>
      </View>
      <View style={styles.outerContainer}>
        <ScrollView contentContainerStyle={styles.innerContainer}>
          {itemList.map((item) => (
            <View key={item.id} style={styles.item}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemDescription}>{item.description}</Text>
              <Text style={[styles.itemDate, getDateColor(item.expiration)]}>{formatDate(item.expiration)}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
      {showUploadOptions && (
        <View style={styles.uploadOptionsContainer}>
          <TouchableOpacity 
            style={styles.uploadOptionButton} 
            onPress={() => {
              setShowUploadOptions(false);
              navigation.navigate('AddDirect');
            }}
          >
            <Text style={styles.uploadOptionText}>직접 입력</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.uploadOptionButton} 
            onPress={() => {
              setShowUploadOptions(false);
              navigation.navigate('OCR');
            }}
          >
            <Text style={styles.uploadOptionText}>영수증 입력</Text>
          </TouchableOpacity>
        </View>
      )}
      <TouchableOpacity 
        style={styles.addButton} 
        onPress={() => setShowUploadOptions(!showUploadOptions)}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
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
  highlightColor: {
    color: '#4ECB71',
  },
  outerContainer: {
    flex: 1,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 20,
    backgroundColor: '#ffffff',
    borderColor: '#D9D9D9',
    borderWidth: 0.5,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
    justifyContent: 'flex-start',
  },
  innerContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  item: {
    width: '30%',
    aspectRatio: 1,
    backgroundColor: '#ffffff',
    padding: 12,
    marginVertical: 8,
    borderRadius: 50, // Makes the view circular
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
  },
  itemDescription: {
    fontSize: 10,
    marginBottom: 4,
    textAlign: 'center',
  },
  itemDate: {
    fontSize: 14,
    fontWeight: 'bold',
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
  uploadOptionsContainer: {
    position: 'absolute',
    bottom: 120,
    right: 30,
    alignItems: 'center',
  },
  uploadOptionButton: {
    backgroundColor: '#4ECB71',
    width: 120,
    height: 40,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    justifyContent: 'center',
    
  },
  uploadOptionText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  addButton: {
    position: 'absolute',
    bottom: 50,
    right: 30,
    backgroundColor: '#4ECB71',
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
