/**
 * 用户服务层 —— 模拟真实项目中 service 层的依赖关系
 */
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
