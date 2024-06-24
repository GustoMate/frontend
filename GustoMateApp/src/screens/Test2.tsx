import * as React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

const Test2: React.FC = () => {
    return (
        <View style={styles.container}>
            <Text>Welcome to the Test2 Screen!</Text>
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

export default Test2;