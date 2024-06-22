import * as React from 'react';
import { StyleSheet, View, Text, Button, TextInput } from 'react-native';


const Survey: React.FC = () => {

    const [currentPage, setCurrentPage] = React.useState(0); // 현재 페이지 상태
    const [ username, setUsername ] = React.useState(''); // 사용자 이름 상태
    const [ response1, setResponse1 ] = React.useState(''); // 첫 번째 질문 응답 상태

    const renderPage = () => {
        switch (currentPage) {
            case 0:
                return (
                    <View style={styles.container}>
                        <Text>Enter Your Name:</Text>
                        <TextInput
                            style={styles.input}
                            value={username}
                            onChangeText={setUsername}
                        />
                        <Button title="Next" onPress={() => setCurrentPage(currentPage + 1)} />
                    </View>
                );
            case 1:
                return (
                    <View style={styles.container}>
                        <Text> Do you like React Native?</Text>
                        <Button title='Yes' onPress={() => setResponse1('Yes')} />
                        <Button title='No' onPress={() => setResponse1('No')} />
                    </View>
                );
            default:
                return null;
        }
    };

    const handleSubmit = () => {
        // 제출 로직 (예: 서버에 데이터 전송)
        console.log('Username:', username);
        console.log('Response 1:', response1);
        Alert('Suervey Submitted!');
    };

    return (
        <View style={styles.container}>
            {renderPage()}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: 'black',
        padding: 10,
        margin: 10,
        width: 200,
    },
});

export default Survey;