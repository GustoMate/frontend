import * as react from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, View, Text, Button, SafeAreaView, StatusBar} from 'react-native';
import GlobalStyles from '../styles/GlobalStyles';

const Home: React.FC = () => {
    const items = [
        { name: '달걀', description: '계림농장 특란 30입', expirDate: '2024/6/7'},
        { name: '달걀', description: '계림농장 특란 30입', expirDate: '2024/6/7'},
        { name: '달걀', description: '계림농장 특란 30입', expirDate: '2024/6/7'},
        { name: '달걀', description: '계림농장 특란 30입', expirDate: '2024/6/7'},
        { name: '달걀', description: '계림농장 특란 30입', expirDate: '2024/6/7'},
        { name: '달걀', description: '계림농장 특란 30입', expirDate: '2024/6/7'},
    ]
    return (
        <SafeAreaView style={GlobalStyles.AndroidSafeArea1}>
            <Text>Welcome to the Home Screen!</Text>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({

});

export default Home;