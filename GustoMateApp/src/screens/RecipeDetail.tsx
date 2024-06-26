import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';

const RecipeDetailScreen = () => {
    const route = useRoute();
    const { recipe } = route.params;

    return (
        <ScrollView style={styles.container}>
            <Image source={recipe.image} style={styles.recipeImage} />
            <View style={styles.recipeInfo}>
                <Text style={styles.recipeName}>{recipe.name}</Text>
                <Text style={styles.recipeDetails}> 난이도 {recipe.difficulty} · {recipe.allergens} 포함 · {recipe.time}분 소요</Text>
                <Text style={styles.ingredientsTitle}>재료:</Text>
                {recipe.ingredients.map((ingredient, idx) => (
                    <Text key={idx} style={styles.ingredientText}>{ingredient}</Text>
                ))}
            </View>
        </ScrollView>
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
        height: 200,
        borderRadius: 8,
    },
    recipeInfo: {
        marginTop: 16,
    },
    recipeName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    recipeDetails: {
        fontSize: 16,
        color: '#757575',
        marginBottom: 16,
    },
    ingredientsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    ingredientText: {
        fontSize: 16,
        marginBottom: 4,
    },
});

export default RecipeDetailScreen;
