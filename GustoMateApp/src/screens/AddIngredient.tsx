import * as React from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import GlobalStyles from '../styles/GlobalStyles';

const AddIngredient: React.FC = () => {
    return(
        <SafeAreaView style={GlobalStyles.AndroidSafeArea1}>
            <Text>AddIngredeint</Text>
        </SafeAreaView>
    );
};

export default AddIngredient;