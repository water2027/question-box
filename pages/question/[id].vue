<template>
	<div class="question-detail-container">
		<div class="back-button mb-4">
			<a-button @click="router.back()">返回</a-button>
		</div>

		<a-card
			v-if="question"
			class="question-card mb-6"
		>
			<template #title>
				<h1 class="text-xl font-bold">{{ question.title }}</h1>
			</template>
			<div class="question-content">
				{{ question.content }}
			</div>
			<div class="meta-info text-gray-400 text-sm mt-4">
				{{ formatDate(question.createdAt) }}
			</div>
		</a-card>

		<div class="answers-section">
			<div class="answer-header flex justify-between items-center mb-4">
				<h2 class="text-lg font-medium">回答 ({{ answers.length }})</h2>
				<a-button
					type="primary"
					@click="showAnswerForm = true"
				>
					回答问题
				</a-button>
			</div>

			<a-drawer
				title="回答问题"
				:visible="showAnswerForm"
				@close="showAnswerForm = false"
				width="500px"
			>
				<AnswerForm
					:question-id="question?.id"
					@submit-success="handleAnswerSubmit"
				/>
			</a-drawer>

			<div class="answer-list">
				<a-list
					:loading="loadingAnswers"
					item-layout="horizontal"
					:data-source="answers||[]"
				>
					<template #renderItem="{ item }">
						<AnswerItem :answer="item">
							<template #actions>
								<a-button
									type="danger"
									size="small"
									@click="deleteAnswer(item.id)"
								>
									删除
								</a-button>
							</template>
						</AnswerItem>
					</template>
				</a-list>

				<div
					class="load-more-container text-center mt-4"
					v-if="answers.length > 0"
				>
					<a-button
						:disabled="noMoreAnswers"
						:loading="loadingAnswers"
						@click="loadMoreAnswers"
					>
						{{ noMoreAnswers ? '没有更多回答' : '加载更多' }}
					</a-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import { message } from 'ant-design-vue';

const router = useRouter();
const route = useRoute();
const questionId = route.params.id;

const loadingAnswers = ref(false);
const noMoreAnswers = ref(false);
const showAnswerForm = ref(false);
const LIMIT = 10;

const { data: question } = await useFetch(`/api/question?id=${questionId}`);
const { data: answerCursor } = await useFetch(
	`/api/answer/nums?id=${questionId}`
);
const { data: answers } = await useFetch('/api/answer', {
	method: 'POST',
	body: {
		id: questionId,
		cursor: answerCursor.value,
		limit: LIMIT,
	},
});

onMounted(() => {
	if (answers.value?.length < LIMIT) {
		noMoreAnswers.value = true;
	}
	if (answers.value?.length > 0) {
		answerCursor.value = answers.value[answers.value.length - 1].id - 1;
	}
});

const loadAnswerCursor = async () => {
	loadingAnswers.value = true;
	try {
		const data = await $fetch(`/api/answer/nums?id=${questionId}`);
		answerCursor.value = data;
	} catch (error) {
		console.error('加载回答数量失败', error);
	} finally {
		loadingAnswers.value = false;
	}
};

const loadAnswers = async () => {
	loadingAnswers.value = true;
	try {
		const data = await $fetch('/api/answer', {
			method: 'POST',
			body: {
				id: parseInt(questionId, 10),
				cursor: answerCursor.value,
				limit: LIMIT,
			},
		});

		console.log(data);

		if (data?.length < LIMIT) {
			noMoreAnswers.value = true;
		}

		if (data?.length > 0) {
			answers.value = [...answers.value, ...data];
			answerCursor.value = answers.value[data.length - 1].id - 1;
		}
	} catch (error) {
		console.error('加载回答失败', error);
	} finally {
		loadingAnswers.value = false;
	}
};

const deleteAnswer = async (id) => {
	try {
		const token = localStorage.getItem('token');
		if (!token) {
			navigateTo('/login');
			throw new Error('用户未登录');
		}
		await $fetch('/api/answer', {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${token}`,
			},
			body: {
				id,
			},
		});
		const index = answers.value.findIndex((answer) => answer.id === id);
		if (index !== -1) {
			answers.value.splice(index, 1);
		}
	} catch (error) {
		message.error(`删除回答失败, ${error}`);
	}
};

const loadMoreAnswers = () => {
	loadAnswers();
};

const handleAnswerSubmit = async () => {
	showAnswerForm.value = false;
	// 重新加载回答
	answers.value = [];
	answerCursor.value = 0;
	noMoreAnswers.value = false;
	await loadAnswerCursor();
	await loadAnswers();
};

const formatDate = (dateString) => {
	const date = new Date(dateString);
	return date.toLocaleDateString();
};
</script>

<style lang="scss" scoped>
.question-detail-container {
	max-width: 800px;
	margin: 0 auto;
	padding: 20px;
}

.question-card {
	border-radius: 8px;
}

.question-content {
	white-space: pre-wrap;
}
</style>
