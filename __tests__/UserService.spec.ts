import { UserService } from '../src/domain/UserService';
import { IUserRepository, User } from '../src/domain/User';

class InMemoryUserRepository implements IUserRepository {
  public users: User[] = [];
  async getAll() { return [...this.users]; }
  async findByLogin(login: string) {
    return this.users.find((u) => u.login.toLowerCase() === login.toLowerCase()) ?? null;
  }
  async findById(id: string) { return this.users.find((u) => u.id === id) ?? null; }
  async save(user: User) { this.users.push(user); }
  async update(user: User) {
    this.users = this.users.map((u) => (u.id === user.id ? user : u));
  }
  async delete(id: string) { this.users = this.users.filter((u) => u.id !== id); }
}

describe('UserService (Unitário)', () => {
  let repo: InMemoryUserRepository;
  let service: UserService;

  beforeEach(() => {
    repo = new InMemoryUserRepository();
    service = new UserService(repo);
  });

  it('deve criar usuário padrão admin quando repositório estiver vazio', async () => {
    await service.seedDefaultUserIfEmpty();
    const users = await service.listUsers();
    expect(users).toHaveLength(1);
    expect(users[0].login).toBe('admin');
  });

  it('deve autenticar usuário válido e bloquear senha incorreta', async () => {
    await service.createUser({
      name: 'Uedson Reis',
      login: 'uedsonreis',
      password: '1234',
      confirmPassword: '1234',
    });

    const logged = await service.authenticate({ login: 'uedsonreis', password: '1234' });
    expect(logged.name).toBe('Uedson Reis');

    await expect(
      service.authenticate({ login: 'uedsonreis', password: 'errada' })
    ).rejects.toThrow('Login ou senha inválidos');
  });

  it('deve rejeitar cadastro se senhas não conferirem ou login já existir', async () => {
    await expect(
      service.createUser({
        name: 'Heitor Reis',
        login: 'heitorreis',
        password: '1234',
        confirmPassword: '9999',
      })
    ).rejects.toThrow('As senhas não conferem');

    await service.createUser({
      name: 'Heitor Reis',
      login: 'heitorreis',
      password: '1234',
      confirmPassword: '1234',
    });

    await expect(
      service.createUser({
        name: 'Outro Nome',
        login: 'heitorreis',
        password: '1234',
        confirmPassword: '1234',
      })
    ).rejects.toThrow('Este login já está em uso');
  });
});