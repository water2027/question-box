<template>
	<div class="answer-form">
		<a-form
			:model="formState"
			@finish="onFinish"
		>
			<a-form-item
				name="content"
				:rules="[{ required: true, message: '请输入回答内容' }]"
			>
				<a-textarea
					v-model:value="formState.content"
					placeholder="请输入你的回答"
					:rows="6"
				/>
			</a-form-item>

			<a-form-item>
				<a-button
					type="primary"
					html-type="submit"
					:loading="submitting"
				>
					提交回答
				</a-button>
			</a-form-item>
		</a-form>
	</div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { message } from 'ant-design-vue';

const router = useRouter();

const emit = defineEmits(['submit-success']);

const props = defineProps({
	questionId: {
		type: [String, Number],
		required: true,
	},
});

const formState = reactive({
	content: '',
});

const submitting = ref(false);

const onFinish = async () => {
	submitting.value = true;
	try {
		const token = localStorage.getItem('token');
		if (!token) {
			navigateTo('/login')
			throw new Error('用户未登录');
		}
		const res = await $fetch('/api/answer/create', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`,
			},
			body: {
				answer: {
					questionId: props.questionId,
					content: formState.content,
				},
			},
		});

		if (res.status !== 'success') {
			throw new Error('提交回答失败');
		}

		message.success('回答已提交');
		formState.content = '';
		emit('submit-success');
	} catch (error) {
		console.error('提交回答失败', error);
		message.error(`提交失败，${error}`);
		localStorage.removeItem('token');
	} finally {
		submitting.value = false;
	}
};
</script>
