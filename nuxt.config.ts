// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: ['nitro-cloudflare-dev', '@unocss/nuxt', '@ant-design-vue/nuxt'],
	compatibilityDate: '2024-11-01',
	devtools: { enabled: true },
});
