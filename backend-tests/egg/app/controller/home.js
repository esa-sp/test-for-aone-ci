const Controller = require('egg').Controller;

class HomeController extends Controller {
  async health() {
    this.ctx.body = { ok: true, framework: 'egg' };
  }

  async user() {
    this.ctx.body = { user: this.ctx.params.id, source: 'egg' };
  }

  async echo() {
    this.ctx.body = { received: this.ctx.request.body };
  }
}

module.exports = HomeController;
