# Express-export fixture

Express + `module.exports = app`（无 `app.listen()`）。跟 Express-listen 配对，二者一起证明 backend-runtime 两种风格都覆盖。

测试目标：
- TestStep 探测 Express → 走 backend 路径
- start.js 通过"导出函数 → createServer"路径派发（运行时行为，单测覆盖）
- E2E 层断言：detected Express + Backend zip 生成
