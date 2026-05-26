// 默认 nitro node-server preset，产 .output/server/index.mjs（meta-runtime adapter 消费）
export default defineNuxtConfig({
  ssr: true,
  devtools: { enabled: false },
  nitro: {
    preset: 'node-server'
  }
});
