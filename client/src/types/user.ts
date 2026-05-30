export type UserRole = 'admin' | 'member' | 'guest';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
  updatedAt?: string;
}

export type UserPayload = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;
