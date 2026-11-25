import AsyncStorage from '@react-native-async-storage/async-storage';
import { AsyncStorageUserRepository } from '../src/infra/AsyncStorageUserRepository';
import { UserService } from '../src/domain/UserService';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

describe('Integração: UserService + AsyncStorageUserRepository', () => {
  beforeEach(async () => {
    await AsyncStorage.clear();
  });

  it('deve persistir, atualizar e remover usuário no AsyncStorage', async () => {
    const service = new UserService(new AsyncStorageUserRepository());

    const created = await service.createUser({
      name: 'Fulano de Tal',
      login: 'fulanotal',
      password: '1234',
      confirmPassword: '1234',
    });

    let list = await service.listUsers();
    expect(list).toHaveLength(1);

    await service.updateUser(created.id, {
      name: 'Fulano Atualizado',
      login: 'fulanotal',
      password: '1234',
      confirmPassword: '1234',
    });

    list = await service.listUsers();
    expect(list[0].name).toBe('Fulano Atualizado');

    await service.removeUser(created.id);
    list = await service.listUsers();
    expect(list).toHaveLength(0);
  });
});