export interface User {
  id: string;
  name: string;
  login: string;
  password: string;
}

export type CreateUserDTO = Omit<User, 'id'>;
export type UpdateUserDTO = Partial<Omit<User, 'id'>>;

export interface IUserRepository {
  getAll(): Promise<User[]>;
  findByLogin(login: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  save(user: User): Promise<void>;
  update(user: User): Promise<void>;
  delete(id: string): Promise<void>;
}