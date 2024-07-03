import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import GlobalStyles from '../styles/GlobalStyles';

const fridgeRecipes = [
    {
        name: '계란말이',
        difficulty: '하',
        theme: '반찬',
        country: '한식',
        cal: '150',
        amount: '2',
        spice: '0',
        allergens: '달걀/우유',
        time: '10',
        ingredients: ['달걀', '우유', '토마토케찹'],
        ingredients_main: ['달걀 3개', '우유 1컵', '토마토케찹 1스푼'],
        ingredients_sub: ['당근 1/2개', '대파 1/2개'],
        seasoning: ['소금 약간'],
        image: require('../assets/images/recipe1.jpg'),
        text: ['1. 계란 3개를 푼다', '2. 당근과 대파를 썰어넣는다.', '3. 기호에 따라 우유를 넣으면 부드럽다.', '4. 잘 부쳐서 돌돌 만다.', '5. 잘 담는다', '6. 맛있게 먹는다', '7. 후기를 남긴다'],
        reason: '지난 두 끼와 다른 스타일의 요리이며, 빠른 시간 내에 준비할 수 있어 피곤한 사용자에게 적합합니다.',
    },
    {
        name: '계란라면',
        difficulty: '중',
        allergens: '달걀',
        time: '10',
        ingredients: ['라면', '달걀'],
        ingredients_main: ['라면 1봉', '달걀 1개'],
        ingredients_sub: ['당근', '대파'],
        seasoning: ['소금'],
        image: require('../assets/images/recipe2.jpg'),
        text: '잘 만들어보세요'
    },
];

const marketRecipes = [
    {
        name: '프렌치토스트',
        difficulty: '하',
        allergens: '달걀',
        time: '10',
        ingredients: ['식빵', '우유'],
        ingredients_sub: ['계란'],
        seasoning: ['메이플시럽', '슈가파우더'],
        image: require('../assets/images/recipe3.jpg'),
        text: '잘 만들어보세요'
    },
    {
        name: '뚝배기 짬뽕 라면',
        difficulty: '중',
        allergens: '밀가루',
        time: '15',
        ingredients: ['해물', '라면'],
        ingredients_sub: ['떡', '대파'],
        seasoning: ['간장'],
        image: require('../assets/images/recipe4.jpg'),
        text: '잘 만들어보세요'
    },
];

const RecipeResultScreen = () => {
    const navigation = useNavigation();

    const handleRecipePress = (recipe) => {
        navigation.navigate('RecipeDetail', { recipe });
    };

    return (
        <SafeAreaView style={GlobalStyles.AndroidSafeArea1}>
        <ScrollView style={styles.container}>
            <Text style={styles.sectionTitle}>
                <Text style={styles.highlightText}>냉장고 재료</Text>로 만들 수 있는 냉털 레시피
            </Text>
            {fridgeRecipes.map((recipe, index) => (
                <TouchableOpacity key={index} style={styles.recipeCard} onPress={() => handleRecipePress(recipe)}>
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
                </TouchableOpacity>
            ))}

            <View style={styles.separator} />

            <Text style={styles.sectionTitle}>
                <Text style={styles.highlightText}>재료 몇 개만 더</Text> 있으면 돼! 마켓 레시피
            </Text>
            {marketRecipes.map((recipe, index) => (
                <TouchableOpacity key={index} style={styles.recipeCard} onPress={() => handleRecipePress(recipe)}>
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
                </TouchableOpacity>
            ))}
        </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        paddingHorizontal: 16,
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
        backgroundColor: '#D6EFDD',
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
