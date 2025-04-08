<script setup lang="ts">
import '~/assets/main.css'
</script>
<template>
    <a-layout id="root" class="w-full h-full">
      <a-layout-sider>Sider</a-layout-sider>
      <a-layout>
        <a-layout-header>Header</a-layout-header>
        <NuxtPage />
        <a-layout-footer>Footer</a-layout-footer>
      </a-layout>
    </a-layout>
</template>

<style lang="scss">
#root {
    .ant-layout-sider {
        background: #7eb4e6;
    }
    .ant-layout-header {
        background: #41a3ff;
    }
    .ant-layout-content {
        background: #fff;
    }
    .ant-layout-footer {
        background: #f0f2f5;
    }
}
</style>