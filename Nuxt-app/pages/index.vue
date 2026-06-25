<template>
  <div>
    <!-- Hero -->
    <header class="hero">
      <div class="container">
        <img
          class="framework-logo"
          src="https://cdn.simpleicons.org/nuxt"
          alt="Nuxt"
          @error="$event.target.style.display = 'none'"
        />
        <span class="badge-framework">Nuxt</span>
        <h1>Nuxt 后端示例 · ISR 增量再生</h1>
        <p class="tagline">
          Nuxt 3 + Nitro + routeRules SWR，演示 ISR 增量静态再生与服务端 API 路由。
        </p>
        <div class="hero-actions">
          <a class="btn btn-primary" href="{{DEPLOY_URL}}" target="_blank" rel="noopener">一键部署</a>
          <a class="btn btn-outline" href="{{DEMO_URL}}" target="_blank" rel="noopener">在线 Demo</a>
        </div>
        <!-- ISR 时间戳 -->
        <div class="isr-info">
          <span class="isr-label">ISR 最后再生时间</span>
          <code class="isr-timestamp">{{ renderedAt }}</code>
          <p class="isr-hint">刷新页面观察时间变化（SWR 60s 后后台再生）</p>
        </div>
      </div>
    </header>

    <!-- Features -->
    <section>
      <div class="container">
        <h2>框架特色写法</h2>
        <p class="section-desc">SSR · ISR (SWR) · Nitro 服务端引擎 · 文件路由。</p>
        <div class="feature-grid">
          <div v-for="f in features" :key="f.title" class="feature-card">
            <div class="feat-icon">{{ f.icon }}</div>
            <h3>{{ f.title }}</h3>
            <p>{{ f.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Endpoints -->
    <section style="background: var(--color-bg-soft);">
      <div class="container">
        <h2>实时接口演示</h2>
        <p class="section-desc">点击「试一试」直接调用本示例的 API。</p>
        <div class="endpoint-list">
          <div v-for="ep in endpoints" :key="ep.path" class="endpoint-card">
            <div class="endpoint-head">
              <span class="method-tag" :class="ep.method.toLowerCase()">{{ ep.method }}</span>
              <span class="endpoint-path">{{ ep.path }}</span>
            </div>
            <p class="endpoint-desc">{{ ep.desc }}</p>
            <p v-if="ep.body" class="endpoint-desc" style="font-family: var(--font-mono);">
              请求体: {{ JSON.stringify(ep.body) }}
            </p>
            <div class="endpoint-actions">
              <button class="btn btn-primary btn-sm" :disabled="ep.loading" @click="callEndpoint(ep)">
                <span v-if="ep.loading" class="spinner"></span>
                <span v-else>试一试</span>
              </button>
            </div>
            <div v-if="ep.response !== null" class="response-box">
              <span class="resp-status" :class="ep.response.ok ? 'ok' : 'err'">
                {{ ep.response.status }}
              </span>
              <pre style="margin:0;white-space:pre-wrap;">{{ ep.response.body }}</pre>
            </div>
            <div v-else class="response-box">
              <span class="resp-placeholder">点击「试一试」查看响应…</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="container">
        <h2>平台能力</h2>
        <div class="tag-list">
          <span v-for="t in productTags" :key="t" class="tag">{{ t }}</span>
        </div>
        <p class="footer-meta">本示例由平台零配置打包部署 · 框架自动检测</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
// ISR: 服务端渲染时生成时间戳，SWR 缓存期间保持不变，再生后更新
const renderedAt = new Date().toISOString()

const features = [
  { icon: '⚡', title: 'SSR 渲染', desc: 'Nuxt 服务端渲染，首屏直出利于 SEO。' },
  { icon: '🔄', title: 'ISR (SWR)', desc: 'routeRules swr: 60，页面缓存 60 秒后后台再生。' },
  { icon: '🚀', title: 'Nitro 引擎', desc: 'Nitro node-server preset，产出自包含 .output/server。' },
  { icon: '📁', title: '文件路由', desc: 'pages/ 目录自动生成路由，server/api/ 自动暴露接口。' },
]

const endpoints = ref([
  { method: 'GET', path: '/api/health', desc: '健康检查 · ISR 示例服务状态', body: null, loading: false, response: null },
  { method: 'GET', path: '/api/users/42', desc: '获取用户信息', body: null, loading: false, response: null },
  { method: 'POST', path: '/api/echo', desc: '回显请求体', body: { msg: 'hello' }, loading: false, response: null },
])

const productTags = [
  '零配置自动识别 Nuxt',
  '框架自动检测',
  '一键部署到函数计算',
]

async function callEndpoint(ep) {
  ep.loading = true
  ep.response = null
  try {
    const opts = { method: ep.method }
    if (ep.body) {
      opts.headers = { 'content-type': 'application/json' }
      opts.body = JSON.stringify(ep.body)
    }
    const res = await $fetch.raw(ep.path, opts)
    let pretty = res._data
    try { pretty = JSON.stringify(res._data, null, 2) } catch (e) {}
    ep.response = { ok: true, status: res.status + ' ' + (res.statusText || 'OK'), body: pretty }
  } catch (err) {
    const status = err.statusCode || 500
    let body = err.message
    try { body = JSON.stringify(err.data, null, 2) } catch (e) {}
    ep.response = { ok: false, status: status + ' Error', body }
  } finally {
    ep.loading = false
  }
}
</script>

<style scoped>
.isr-info {
  margin-top: 24px;
  padding: 12px 16px;
  background: var(--color-primary-light);
  border: 1px solid var(--color-primary);
  border-radius: var(--radius-card);
  position: relative;
  z-index: 1;
}
.isr-label {
  font-size: 12px;
  font-weight: 600;
  color: var(--color-primary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.isr-timestamp {
  display: block;
  margin-top: 4px;
  font-family: var(--font-mono);
  font-size: 15px;
  color: var(--color-text);
}
.isr-hint {
  margin-top: 6px;
  font-size: 12px;
  color: var(--color-text-muted);
}
</style>
