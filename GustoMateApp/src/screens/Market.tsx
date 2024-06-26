import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Images from '../constants/images';

interface Product {
  name: string;
  category: string;
  expirDate: string;
  uploadDate: string;
  imageUrl: any;
  summary: string;
}

const products: Product[] = [
  {
    name: '파리바게뜨 부드러운 우유식빵 1봉',
    category: '식빵',
    expirDate: '2024-06-28',
    imageUrl: Images.Market1,
    summary: '혼자 다 못먹을 것 같아 소분해요',
    uploadDate: '2024-06-25',
  },
  {
    name: '내추럴스위스 파슬리가루 90g',
    category: '파슬리가루',
    expirDate: '2024-11-07',
    imageUrl: Images.Market2,
    summary: '대용량 나눔합니다! 요리 마무리에 필수',
    uploadDate: '2024-06-23',
  },
  {
    name: '금곡 당도선별수박 7kg 미만',
    category: '수박',
    expirDate: '2024-06-30',
    imageUrl: Images.Market3,
    summary: '한통 샀는데 너무 많아서 반통씩 소분해요',
    uploadDate: '2024-06-22',
  },
  {
    name: '신선란 6개입',
    category: '계란',
    expirDate: '2024-06-29',
    imageUrl: Images.Market4,
    summary: '유기농 계란입니다',
    uploadDate: '2024-06-22',
  },
  {
    name: '종갓집 배추 김치',
    category: '김치',
    expirDate: '2024-09-30',
    imageUrl: Images.Market5,
    summary: '김치 한 봉지 나눔합니다',
    uploadDate: '2024-06-20',
  },
];

const getTimeDifference = (uploadDate: string): string => {
  const today = new Date();
  const upload = new Date(uploadDate);
  const differenceInTime = today.getTime() - upload.getTime();
  const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));

  if (differenceInDays === 0) return '오늘';
  return `${differenceInDays}일 전`;
};

const MarketScreen = () => {
  const username = '김와빅';
  const navigation = useNavigation();

  const [query, setQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  const handleSearch = (text: string) => {
    setQuery(text);
    if (text) {
      const filtered = products.filter(product =>
        product.category.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  };

  const handleClearSearch = () => {
    setQuery('');
    setFilteredProducts(products);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="우리 동네 나눔 재료 검색"
          value={query}
          onChangeText={handleSearch}
        />
        {query ? (
          <TouchableOpacity style={styles.clearButton} onPress={handleClearSearch}>
            <Image source={require('../assets/images/clearIcon.png')} style={styles.clearIcon} />
          </TouchableOpacity>
        ) : (
          <Image source={require('../assets/images/searchIcon.png')} style={styles.searchIcon} />
        )}
      </View>
      <Text style={styles.header}>
        <Text style={styles.username}>{username}</Text>님을 위한 나눔 재료 추천
      </Text>
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('ProductDetail', { product: item })}>
            <View style={styles.productContainer}>
              <Image source={item.imageUrl} style={styles.productImage} />
              <View style={styles.productDetails}>
                <View style={styles.headerRow}>
                  <Text style={styles.productCategory}>{item.category}</Text>
                  <Text style={styles.productUploadDate}>{getTimeDifference(item.uploadDate)}</Text>
                </View>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productExpirDate}>{item.expirDate} <Text style={styles.expirDateSuffix}>까지</Text></Text>
                <View style={styles.summaryContainer}>
                  <Text style={styles.productSummary}>{item.summary}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  searchBar: {
    flex: 1,
    height: 36,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 32,
    paddingHorizontal: 8,
  },
  searchIcon: {
    width: 24,
    height: 24,
    marginLeft: 8,
  },
  clearButton: {
    position: 'absolute',
    right: 10,
  },
  clearIcon: {
    width: 24,
    height: 24,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  username: {
    color: '#4ECB71',
    fontWeight: 'bold',
  },
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ddd',
    paddingBottom: 16,
  },
  productImage: {
    width: 100,
    height: 100,
    marginRight: 16,
    borderRadius: 8,
  },
  productDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  productCategory: {
    fontSize: 14,
    color: '#888',
    fontWeight: 'bold',
  },
  productUploadDate: {
    fontSize: 12,
    color: '#888',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 4,
  },
  productExpirDate: {
    fontSize: 14,
    color: '#FF6347',
    fontWeight: 'bold',
  },
  expirDateSuffix: {
    fontSize: 12,
    color: '#888',
  },
  summaryContainer: {
    marginTop: 8,
    padding: 2,
    borderWidth: 0.5,
    borderColor: '#ddd',
    borderRadius: 16,
    alignSelf: 'flex-start',
    alignContent: 'center',
    justifyContent: 'center',
  },
  productSummary: {
    fontSize: 12,
    color: '#888',
    paddingHorizontal: 4,
  },
});

export default MarketScreen;
