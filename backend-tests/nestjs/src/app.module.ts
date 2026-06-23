import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';

@Module({
  imports: [
    // 静态文件托管：根路径返回 public/index.html 演示页
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      // 仅根路径 / 返回演示页，不做 SPA 全局回退（避免拦截 /api/* 的 404）
      renderPath: '/',
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
