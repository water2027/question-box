<template>
	<div class="login-container flex items-center justify-center min-h-screen">
		<a-card
			class="login-card"
			style="width: 400px"
		>
			<h1 class="text-xl font-bold text-center mb-6">登录</h1>

			<a-form
				:model="formState"
				@finish="onFinish"
				layout="vertical"
			>
				<a-form-item
					label="密码"
					name="password"
					:rules="[{ required: true, message: '请输入密码' }]"
				>
					<a-input-password v-model:value="formState.password" />
				</a-form-item>

				<a-form-item>
					<a-button
						type="primary"
						html-type="submit"
						:loading="submitting"
						block
					>
						登录
					</a-button>
				</a-form-item>
			</a-form>

			<div class="text-center mt-4">
				<a-button
					type="link"
					@click="navigateTo('/')"
				>
					返回首页
				</a-button>
			</div>
		</a-card>
	</div>
</template>

<script setup>
import { ref, reactive } from 'vue';

const router = useRouter();
const formState = reactive({
	password: '',
});

const submitting = ref(false);

// 假设你有一个用户认证的store或API
const onFinish = async () => {
	submitting.value = true;
	localStorage.setItem('token', formState.password); // 模拟登录成功
	console.log(formState.password);
	navigateTo('/'); // 登录成功后跳转到首页
};
</script>

<style lang="scss" scoped>
.login-container {
	background-color: #f5f5f5;
}

.login-card {
	border-radius: 8px;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}
</style>
