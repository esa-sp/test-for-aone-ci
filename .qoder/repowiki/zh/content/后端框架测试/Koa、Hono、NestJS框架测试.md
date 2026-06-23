# Koa、Hono、NestJS框架测试

<cite>
**本文档引用的文件**
- [Koa-app/app.js](file://Koa-app/app.js)
- [Hono-app/app.js](file://Hono-app/app.js)
- [NestJS-app/src/main.ts](file://NestJS-app/src/main.ts)
- [backend-tests/koa/meta.json](file://backend-tests/koa/meta.json)
- [backend-tests/hono/meta.json](file://backend-tests/hono/meta.json)
- [backend-tests/nestjs/meta.json](file://backend-tests/nestjs/meta.json)
- [backend-tests/koa/package.json](file://backend-tests/koa/package.json)
- [backend-tests/hono/package.json](file://backend-tests/hono/package.json)
- [backend-tests/nestjs/package.json](file://backend-tests/nestjs/package.json)
- [backend-tests/koa/server.js](file://backend-tests/koa/server.js)
- [backend-tests/hono/app.js](file://backend-tests/hono/app.js)
- [backend-tests/nestjs/dist/main.js](file://backend-tests/nestjs/dist/main.js)
- [backend-tests/nestjs/src/app.module.ts](file://backend-tests/nestjs/src/app.module.ts)
- [backend-tests/nestjs/src/app.controller.ts](file://backend-tests/nestjs/src/app.controller.ts)
- [backend-tests/README.md](file://backend-tests/README.md)
- [case.json](file://case.json)
- [backend-tests/koa/public/index.html](file://backend-tests/koa/public/index.html)
- [backend-tests/hono/public/index.html](file://backend-tests/hono/public/index.html)
- [backend-tests/nestjs/public/index.html](file://backend-tests/nestjs/public/index.html)
- [backend-tests/koa/public/style.css](file://backend-tests/koa/public/style.css)
- [backend-tests/hono/public/style.css](file://backend-tests/hono/public/style.css)
- [backend-tests/nestjs/public/style.css](file://backend-tests/nestjs/public/style.css)
- [backend-tests/_shared/demo-page.template.html](file://backend-tests/_shared/demo-page.template.html)
- [backend-tests/_shared/demo-page.css](file://backend-tests/_shared/demo-page.css)
- [backend-tests/koa/template.json](file://backend-tests/koa/template.json)
- [backend-tests/hono/template.json](file://backend-tests/hono/template.json)
- [backend-tests/nestjs/template.json](file://backend-tests/nestjs/template.json)
</cite>

## 更新摘要
**所做更改**
- 新增演示页面和静态文件服务功能的详细分析
- 更新项目结构章节以包含public目录和静态资源
- 增强核心组件分析以涵盖交互式测试功能
- 扩展架构总览以反映静态文件服务流程
- 新增静态文件服务和演示页面的专门章节

## 目录
1. [简介](#简介)
2. [项目结构](#项目结构)
3. [核心组件](#核心组件)
4. [架构总览](#架构总览)
5. [详细组件分析](#详细组件分析)
6. [静态文件服务与演示页面](#静态文件服务与演示页面)
7. [交互式测试功能](#交互式测试功能)
8. [依赖关系分析](#依赖关系分析)
9. [性能考量](#性能考量)
10. [故障排查指南](#故障排查指南)
11. [结论](#结论)
12. [附录](#附录)

## 简介
本文件面向Koa、Hono与NestJS三类现代后端框架，提供系统化的测试实现与对比分析。重点涵盖：
- 三种框架的项目结构差异与入口文件处理方式
- 构建流程与部署策略（基于仓库中的测试夹具与断言）
- 框架检测机制的实现细节（通过代码特征识别框架类型）
- 各框架优缺点、适用场景与迁移建议
- **新增**：演示页面、静态文件服务和交互式测试功能的完整实现

## 项目结构
本仓库包含三类测试夹具与配套断言，现已增强为包含完整的演示页面和静态文件服务：
- Koa应用夹具：包含最小可运行示例、断言元数据和演示页面
- Hono应用夹具：包含最小可运行示例、断言元数据和演示页面  
- NestJS应用夹具：包含TypeScript源码与编译产物，断言元数据指向dist产物，以及演示页面

```mermaid
graph TB
subgraph "Koa夹具(增强版)"
K1["backend-tests/koa/package.json"]
K2["backend-tests/koa/server.js"]
K3["backend-tests/koa/meta.json"]
K4["backend-tests/koa/public/"]
K4A["index.html"]
K4B["style.css"]
K5["backend-tests/koa/template.json"]
end
subgraph "Hono夹具(增强版)"
H1["backend-tests/hono/package.json"]
H2["backend-tests/hono/app.js"]
H3["backend-tests/hono/meta.json"]
H4["backend-tests/hono/public/"]
H4A["index.html"]
H4B["style.css"]
H5["backend-tests/hono/template.json"]
end
subgraph "NestJS夹具(增强版)"
N1["backend-tests/nestjs/package.json"]
N2["backend-tests/nestjs/src/app.module.ts"]
N3["backend-tests/nestjs/src/app.controller.ts"]
N4["backend-tests/nestjs/dist/main.js"]
N5["backend-tests/nestjs/meta.json"]
N6["backend-tests/nestjs/public/"]
N6A["index.html"]
N6B["style.css"]
N7["backend-tests/nestjs/template.json"]
end
K1 --> K2 --> K3 --> K4 --> K5
H1 --> H2 --> H3 --> H4 --> H5
N1 --> N2 --> N3 --> N4 --> N5 --> N6 --> N7
```

**图表来源**
- [backend-tests/koa/package.json:1-11](file://backend-tests/koa/package.json#L1-L11)
- [backend-tests/koa/server.js:1-26](file://backend-tests/koa/server.js#L1-L26)
- [backend-tests/koa/meta.json:1-14](file://backend-tests/koa/meta.json#L1-L14)
- [backend-tests/koa/public/index.html:1-50](file://backend-tests/koa/public/index.html#L1-L50)
- [backend-tests/koa/public/style.css:1-30](file://backend-tests/koa/public/style.css#L1-L30)
- [backend-tests/koa/template.json:1-20](file://backend-tests/koa/template.json#L1-L20)
- [backend-tests/hono/package.json:1-9](file://backend-tests/hono/package.json#L1-L9)
- [backend-tests/hono/app.js:1-15](file://backend-tests/hono/app.js#L1-L15)
- [backend-tests/hono/meta.json:1-14](file://backend-tests/hono/meta.json#L1-L14)
- [backend-tests/hono/public/index.html:1-50](file://backend-tests/hono/public/index.html#L1-L50)
- [backend-tests/hono/public/style.css:1-30](file://backend-tests/hono/public/style.css#L1-L30)
- [backend-tests/hono/template.json:1-20](file://backend-tests/hono/template.json#L1-L20)
- [backend-tests/nestjs/package.json:1-21](file://backend-tests/nestjs/package.json#L1-L21)
- [backend-tests/nestjs/src/app.module.ts:1-8](file://backend-tests/nestjs/src/app.module.ts#L1-L8)
- [backend-tests/nestjs/src/app.controller.ts:1-20](file://backend-tests/nestjs/src/app.controller.ts#L1-L20)
- [backend-tests/nestjs/dist/main.js:1-11](file://backend-tests/nestjs/dist/main.js#L1-L11)
- [backend-tests/nestjs/meta.json:1-15](file://backend-tests/nestjs/meta.json#L1-L15)
- [backend-tests/nestjs/public/index.html:1-50](file://backend-tests/nestjs/public/index.html#L1-L50)
- [backend-tests/nestjs/public/style.css:1-30](file://backend-tests/nestjs/public/style.css#L1-L30)
- [backend-tests/nestjs/template.json:1-20](file://backend-tests/nestjs/template.json#L1-L20)

**章节来源**
- [backend-tests/README.md:18-28](file://backend-tests/README.md#L18-L28)
- [backend-tests/README.md:38-84](file://backend-tests/README.md#L38-L84)

## 核心组件
- Koa应用夹具
  - 入口与运行：使用Koa实例并通过监听端口的方式启动服务
  - 路由与中间件：集成路由与请求体解析中间件
  - **新增**：演示页面和静态文件服务，提供交互式测试界面
  - 断言：包含健康检查、参数路由、POST回显与404断言
- Hono应用夹具
  - 入口与运行：导出Hono实例，供Web适配器以fetch风格调用
  - 路由与请求处理：使用上下文返回JSON响应
  - **新增**：演示页面和静态文件服务，提供交互式测试界面
  - 断言：与Koa一致的路径集合与状态码断言
- NestJS应用夹具
  - 入口与运行：TypeScript源码经编译生成dist/main.js，通过NestFactory创建应用并监听端口
  - 控制器与模块：声明式模块与控制器组织业务逻辑
  - **新增**：演示页面和静态文件服务，提供交互式测试界面
  - 断言：与Koa/Hono一致的路径集合，包含不同响应码差异

**章节来源**
- [Koa-app/app.js:1-10](file://Koa-app/app.js#L1-L10)
- [backend-tests/koa/server.js:1-26](file://backend-tests/koa/server.js#L1-L26)
- [backend-tests/koa/meta.json:1-14](file://backend-tests/koa/meta.json#L1-L14)
- [backend-tests/koa/public/index.html:1-50](file://backend-tests/koa/public/index.html#L1-L50)
- [backend-tests/koa/public/style.css:1-30](file://backend-tests/koa/public/style.css#L1-L30)
- [Hono-app/app.js:1-8](file://Hono-app/app.js#L1-L8)
- [backend-tests/hono/app.js:1-15](file://backend-tests/hono/app.js#L1-L15)
- [backend-tests/hono/meta.json:1-14](file://backend-tests/hono/meta.json#L1-L14)
- [backend-tests/hono/public/index.html:1-50](file://backend-tests/hono/public/index.html#L1-L50)
- [backend-tests/hono/public/style.css:1-30](file://backend-tests/hono/public/style.css#L1-L30)
- [NestJS-app/src/main.ts:1-13](file://NestJS-app/src/main.ts#L1-L13)
- [backend-tests/nestjs/src/app.module.ts:1-8](file://backend-tests/nestjs/src/app.module.ts#L1-L8)
- [backend-tests/nestjs/src/app.controller.ts:1-20](file://backend-tests/nestjs/src/app.controller.ts#L1-L20)
- [backend-tests/nestjs/dist/main.js:1-11](file://backend-tests/nestjs/dist/main.js#L1-L11)
- [backend-tests/nestjs/meta.json:1-15](file://backend-tests/nestjs/meta.json#L1-L15)
- [backend-tests/nestjs/public/index.html:1-50](file://backend-tests/nestjs/public/index.html#L1-L50)
- [backend-tests/nestjs/public/style.css:1-30](file://backend-tests/nestjs/public/style.css#L1-L30)

## 架构总览
下图展示了三类夹具从"入口文件"到"HTTP响应"的关键流程，以及断言驱动的验证路径。**新增**了静态文件服务和演示页面的处理流程。

```mermaid
sequenceDiagram
participant Runner as "测试运行器"
participant KoaEntry as "Koa入口(server.js)"
participant HonoEntry as "Hono入口(app.js)"
participant NestEntry as "NestJS入口(dist/main.js)"
participant StaticServer as "静态文件服务器"
participant DemoPage as "演示页面"
participant KoaRouter as "Koa路由/中间件"
participant HonoRouter as "Hono路由"
participant NestCtrl as "Nest控制器"
Runner->>KoaEntry : "启动并监听端口"
KoaEntry->>StaticServer : "提供静态文件服务"
KoaEntry->>DemoPage : "渲染演示页面"
KoaEntry->>KoaRouter : "注册路由与中间件"
Runner->>HonoEntry : "导出fetch处理器"
Runner->>StaticServer : "提供静态文件服务"
Runner->>DemoPage : "渲染演示页面"
Runner->>NestEntry : "启动Nest应用"
NestEntry->>StaticServer : "提供静态文件服务"
NestEntry->>DemoPage : "渲染演示页面"
NestEntry->>NestCtrl : "初始化模块与控制器"
Runner->>KoaEntry : "HTTP请求 /api/*"
KoaEntry-->>Runner : "断言匹配(状态码/响应体)"
Runner->>HonoEntry : "HTTP请求 /api/*"
HonoEntry-->>Runner : "断言匹配(状态码/响应体)"
Runner->>NestEntry : "HTTP请求 /api/*"
NestEntry-->>Runner : "断言匹配(状态码/响应体)"
```

**图表来源**
- [backend-tests/koa/server.js:1-26](file://backend-tests/koa/server.js#L1-L26)
- [backend-tests/hono/app.js:1-15](file://backend-tests/hono/app.js#L1-L15)
- [backend-tests/nestjs/dist/main.js:1-11](file://backend-tests/nestjs/dist/main.js#L1-L11)
- [backend-tests/koa/meta.json:7-12](file://backend-tests/koa/meta.json#L7-L12)
- [backend-tests/hono/meta.json:7-12](file://backend-tests/hono/meta.json#L7-L12)
- [backend-tests/nestjs/meta.json:8-13](file://backend-tests/nestjs/meta.json#L8-L13)

## 详细组件分析

### Koa组件分析
- 项目结构与入口
  - 使用Koa实例并通过监听端口启动
  - 集成路由与请求体解析中间件
  - **新增**：public目录提供静态文件服务，包含演示页面和样式文件
- 关键实现要点
  - 中间件顺序：请求体解析需在路由之前
  - 路由设计：统一在根路径下提供健康检查、参数路由与POST回显
  - **新增**：静态文件中间件配置，支持HTML、CSS、JavaScript等静态资源
- 断言与验证
  - 包含健康检查、参数路由、POST回显与404断言
  - 通过meta.json定义期望状态码与响应体子集
  - **新增**：演示页面加载和交互测试

```mermaid
flowchart TD
Start(["Koa入口启动"]) --> SetupStatic["配置静态文件服务"]
SetupStatic --> UseBodyParser["使用请求体解析中间件"]
UseBodyParser --> UseRouter["注册路由与方法"]
UseRouter --> Listen["监听端口并等待请求"]
Listen --> Request["接收HTTP请求"]
Request --> RouteMatch{"匹配到路由?"}
RouteMatch --> |是| Handler["执行对应处理器"]
RouteMatch --> |否| StaticServe["提供静态文件"]
Handler --> Respond["构造响应并返回"]
StaticServe --> Respond
Respond --> End(["结束"])
```

**图表来源**
- [backend-tests/koa/server.js:1-26](file://backend-tests/koa/server.js#L1-L26)
- [backend-tests/koa/meta.json:7-12](file://backend-tests/koa/meta.json#L7-L12)

**章节来源**
- [Koa-app/app.js:1-10](file://Koa-app/app.js#L1-L10)
- [backend-tests/koa/server.js:1-26](file://backend-tests/koa/server.js#L1-L26)
- [backend-tests/koa/meta.json:1-14](file://backend-tests/koa/meta.json#L1-L14)
- [backend-tests/koa/package.json:1-11](file://backend-tests/koa/package.json#L1-L11)

### Hono组件分析
- 项目结构与入口
  - 导出Hono实例，供Web适配器以fetch风格调用
  - 路由以上下文形式返回JSON响应
  - **新增**：public目录提供静态文件服务，包含演示页面和样式文件
- 关键实现要点
  - 请求体读取：异步读取JSON并返回
  - 路由参数：通过上下文获取参数
  - **新增**：静态文件中间件配置，支持演示页面的完整展示
- 断言与验证
  - 与Koa一致的路径集合与状态码断言
  - **新增**：演示页面交互功能测试

```mermaid
sequenceDiagram
participant Adapter as "Web适配器"
participant HonoApp as "Hono应用"
participant StaticServer as "静态文件服务器"
participant DemoPage as "演示页面"
participant Router as "Hono路由"
Adapter->>HonoApp : "调用fetch(request)"
HonoApp->>StaticServer : "提供静态文件服务"
HonoApp->>DemoPage : "渲染演示页面"
HonoApp->>Router : "匹配路由并解析参数/请求体"
Router-->>HonoApp : "返回JSON响应"
HonoApp-->>Adapter : "Response对象"
```

**图表来源**
- [Hono-app/app.js:1-8](file://Hono-app/app.js#L1-L8)
- [backend-tests/hono/app.js:1-15](file://backend-tests/hono/app.js#L1-L15)
- [backend-tests/hono/meta.json:7-12](file://backend-tests/hono/meta.json#L7-L12)

**章节来源**
- [Hono-app/app.js:1-8](file://Hono-app/app.js#L1-L8)
- [backend-tests/hono/app.js:1-15](file://backend-tests/hono/app.js#L1-L15)
- [backend-tests/hono/meta.json:1-14](file://backend-tests/hono/meta.json#L1-L14)
- [backend-tests/hono/package.json:1-9](file://backend-tests/hono/package.json#L1-L9)

### NestJS组件分析
- 项目结构与入口
  - TypeScript源码位于src，编译产物位于dist
  - 入口文件通过NestFactory创建应用并监听端口
  - **新增**：public目录提供静态文件服务，包含演示页面和样式文件
- 关键实现要点
  - 模块化：通过装饰器声明模块与控制器
  - 控制器：统一在/api路径下提供健康检查、参数路由与POST回显
  - **新增**：静态文件服务集成，支持演示页面的完整功能展示
- 断言与验证
  - 与Koa/Hono一致的路径集合，包含不同响应码差异
  - **新增**：演示页面交互测试和静态资源访问测试

```mermaid
classDiagram
class AppModule {
+controllers : AppController[]
}
class AppController {
+health() any
+user(id : string) any
+echo(body : any) any
}
class NestFactory {
+create(module) Application
}
class Application {
+listen(port) Promise<void>
}
class StaticFileService {
+serveStatic(path) void
}
AppModule --> AppController : "注册控制器"
NestFactory --> AppModule : "创建应用"
AppModule --> Application : "初始化"
Application --> StaticFileService : "配置静态文件服务"
```

**图表来源**
- [backend-tests/nestjs/src/app.module.ts:1-8](file://backend-tests/nestjs/src/app.module.ts#L1-L8)
- [backend-tests/nestjs/src/app.controller.ts:1-20](file://backend-tests/nestjs/src/app.controller.ts#L1-L20)
- [NestJS-app/src/main.ts:1-13](file://NestJS-app/src/main.ts#L1-L13)
- [backend-tests/nestjs/dist/main.js:1-11](file://backend-tests/nestjs/dist/main.js#L1-L11)

**章节来源**
- [NestJS-app/src/main.ts:1-13](file://NestJS-app/src/main.ts#L1-L13)
- [backend-tests/nestjs/src/app.module.ts:1-8](file://backend-tests/nestjs/src/app.module.ts#L1-L8)
- [backend-tests/nestjs/src/app.controller.ts:1-20](file://backend-tests/nestjs/src/app.controller.ts#L1-L20)
- [backend-tests/nestjs/dist/main.js:1-11](file://backend-tests/nestjs/dist/main.js#L1-L11)
- [backend-tests/nestjs/meta.json:1-15](file://backend-tests/nestjs/meta.json#L1-L15)
- [backend-tests/nestjs/package.json:1-21](file://backend-tests/nestjs/package.json#L1-L21)

## 静态文件服务与演示页面

### 演示页面架构
三个框架均已集成完整的演示页面系统，提供交互式测试体验：

- **演示页面模板**：使用共享模板系统，包含统一的HTML结构和样式
- **静态资源管理**：CSS样式文件独立管理，支持响应式设计
- **交互式测试**：用户可以通过浏览器界面直接测试API功能

### 静态文件服务实现
- **文件结构**：每个框架的public目录包含index.html和style.css
- **服务配置**：通过中间件或平台配置提供静态文件服务
- **资源优化**：支持缓存策略和压缩优化

```mermaid
graph TB
SharedTemplate["_shared/demo-page.template.html"] --> KoaDemo["Koa演示页面"]
SharedTemplate --> HonoDemo["Hono演示页面"]
SharedTemplate --> NestDemo["NestJS演示页面"]
SharedCSS["_shared/demo-page.css"] --> KoaCSS["Koa样式"]
SharedCSS --> HonoCSS["Hono样式"]
SharedCSS --> NestCSS["NestJS样式"]
KoaDemo --> KoaCSS
HonoDemo --> HonoCSS
NestDemo --> NestCSS
```

**图表来源**
- [backend-tests/_shared/demo-page.template.html:1-100](file://backend-tests/_shared/demo-page.template.html#L1-L100)
- [backend-tests/_shared/demo-page.css:1-50](file://backend-tests/_shared/demo-page.css#L1-L50)
- [backend-tests/koa/public/index.html:1-50](file://backend-tests/koa/public/index.html#L1-L50)
- [backend-tests/hono/public/index.html:1-50](file://backend-tests/hono/public/index.html#L1-L50)
- [backend-tests/nestjs/public/index.html:1-50](file://backend-tests/nestjs/public/index.html#L1-L50)

**章节来源**
- [backend-tests/_shared/demo-page.template.html:1-100](file://backend-tests/_shared/demo-page.template.html#L1-L100)
- [backend-tests/_shared/demo-page.css:1-50](file://backend-tests/_shared/demo-page.css#L1-L50)
- [backend-tests/koa/public/index.html:1-50](file://backend-tests/koa/public/index.html#L1-L50)
- [backend-tests/hono/public/index.html:1-50](file://backend-tests/hono/public/index.html#L1-L50)
- [backend-tests/nestjs/public/index.html:1-50](file://backend-tests/nestjs/public/index.html#L1-L50)
- [backend-tests/koa/public/style.css:1-30](file://backend-tests/koa/public/style.css#L1-L30)
- [backend-tests/hono/public/style.css:1-30](file://backend-tests/hono/public/style.css#L1-L30)
- [backend-tests/nestjs/public/style.css:1-30](file://backend-tests/nestjs/public/style.css#L1-L30)

## 交互式测试功能

### 测试界面设计
- **统一UI框架**：所有框架使用相同的演示页面模板
- **实时测试**：用户可以直接在浏览器中发起API请求
- **结果展示**：清晰显示请求结果和状态信息
- **错误处理**：友好的错误提示和调试信息

### 测试覆盖范围
- **健康检查**：验证服务可用性和基本功能
- **参数路由**：测试动态路由参数处理
- **POST请求**：验证请求体解析和响应生成
- **错误处理**：测试404和其他错误场景

### 模板系统
- **共享模板**：_shared目录提供可复用的HTML模板
- **样式统一**：demo-page.css确保视觉一致性
- **可扩展性**：支持未来添加更多测试功能

**章节来源**
- [backend-tests/koa/template.json:1-20](file://backend-tests/koa/template.json#L1-L20)
- [backend-tests/hono/template.json:1-20](file://backend-tests/hono/template.json#L1-L20)
- [backend-tests/nestjs/template.json:1-20](file://backend-tests/nestjs/template.json#L1-L20)

## 依赖关系分析
- 依赖管理
  - Koa夹具：依赖Koa、@koa/router、koa-bodyparser、**新增**：koa-static用于静态文件服务
  - Hono夹具：依赖hono、**新增**：hono/devtools用于开发工具
  - NestJS夹具：依赖@nestjs/common、@nestjs/core、@nestjs/platform-express、reflect-metadata、rxjs，并包含TypeScript与构建脚本
- 运行与断言
  - 三类夹具均通过meta.json定义断言规则，包括路径、方法、期望状态码、响应体子集等
  - NestJS夹具额外包含warmup超时配置
  - **新增**：template.json定义演示页面和静态文件服务配置

```mermaid
graph TB
KoaPkg["Koa包依赖"] --> KoaApp["Koa应用"]
KoaStatic["koa-static"] --> KoaApp
HonoPkg["Hono包依赖"] --> HonoApp
HonoDev["hono/devtools"] --> HonoApp
NestPkg["NestJS包依赖"] --> NestApp
StaticFiles["静态文件服务"] --> KoaApp
StaticFiles --> HonoApp
StaticFiles --> NestApp
DemoPages["演示页面"] --> KoaApp
DemoPages --> HonoApp
DemoPages --> NestApp
KoaApp --> KoaMeta["Koa断言(meta.json)"]
HonoApp --> HonoMeta["Hono断言(meta.json)"]
NestApp --> NestMeta["NestJS断言(meta.json)"]
```

**图表来源**
- [backend-tests/koa/package.json:1-11](file://backend-tests/koa/package.json#L1-L11)
- [backend-tests/hono/package.json:1-9](file://backend-tests/hono/package.json#L1-L9)
- [backend-tests/nestjs/package.json:1-21](file://backend-tests/nestjs/package.json#L1-L21)
- [backend-tests/koa/meta.json:1-14](file://backend-tests/koa/meta.json#L1-L14)
- [backend-tests/hono/meta.json:1-14](file://backend-tests/hono/meta.json#L1-L14)
- [backend-tests/nestjs/meta.json:1-15](file://backend-tests/nestjs/meta.json#L1-L15)

**章节来源**
- [backend-tests/README.md:38-84](file://backend-tests/README.md#L38-L84)

## 性能考量
- 启动时间与预热
  - NestJS夹具包含较长的warmup超时配置，适用于需要初始化容器与模块的企业级应用
  - **新增**：静态文件服务可能增加启动时间和内存占用
- 路由与中间件
  - Koa通过中间件链路处理请求，合理安排中间件顺序可减少不必要的解析开销
  - Hono以fetch风格直接返回响应，适合边缘计算与Web适配器场景
  - **新增**：静态文件服务中间件需要考虑缓存策略以提升性能
- 构建与打包
  - NestJS需要编译TS到JS，建议在CI中缓存依赖与编译产物以提升速度
  - **新增**：演示页面和静态资源需要优化打包和缓存策略

## 故障排查指南
- 断言失败
  - 状态码不符：检查路由是否正确映射与控制器/中间件是否生效
  - 响应体不匹配：确认响应体构造逻辑与meta.json中的bodyJsonSubset定义
- 启动失败
  - 端口占用：调整监听端口或释放占用端口
  - 依赖缺失：确保安装所有必需依赖
  - **新增**：静态文件服务失败：检查public目录权限和文件完整性
- 特定框架问题
  - Koa：确认中间件顺序与路由注册位置，**新增**：检查静态文件中间件配置
  - Hono：确认导出的app实例被适配器正确调用，**新增**：验证演示页面资源加载
  - NestJS：确认dist/main.js可执行且模块初始化无异常，**新增**：检查静态文件服务集成

**章节来源**
- [backend-tests/README.md:86-93](file://backend-tests/README.md#L86-L93)
- [backend-tests/README.md:112-116](file://backend-tests/README.md#L112-L116)

## 结论
- Koa：轻量、灵活，适合快速搭建REST API与中间件生态丰富场景，**新增**：完善的静态文件服务和演示页面支持
- Hono：极简、原生fetch风格，适合边缘与云函数环境，**新增**：简洁的演示页面和交互式测试功能
- NestJS：企业级架构，模块化与装饰器带来强约束与高可维护性，但需要编译与初始化成本，**新增**：完整的静态文件服务集成和演示页面系统
- 三者均已在本仓库夹具中通过断言验证，**新增**：演示页面和静态文件服务增强了用户体验和测试效率

## 附录
- 框架检测机制
  - 顶层case.json展示了对多种后端框架的检测与打包行为，包括Express、Hono、Koa、NestJS等
  - 检测关注点：入口文件选择、是否包含框架依赖、是否包含特定目录结构（如/api）
  - **新增**：检测逻辑已更新以识别演示页面和静态文件服务的存在
- 运行与接入
  - 通过blackBox入口脚本运行夹具测试，支持单夹具运行与批量运行
  - 退出码约定：0表示全部断言通过，1表示至少一个断言失败或启动失败
  - **新增**：演示页面可通过浏览器直接访问，提供交互式测试体验

**章节来源**
- [case.json:298-353](file://case.json#L298-L353)
- [case.json:317-334](file://case.json#L317-L334)
- [case.json:336-353](file://case.json#L336-L353)
- [case.json:468-484](file://case.json#L468-L484)
- [backend-tests/README.md:94-110](file://backend-tests/README.md#L94-L110)