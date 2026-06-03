import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [HealthModule, UsersModule, ProductsModule],
})
export class AppModule {}
