import { Injectable } from '@nestjs/common';

export interface User {
  id: number;
  name: string;
  email?: string;
}

@Injectable()
export class UsersService {
  private users: Map<number, User> = new Map();

  findById(id: number): User {
    return this.users.get(id) || { id, name: `user-${id}` };
  }

  create(data: { name: string; email?: string }): User {
    const id = Date.now();
    const user: User = { id, ...data };
    this.users.set(id, user);
    return user;
  }
}
