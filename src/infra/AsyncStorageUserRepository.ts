import AsyncStorage from '@react-native-async-storage/async-storage';
import { IUserRepository, User } from '../domain/User';
import { storedUserArraySchema } from '../domain/userSchema';

const STORAGE_KEY = '@controle_acesso:users';

export class AsyncStorageUserRepository implements IUserRepository {
  async getAll(): Promise<User[]> {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    try {
      const parsedJson = JSON.parse(raw);
      const validated = storedUserArraySchema.safeParse(parsedJson);
      return validated.success ? validated.data : [];
    } catch {
      return [];
    }
  }

  async findByLogin(login: string): Promise<User | null> {
    const users = await this.getAll();
    return users.find((u) => u.login.toLowerCase() === login.toLowerCase()) ?? null;
  }

  async findById(id: string): Promise<User | null> {
    const users = await this.getAll();
    return users.find((u) => u.id === id) ?? null;
  }

  async save(user: User): Promise<void> {
    const users = await this.getAll();
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify([...users, user]));
  }

  async update(updatedUser: User): Promise<void> {
    const users = await this.getAll();
    const nextUsers = users.map((u) => (u.id === updatedUser.id ? updatedUser : u));
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(nextUsers));
  }

  async delete(id: string): Promise<void> {
    const users = await this.getAll();
    const filtered = users.filter((u) => u.id !== id);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  }
}