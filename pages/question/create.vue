<template>
	<div class="create-question-container">
		<div class="back-button mb-4">
			<a-button @click="router.back()">返回</a-button>
		</div>

		<h1 class="text-xl font-bold mb-6">发布匿名问题</h1>

		<div class="question-form">
			<a-form
				:model="formState"
				@finish="onFinish"
				layout="vertical"
			>
				<a-form-item
					label="问题标题"
					name="title"
					:rules="[{ required: true, message: '请输入问题标题' }]"
				>
					<a-input
						v-model:value="formState.title"
						placeholder="请输入问题标题"
					/>
				</a-form-item>

				<a-form-item
					label="问题内容"
					name="content"
					:rules="[{ required: true, message: '请输入问题内容' }]"
				>
					<a-textarea
						v-model:value="formState.content"
						placeholder="请详细描述你的问题"
						:rows="6"
					/>
				</a-form-item>

				<a-form-item>
					<a-button
						type="primary"
						html-type="submit"
						:loading="submitting"
					>
						发布问题
					</a-button>
				</a-form-item>
			</a-form>
		</div>
	</div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { message } from 'ant-design-vue';

const router = useRouter();
const formState = reactive({
	title: '',
	content: '',
});

const submitting = ref(false);

const onFinish = async () => {
	submitting.value = true;
	try {
		const data = await $fetch('/api/question/create', {
			method: 'POST',
			body: {
				question: {
					title: formState.title,
					content: formState.content,
				},
			},
		});

		if (!data || data.status !== 'success') {
			throw new Error('发布问题失败');
		}

		message.success('问题已发布');
		router.push(`/question/${data.value.id}`);
	} catch (error) {
		console.error('发布问题失败', error);
		message.error('发布失败，请重试');
	} finally {
		submitting.value = false;
	}
};
</script>

<style lang="scss" scoped>
.create-question-container {
	max-width: 800px;
	margin: 0 auto;
	padding: 20px;
}
</style>
