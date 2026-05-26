// Sentinel entry for backend-runtime nft trace.
// 真正的运行 entry 是 egg-scripts（在 meta.json 的 spawnCommand 里），
// 这个文件只是给 @vercel/nft 一个"从这里开始追依赖图"的起点，
// 让 egg + egg-scripts + 项目自己的 controller/router/config 都被 trace 到。
require('egg-scripts');
require('egg');
require('./app/router');
require('./app/controller/home');
require('./config/config.default');
// 显式让 nft 把 egg-scripts 的 bin 入口及其依赖图也追进来 ——
// 真正的 spawn 命令是 `node node_modules/egg-scripts/bin/egg-scripts.js`，
// 没有这一行 nft 只会拉 egg-scripts 的 main，bin 文件不在 trace 结果里。
require.resolve('egg-scripts/bin/egg-scripts');
