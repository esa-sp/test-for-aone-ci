"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const create_item_dto_1 = require("./create-item.dto");
let AppController = class AppController {
    health() {
        return { ok: true, framework: 'nestjs', service: '资源管理', message: '服务运行中' };
    }
    user(id) {
        return { user: id, source: 'nestjs', name: `用户#${id}`, role: 'admin' };
    }
    echo(body) {
        return { received: body, echoed: true, timestamp: new Date().toISOString() };
    }
    // 资源列表
    listItems() {
        return {
            total: 3,
            items: [
                { id: 1, name: '资源-A', price: 99 },
                { id: 2, name: '资源-B', price: 199 },
                { id: 3, name: '资源-C', price: 299 },
            ],
        };
    }
    // 创建资源 · ValidationPipe 自动校验 DTO（NestJS 特色）
    createItem(dto) {
        return { created: true, id: Date.now(), ...dto };
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)('health'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "health", null);
__decorate([
    (0, common_1.Get)('users/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "user", null);
__decorate([
    (0, common_1.Post)('echo'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "echo", null);
__decorate([
    (0, common_1.Get)('items'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "listItems", null);
__decorate([
    (0, common_1.Post)('items'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_item_dto_1.CreateItemDto]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "createItem", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)('api')
], AppController);
