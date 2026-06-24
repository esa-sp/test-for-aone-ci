// 默认 nitro node-server preset，产 .output/server/index.mjs（meta-runtime adapter 消费）
// routeRules.swr 启用 ISR（增量静态再生），60 秒后后台重新生成
export default defineNuxtConfig({
  ssr: true,
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  nitro: {
    preset: 'node-server'
  },
  routeRules: {
    '/': { swr: 60 }
  }
});
