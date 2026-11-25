import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from '../screens/LoginScreen';
import { UserListScreen } from '../screens/UserListScreen';
import { UserFormScreen } from '../screens/UserFormScreen';
import { MapScreen } from '../screens/MapScreen';
import { User } from '../domain/User';

export type RootStackParamList = {
  Login: undefined;
  UserList: undefined;
  UserForm: { user?: User };
  Map: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: { backgroundColor: '#424242' },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: { fontWeight: '500' },
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Acesso' }} />
        <Stack.Screen name="UserList" component={UserListScreen} options={{ title: 'Usuários' }} />
        <Stack.Screen name="UserForm" component={UserFormScreen} options={{ title: 'Novo Usuário' }} />
        <Stack.Screen name="Map" component={MapScreen} options={{ title: 'Mapa e Marcações' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}