// Nuxt 配置：用默认 nitro node-server preset，产 .output/server/index.mjs
// 关闭一些 dev-only 特性减小 fixture 大小
export default defineNuxtConfig({
  ssr: true,
  devtools: { enabled: false },
  nitro: {
    preset: 'node-server',
  },
});
