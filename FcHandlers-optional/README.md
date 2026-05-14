# FcHandlers-optional fixture

无后端框架，`/api/` 下只有一个 `[[...slug]].js` 测试**末尾可选 catch-all**：

- pattern `^/api(?:/(.+?))?/?$`
- 既匹配 `/api` 本身（slug 为 null），也匹配 `/api/foo/bar/baz`（slug 为 `"foo/bar/baz"`）

测试目标：scanFcHandlers 正确编译 `[[...name]]` 段；这是 4 种段类型里语义最复杂的一种。
