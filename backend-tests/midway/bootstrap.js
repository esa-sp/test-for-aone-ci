// Midway 入口：标准 @midwayjs/bootstrap 调用
// NODE_ENV=production 让 midway 走 dist/ 加载编译后的 JS（默认会试 src/ + ts-node）
process.env.NODE_ENV = process.env.NODE_ENV || 'production';

const { Bootstrap } = require('@midwayjs/bootstrap');
Bootstrap.run();
