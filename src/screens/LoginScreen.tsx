import React, { useState, useEffect } from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { CustomInput } from '../components/CustomInput';
import { PrimaryButton } from '../components/PrimaryButton';
import { UserService } from '../domain/UserService';
import { AsyncStorageUserRepository } from '../infra/AsyncStorageUserRepository';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;
const userService = new UserService(new AsyncStorageUserRepository());

export function LoginScreen({ navigation }: Props) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    userService.seedDefaultUserIfEmpty();
  }, []);

  async function handleLogin() {
    try {
      await userService.authenticate({ login, password });
      setLogin('');
      setPassword('');
      navigation.replace('UserList');
    } catch (error) {
      Alert.alert('Acesso Negado', (error as Error).message);
    }
  }

  return (
    <View style={styles.container}>
      <CustomInput placeholder="Login" value={login} onChangeText={setLogin} />
      <CustomInput
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <PrimaryButton title="Entrar" iconName="log-in-outline" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#303030',
    padding: 20,
    paddingTop: 32,
  },
});