import { Controller, Get, Post, Body, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiKeyGuard } from '../common/guards/api-key.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findById(id);
  }

  @Post()
  @UseGuards(ApiKeyGuard)
  create(@Body() body: { name: string; email?: string }) {
    return this.usersService.create(body);
  }
}
