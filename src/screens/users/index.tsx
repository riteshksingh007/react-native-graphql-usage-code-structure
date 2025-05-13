import React, { useState } from "react";
import { View, Text, SafeAreaView, TouchableOpacity, FlatList, ActivityIndicator } from "react-native";
import styles from "./style";
import { useQuery } from '@apollo/client';
import { LIST_ZELLER_CUSTOMERS } from '../../api/queries/listZellerCustomers';
import Icon from 'react-native-vector-icons/Feather';

type User = {
    id: string;
    name: string;
    role: 'ADMIN' | 'MANAGER';
};

export default function UsersScreen() {
    const [selectedType, setSelectedType] = useState<'ADMIN' | 'MANAGER'>('ADMIN');
    // Use the query with the filter variable
    const { loading, error, data, refetch } = useQuery(LIST_ZELLER_CUSTOMERS, {
        variables: {
            filter: {
                role: { eq: selectedType }, // Filter users by the selected role
            },
        },
    });
    console.log("data", data, "selectedType", selectedType);


    const renderUserItem = ({ item }: { item: User }) => (
        <View style={styles.userItem}>
            <View style={styles.avatar}>
                <Text style={styles.avatarText}>{item.name[0]}</Text>
            </View>
            <View>
                <Text style={styles.userName}>{item.name}</Text>
                <Text style={styles.userRole}>{item.role}</Text>
            </View>
        </View>
    );

    const RadioButton = ({ label }: { label: 'ADMIN' | 'MANAGER' }) => (
        <TouchableOpacity style={styles.radioButton} onPress={() => {setSelectedType(label),  refetch({ filter: { role: { eq: label } } });}}>
            <Icon
                name={selectedType === label ? 'check-circle' : 'circle'}
                size={20}
                color={selectedType === label ? '#007bff' : '#ccc'}
                style={{ marginRight: 8 }}
            />
            <Text style={styles.radioLabel}>{label}</Text>
        </TouchableOpacity>
    );

    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <ActivityIndicator size="large" color="#007bff" />
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={{ color: 'red' }}>Error loading users: {error.message}</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <Text style={styles.heading}>User Types</Text>
                <RadioButton label="ADMIN" />
                <RadioButton label="MANAGER" />
                <View style={styles.separator} />
                <Text style={styles.heading}>{selectedType} Users</Text>
                <FlatList
                    data={data?.listZellerCustomers?.items || []}
                    keyExtractor={(item: any) => item.id}
                    renderItem={renderUserItem}
                />
            </View>
        </SafeAreaView>
    );
}


