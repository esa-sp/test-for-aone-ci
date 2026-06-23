import { IsString, IsInt, MinLength } from 'class-validator';

/**
 * 创建资源 DTO · 配合全局 ValidationPipe 自动校验
 * - name: 字符串，最少 2 字符
 * - price: 整数
 */
export class CreateItemDto {
  @IsString()
  @MinLength(2)
  name: string;

  @IsInt()
  price: number;
}
