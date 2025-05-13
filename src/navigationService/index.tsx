import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { HomeScreen, UsersScreen } from '../screens';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StatusBar, Text, useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

// Define the type for the bottom tab navigator's routes
type BottomTabParamList = {
    HomeStack: undefined;
    UsersStack: undefined;
};

// Define the type for the stack navigator's routes
type HomeStackParamList = {
    Home: undefined;
    Details: undefined; // Example additional screen for Home stack
};

type UsersStackParamList = {
    Users: undefined;
    Profile: undefined; // Example additional screen for Users stack
};

// Create the bottom tab navigator
const Tab = createBottomTabNavigator<BottomTabParamList>();

// Create stack navigators for each tab
const HomeStack = createNativeStackNavigator<HomeStackParamList>();
const UsersStack = createNativeStackNavigator<UsersStackParamList>();

// Home Stack Navigator
function HomeStackNavigator() {
    return (
        <HomeStack.Navigator screenOptions={{ headerShown: false }}>
            <HomeStack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
        </HomeStack.Navigator>
    );
}

// Users Stack Navigator
function UsersStackNavigator() {
    return (
        <UsersStack.Navigator screenOptions={{ headerShown: false }}>
            <UsersStack.Screen name="Users" component={UsersScreen} options={{ title: 'Users' }} />
        </UsersStack.Navigator>
    );
}

export default function NavigationService() {
    const isDarkMode = useColorScheme() === 'dark';
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
      };
    return (
        <NavigationContainer>
            <StatusBar
                    barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                    backgroundColor={backgroundStyle.backgroundColor}
                  />
            <Tab.Navigator
                initialRouteName="HomeStack"
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ color, size }) => {
                        let iconName: string = 'help'; // Default icon name

                        if (route.name === 'HomeStack') {
                            iconName = 'home';
                        } else if (route.name === 'UsersStack') {
                            iconName = 'people';
                        }

                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: 'tomato',
                    tabBarInactiveTintColor: 'gray',
                })}
            >
                <Tab.Screen name="HomeStack" component={HomeStackNavigator} options={{ title: 'Home' }} />
                <Tab.Screen name="UsersStack" component={UsersStackNavigator} options={{ title: 'Users' }} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}