import { Controller, Get, Post, Param, Body } from '@midwayjs/core';

@Controller('/api')
export class HomeController {
  @Get('/health')
  async health() {
    return { ok: true, framework: 'midway' };
  }

  @Get('/users/:id')
  async user(@Param('id') id: string) {
    return { user: id, source: 'midway' };
  }

  @Post('/echo')
  async echo(@Body() body: any) {
    return { received: body };
  }
}
