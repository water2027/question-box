<template>
	<a-layout class="layout">
		<a-layout-header class="header">
			<div class="container mx-auto flex justify-between items-center">
				<div class="logo">
					<router-link
						to="/"
						class="text-white text-xl font-bold"
					>
						匿名提问箱
					</router-link>
				</div>

				<div class="auth-actions">
					<template v-if="isLoggedIn">
						<a-dropdown>
							<a
								class="ant-dropdown-link text-white"
								@click.prevent
							>
								{{ username }} <down-outlined />
							</a>
							<template #overlay>
								<a-menu>
									<a-menu-item
										key="0"
										@click="logout"
									>
										退出登录
									</a-menu-item>
								</a-menu>
							</template>
						</a-dropdown>
					</template>
					<template v-else>
						<a-button
							type="link"
							class="text-white"
							@click="router.push('/login')"
						>
							登录
						</a-button>
					</template>
				</div>
			</div>
		</a-layout-header>

		<a-layout-content>
			<div class="container mx-auto">
				<NuxtPage />
			</div>
		</a-layout-content>

		<a-layout-footer class="text-center">
			匿名提问箱 ©2025
		</a-layout-footer>
	</a-layout>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { DownOutlined } from '@ant-design/icons-vue';

import '~/assets/main.css'

const router = useRouter();

// 假设你有一个用户认证的store或API
const isLoggedIn = ref(false);
const username = ref('用户');

const logout = () => {
	// 实现登出逻辑
	router.push('/');
};
</script>

<style lang="scss" scoped>
.layout {
	min-height: 100vh;
}

.header {
	background: #5681aa;
	padding: 0 20px;
}

.content {
	padding: 24px;
	min-height: 280px;
}
</style>
