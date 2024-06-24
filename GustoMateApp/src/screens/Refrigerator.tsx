import * as React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

const Refrigerator: React.FC = () => {
    return (
        <View style={styles.container}>
            <Text>Welcome to the Refrigerator Screen!</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Refrigerator;