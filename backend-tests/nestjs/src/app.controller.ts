import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { CreateItemDto } from './create-item.dto';

@Controller('api')
export class AppController {
  @Get('health')
  health() {
    return { ok: true, framework: 'nestjs', service: '资源管理', message: '服务运行中' };
  }

  @Get('users/:id')
  user(@Param('id') id: string) {
    return { user: id, source: 'nestjs', name: `用户#${id}`, role: 'admin' };
  }

  @Post('echo')
  echo(@Body() body: any) {
    return { received: body, echoed: true, timestamp: new Date().toISOString() };
  }

  // 资源列表
  @Get('items')
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
  @Post('items')
  createItem(@Body() dto: CreateItemDto) {
    return { created: true, id: Date.now(), ...dto };
  }
}
