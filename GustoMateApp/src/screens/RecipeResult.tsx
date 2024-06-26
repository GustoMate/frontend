import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const fridgeRecipes = [
    {
        name: '계란말이',
        difficulty: '하',
        allergens: '달걀/우유',
        time: '10',
        ingredients: ['달걀', '우유', '소금', '토마토케찹', '당근', '대파'],
        image: require('../assets/images/recipe1.jpg'),
    },
    {
        name: '계란라면',
        difficulty: '중',
        allergens: '달걀',
        time: '10',
        ingredients: ['라면', '달걀', '대파'],
        image: require('../assets/images/recipe2.jpg'),
    },
];

const marketRecipes = [
    {
        name: '프렌치토스트',
        difficulty: '하',
        allergens: '달걀',
        time: '10',
        ingredients: ['식빵', '우유'],
        image: require('../assets/images/recipe3.jpg'),
    },
    {
        name: '뚝배기 짬뽕 라면',
        difficulty: '중',
        allergens: '밀가루',
        time: '15',
        ingredients: ['떡볶이', '라면'],
        image: require('../assets/images/recipe4.jpg'),
    },
];

const RecipeResultScreen = () => {
    const navigation = useNavigation();

    const handleRecipePress = (recipe) => {
        navigation.navigate('RecipeDetail', { recipe });
    };

    return (
        <ScrollView style={styles.container}>
            {/* <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={24} color="#B3B3B3" />
                </TouchableOpacity>
                <Text style={styles.headerText}>레시피 추천 결과</Text>
            </View> */}

            <Text style={styles.sectionTitle}>
                <Text style={styles.highlightText}>냉장고 재료</Text>로 만들 수 있는 냉털 레시피
            </Text>
            {fridgeRecipes.map((recipe, index) => (
                <TouchableOpacity key={index} style={styles.recipeCard} onPress={() => handleRecipePress(recipe)}>
                    <View key={index} style={styles.recipeCard}>
                        <Image source={recipe.image} style={styles.recipeImage} />
                        <View style={styles.recipeInfo}>
                            <Text style={styles.recipeName}>{recipe.name}</Text>
                            <Text style={styles.recipeDetails}> 난이도 {recipe.difficulty} · {recipe.allergens} 포함 · {recipe.time}분</Text>
                            <View style={styles.ingredientsContainer}>
                                <Text style={styles.ingredientsTitle}>활용할 냉장고 재료</Text>
                                <ScrollView horizontal style={styles.ingredients}>
                                    {recipe.ingredients.map((ingredient, idx) => (
                                        <View key={idx} style={styles.ingredientTag}>
                                            <Text style={styles.ingredientText}>{ingredient}</Text>
                                        </View>
                                    ))}
                                </ScrollView>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            ))}

            <View style={styles.separator} />

            <Text style={styles.sectionTitle}>
                <Text style={styles.highlightText}>재료 몇 개만 더</Text> 있으면 돼! 마켓 레시피
            </Text>
            {marketRecipes.map((recipe, index) => (
                <TouchableOpacity key={index} style={styles.recipeCard} onPress={() => handleRecipePress(recipe)}>
                    <View key={index} style={styles.recipeCard}>
                        <Image source={recipe.image} style={styles.recipeImage} />
                        <View style={styles.recipeInfo}>
                            <Text style={styles.recipeName}>{recipe.name}</Text>
                            <Text style={styles.recipeDetails}> 난이도 {recipe.difficulty} · {recipe.allergens} 포함 · {recipe.time}분</Text>
                            <View style={styles.ingredientsContainer}>
                                <Text style={styles.ingredientsTitle}>이것만 있으면 돼요</Text>
                                <ScrollView horizontal style={styles.ingredients}>
                                    {recipe.ingredients.map((ingredient, idx) => (
                                        <View key={idx} style={styles.ingredientTag2}>
                                            <Text style={styles.ingredientText}>{ingredient}</Text>
                                        </View>
                                    ))} 
                                </ScrollView>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 8,
        color: '#323232',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#323232',
        marginVertical: 16,
    },
    highlightText:{
        color: '#4ECB71'
    },
    recipeCard: {
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderBottomColor: '#E0E0E0',
        paddingBottom: 16,
        marginBottom: 4,
        alignItems: 'center',
    },
    recipeImage: {
        width: 120,
        height: 120,
        borderRadius: 8,
    },
    recipeInfo: {
        marginLeft: 16,
        flex: 1,
        justifyContent: 'center',
    },
    recipeName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#323232',
    },
    recipeDetails: {
        fontSize: 14,
        color: '#676767',
        marginVertical: 4,
        marginBottom: 16,
    },
    ingredientsContainer: {
        backgroundColor: '#F5F5F5',
        borderRadius: 8,
        paddingHorizontal: 8,
        paddingVertical: 4,
        marginTop: 4,
    },
    ingredientsTitle: {
        fontSize: 12,
        color: '#676767',
        paddingHorizontal: 2,
        marginBottom: 6,
    },
    ingredients: {
        flexDirection: 'row',
        flexWrap: 'nowrap',
    },
    ingredientTag: {
        backgroundColor: '#FFF',
        borderWidth: 0.5,
        borderColor: '#D9D9D9',
        borderRadius: 20,
        paddingVertical: 2,
        paddingHorizontal: 10,
        marginRight: 4,
        marginBottom: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    ingredientTag2:{
        backgroundColor: '#FFF',
        borderWidth: 0.5,
        borderColor: '#4ECB71',
        borderRadius: 20,
        paddingVertical: 2,
        paddingHorizontal: 10,
        marginRight: 4,
        marginBottom: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    ingredientText: {
        fontSize: 12,
        color: '#676767',
    },
    separator: {
        height: 5,
        backgroundColor: '#E0E0E0',
        marginVertical: 16,
    },
});

export default RecipeResultScreen;
