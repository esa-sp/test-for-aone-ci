import { Controller, Get, Post, Param, Body } from '@nestjs/common';

@Controller('api')
export class AppController {
  @Get('health')
  health() {
    return { ok: true, framework: 'nestjs' };
  }

  @Get('users/:id')
  user(@Param('id') id: string) {
    return { user: id, source: 'nestjs' };
  }

  @Post('echo')
  echo(@Body() body: any) {
    return { received: body };
  }
}
