import React from "react";
import { View, Text, SafeAreaView, Touchable, TouchableOpacity } from "react-native";
import styles from "./style";
import { useNavigation, NavigationProp } from "@react-navigation/native";

type RootStackParamList = {
    UsersStack: undefined; // Define the routes and their params here
};

export default function HomeScreen() {

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    return (
        <SafeAreaView style={styles.container}>
            <Text>Welcome to User List of Manager and Admin Roles with graphql request, please click below to check</Text>
            <TouchableOpacity onPress={() => navigation.navigate('UsersStack')}>
                <Text >Click Here</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}
