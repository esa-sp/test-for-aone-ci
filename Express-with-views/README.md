# Express-with-views fixture

Express + `views/` 模板目录（含一个 `home.ejs` 和一个 `partials/header.ejs`）。

测试目标：
- TestStep 探测 Express → 走 backend 路径
- backend-runtime 自动 includeFiles `views/`（Vercel @vercel/express 的同款行为，由 `FRAMEWORK_INCLUDE_DIRS` 注入）
- 实际能从 nft trace 后的总文件数推断出 views 文件被纳入（强断言需要单测；E2E 弱断言：build 成功）

> nft 静态分析跟不到 `res.render('home')` 这种动态路径，所以必须由 backend-runtime 主动把 views 目录加进 fileList，否则线上模板就 404 了。
