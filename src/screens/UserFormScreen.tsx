import React, { useState, useLayoutEffect } from 'react';
import { View, Alert, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { CustomInput } from '../components/CustomInput';
import { PrimaryButton } from '../components/PrimaryButton';
import { UserService } from '../domain/UserService';
import { AsyncStorageUserRepository } from '../infra/AsyncStorageUserRepository';

type Props = NativeStackScreenProps<RootStackParamList, 'UserForm'>;
const userService = new UserService(new AsyncStorageUserRepository());

export function UserFormScreen({ navigation, route }: Props) {
  const editingUser = route.params?.user;

  const [name, setName] = useState(editingUser?.name ?? '');
  const [login, setLogin] = useState(editingUser?.login ?? '');
  const [password, setPassword] = useState(editingUser?.password ?? '');
  const [confirmPassword, setConfirmPassword] = useState(editingUser?.password ?? '');

  useLayoutEffect(() => {
    navigation.setOptions({
      title: editingUser ? 'Editar Usuário' : 'Novo Usuário',
    });
  }, [navigation, editingUser]);

  async function handleSave() {
    try {
      const payload = { name, login, password, confirmPassword };
      if (editingUser) {
        await userService.updateUser(editingUser.id, payload);
      } else {
        await userService.createUser(payload);
      }
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro de Validação', (error as Error).message);
    }
  }

  async function handleDelete() {
    if (!editingUser) return;
    await userService.removeUser(editingUser.id);
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <CustomInput
        placeholder="Nome"
        autoCapitalize="words"
        value={name}
        onChangeText={setName}
      />
      <CustomInput placeholder="Login" value={login} onChangeText={setLogin} />
      <CustomInput
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <CustomInput
        placeholder="Confirmar Senha"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      <PrimaryButton title="Salvar" iconName="save" onPress={handleSave} />

      {editingUser && (
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.deleteText}>Excluir Usuário</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#303030',
    padding: 20,
    paddingTop: 24,
  },
  deleteButton: {
    marginTop: 20,
    alignItems: 'center',
    padding: 10,
  },
  deleteText: {
    color: '#EF5350',
    fontSize: 15,
    fontWeight: '500',
  },
});