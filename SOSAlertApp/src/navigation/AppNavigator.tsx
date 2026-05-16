import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from '../screens/LoginScreen';
import { HomeScreen } from '../screens/HomeScreen';

const Stack = createNativeStackNavigator();

export function AppNavigator() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {isLoggedIn ? (
                    <Stack.Screen name="Home">
                        {() => <HomeScreen onLogout={() => setIsLoggedIn(false)} />}
                    </Stack.Screen>
                ) : (
                    <Stack.Screen name="Login">
                        {() => <LoginScreen onLogin={() => setIsLoggedIn(true)} />}
                    </Stack.Screen>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}