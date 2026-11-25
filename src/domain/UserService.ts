import { IUserRepository, User } from './User';
import { loginSchema, userFormSchema, LoginInput, UserFormInput } from './userSchema';

export class UserService {
  constructor(private readonly repository: IUserRepository) {}

  async seedDefaultUserIfEmpty(): Promise<void> {
    const users = await this.repository.getAll();
    if (users.length === 0) {
      await this.repository.save({
        id: '1',
        name: 'Administrador',
        login: 'admin',
        password: '1234',
      });
    }
  }

  async authenticate(input: LoginInput): Promise<User> {
    const parsed = loginSchema.safeParse(input);
    if (!parsed.success) {
      throw new Error(parsed.error.issues[0].message);
    }

    const user = await this.repository.findByLogin(parsed.data.login);
    if (!user || user.password !== parsed.data.password) {
      throw new Error('Login ou senha inválidos');
    }

    return user;
  }

  async listUsers(): Promise<User[]> {
    return this.repository.getAll();
  }

  async createUser(input: UserFormInput): Promise<User> {
    const parsed = userFormSchema.safeParse(input);
    if (!parsed.success) {
      throw new Error(parsed.error.issues[0].message);
    }

    const existing = await this.repository.findByLogin(parsed.data.login);
    if (existing) {
      throw new Error('Este login já está em uso');
    }

    const newUser: User = {
      id: Date.now().toString(),
      name: parsed.data.name,
      login: parsed.data.login,
      password: parsed.data.password,
    };

    await this.repository.save(newUser);
    return newUser;
  }

  async updateUser(id: string, input: UserFormInput): Promise<User> {
    const parsed = userFormSchema.safeParse(input);
    if (!parsed.success) {
      throw new Error(parsed.error.issues[0].message);
    }

    const current = await this.repository.findById(id);
    if (!current) {
      throw new Error('Usuário não encontrado');
    }

    const existingLogin = await this.repository.findByLogin(parsed.data.login);
    if (existingLogin && existingLogin.id !== id) {
      throw new Error('Este login já pertence a outro usuário');
    }

    const updatedUser: User = {
      id,
      name: parsed.data.name,
      login: parsed.data.login,
      password: parsed.data.password,
    };

    await this.repository.update(updatedUser);
    return updatedUser;
  }

  async removeUser(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}