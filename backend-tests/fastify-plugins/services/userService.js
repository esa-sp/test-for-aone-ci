class UserService {
  constructor() {
    this.store = new Map();
  }

  findById(id) {
    return this.store.get(id) || { id, name: `user-${id}` };
  }

  create(data) {
    const id = String(Date.now());
    const user = { id, ...data, created: true };
    this.store.set(id, user);
    return user;
  }
}

module.exports = { UserService };
