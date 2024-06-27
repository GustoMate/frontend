import React from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Text, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import GlobalStyles from '../styles/GlobalStyles';

const ProductDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { product } = route.params;

  const getTimeDifference = (uploadDate: string): string => {
    const today = new Date();
    const upload = new Date(uploadDate);
    const differenceInTime = today.getTime() - upload.getTime();
    const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));

    if (differenceInDays === 0) return '오늘';
    return `${differenceInDays}일 전`;
  };

  const getDaysLeft = (expirDate: string): number => {
    const today = new Date();
    const expiration = new Date(expirDate);
    const differenceInTime = expiration.getTime() - today.getTime();
    return Math.ceil(differenceInTime / (1000 * 3600 * 24));
  };

  const daysLeft = getDaysLeft(product.expirDate);
  const isExpiringSoon = daysLeft <= 3;
  
  const getColor = (daysLeft: number): string => {
    if (daysLeft <= 3) {
      return '#F44336'; 
    } else if (daysLeft <= 7) {
      return '#FF9800'; 
    } else {
      return '#4CAF50'; 
    }
  };

  return (
    <SafeAreaView style={GlobalStyles.AndroidSafeArea1}>
      <View style={styles.container}>
        <Image source={product.imageUrl} style={styles.productImage} resizeMode="cover" />
        <View style={styles.userInfoContainer}>
          <Image source={require('../assets/images/sellerProfile.png')} style={styles.profileImage} />
          <View style={styles.userInfoText}>
            <Text style={styles.username}>세연</Text>
            <Text style={styles.userLocation}>서대문구 신촌동</Text>
          </View>
        </View>
        <View style={styles.separator} />
        <View style={styles.productInfoContainer}>
          <View style={styles.headerRow}>
            <Text style={styles.productCategory}>{product.category}</Text>
            <Text style={styles.productUploadDate}>{getTimeDifference(product.uploadDate)}</Text>
          </View>
          <Text style={styles.productName}>{product.name}</Text>
          <View style={styles.expirDateContainer}>
            <Text style={[styles.productExpirDate, {color : getColor(daysLeft)}]}>{product.expirDate}</Text>
            <View style={[styles.tag, { borderColor: getColor(daysLeft) }]}>
              <Text style={[styles.tagText, { color: getColor(daysLeft) }]}>
                유통기한 {daysLeft}일 남음
              </Text>
            </View>
            {isExpiringSoon && (
              <View style={[styles.tag, styles.expiringSoonTag]}>
                <Text style={styles.expiringSoonText}>임박</Text>
              </View>
            )}
          </View>
          <Text style={styles.productSummary}>{product.summary}</Text>
          <Text style={styles.productDetails}>서문쪽 연희노가리 근처에서 직거래 원합니다.</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.messageButton} onPress={() => navigation.navigate('Chat')}>
            <Text style={styles.messageButtonText}>메세지 보내기</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.heartButton}>
            <Text style={styles.heartButtonText}>♡</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  productImage: {
    width: '100%',
    height: 250,
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  userInfoText: {
    justifyContent: 'center',
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  userLocation: {
    fontSize: 14,
    color: '#888',
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 16,
  },
  productInfoContainer: {
    padding: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productCategory: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productUploadDate: {
    fontSize: 12,
    color: '#888',
  },
  productName: {
    fontSize: 16,
    marginVertical: 8,
  },
  expirDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  productExpirDate: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6347',
    marginRight: 8,
  },
  tag: {
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#FF6347', // 기본 테두리 색상
    justifyContent: 'center',
    alignItems: 'center',
  },
  expiringSoonTag: {
    backgroundColor: '#FF3D00',
    borderColor: '#FF3D00',
    marginLeft: 8,
  },
  tagText: {
    fontSize: 12,
  },
  expiringSoonText: {
    color: '#fff',
    fontSize: 12,
  },
  productSummary: {
    fontSize: 14,
    color: '#888',
    marginVertical: 8,
  },
  productDetails: {
    fontSize: 14,
    color: '#888',
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
  },
  messageButton: {
    flex: 1,
    backgroundColor: '#4ECB71',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginRight: 8,
    alignItems: 'center',
  },
  messageButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  heartButton: {
    width: 50,
    height: 50,
    backgroundColor: '#FF6347',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heartButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default ProductDetailScreen;
