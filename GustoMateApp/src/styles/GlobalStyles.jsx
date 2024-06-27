import { StyleSheet, Platform, StatusBar } from "react-native";

export default StyleSheet.create({
    AndroidSafeArea1: {
        flex: 1,
        backgroundColor: "white",
        paddingTop: Platform.OS === "android" ? 25 : 0,
    },
    AndroidSafeArea2: {
        flex: 1,
        backgroundColor: "white",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
});
