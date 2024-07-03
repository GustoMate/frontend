import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import GlobalStyles from '../styles/GlobalStyles';

const RecipeDetailScreen = () => {
    const route = useRoute();
    const { recipe } = route.params;

    return (
        <SafeAreaView style={GlobalStyles.AndroidSafeArea1}>
            <ScrollView style={styles.container}>

                <Image source={recipe.image} style={styles.recipeImage} /> 
                <Text style={styles.recipeName}>{recipe.name}</Text>
                
                <View style={styles.reasonContainer}>
                    {/* <Text style={styles.recipeSubtitle}>추천 이유</Text> */}
                    <Text style={[styles.reasonText, { textAlign: 'center' }]}>{recipe.reason}</Text>
                </View>

                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>상세정보</Text>
                    <View style={styles.detailsContainer}>
                        <View style={styles.detailItem}>
                            <Text style={styles.detailTextSmall}>난이도</Text>
                            <Text style={styles.detailTextLarge}>{recipe.difficulty}</Text>
                        </View>
                        <View style={styles.detailItem}>
                            <Text style={styles.detailTextSmall}>소요시간</Text>
                            <Text style={styles.detailTextLarge}>{recipe.time}분</Text>
                        </View>
                        <View style={styles.detailItem}>
                            <Text style={styles.detailTextSmall}>양</Text>
                            <Text style={styles.detailTextLarge}>{recipe.amount}인분</Text>
                        </View>
                        <View style={styles.detailItem}>
                            <Text style={styles.detailTextSmall}>칼로리</Text>
                            <Text style={styles.detailTextLarge}>{recipe.cal}cal</Text>
                        </View>
                    </View>

                    <View style={styles.infoTable}>
                        <View style={styles.tableRow}>
                            <Text style={[styles.tableCell, styles.boldText]}>테마</Text>
                            <Text style={styles.tableCell}>{recipe.theme}</Text>
                            <Text style={[styles.tableCell, styles.boldText]}>국가</Text>
                            <Text style={styles.tableCell}>{recipe.country}</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={[styles.tableCell, styles.boldText]}>맵기</Text>
                            <Text style={styles.tableCell}>{recipe.spice}</Text>
                            <Text style={[styles.tableCell, styles.boldText]}>알레르기</Text>
                            <Text style={styles.tableCell}>{recipe.allergens}</Text>
                        </View>
                    </View>
                </View>
                
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>재료</Text>
                    <Text style={styles.ingredientText}>
                        <Text style={styles.boldText}>주재료 : </Text>
                        {recipe.ingredients_main.join(', ')}
                    </Text>
                    <Text style={styles.ingredientText}>
                        <Text style={styles.boldText}>부재료 : </Text>
                        {recipe.ingredients_sub.join(', ')}
                    </Text>
                    <Text style={styles.ingredientText}>
                        <Text style={styles.boldText}>  양념   : </Text>
                        {recipe.seasoning.join(', ')}
                    </Text>
                </View>

                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>레시피 과정</Text>
                    {recipe.text.map((step, idx) => (
                        <Text key={idx} style={styles.recipeText}>{step}</Text>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        padding: 16,
    },
    recipeImage: {
        width: '100%',
        height: 300,
    },
    titleContainer: {
        backgroundColor: '#FFF',
    },
    recipeName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#323232',
        marginTop: 16,
        paddingHorizontal: 8,
    },
    reasonText: {
        fontSize: 14,
        color: '#323232',
        marginBottom: 4,
    },
    reasonContainer: {
        backgroundColor: '#F5F5F5',
        padding: 10,
        marginTop: 8,
        marginHorizontal: 4,
        marginBottom: 4,
        borderWidth: 1,
        borderColor: '#D9D9D9',
        borderRadius: 50,
    },
    detailsContainer: {
        borderColor: '#D9D9D9',
        borderTopWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 16,
    },
    detailItem: {
        width: 80,
        height: 80,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#4ECB71',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        marginTop: 16,
    },
    detailTextSmall: {
        fontSize: 12,
        color: '#323232',
        textAlign: 'center',
        marginBottom: 4,
    },
    detailTextLarge: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#4ECB71',
        textAlign: 'center',
    },
    sectionContainer: {
        backgroundColor: '#FFF',
        padding: 10,
        marginTop: 4,
        marginHorizontal: 4,
        marginBottom: 4,
        borderWidth: 1,
        borderColor: '#D9D9D9',
        borderRadius: 4,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#323232',
    },
    ingredientsTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    ingredientText: {
        fontSize: 14,
        marginBottom: 4,
        color: '#323232',
    },
    infoTable: {
        borderTopWidth: 1,
        borderColor: '#D9D9D9',
        marginBottom: 4,
    },
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderColor: '#D9D9D9',
    },
    tableCell: {
        flex: 1,
        textAlign: 'center',
    },
    boldText: {
        fontWeight: 'bold',
    },
    recipeText: {
        fontSize: 14,
        color: '#323232',
        marginBottom: 4,
    },
});

export default RecipeDetailScreen;
