<template>
	<div class="question-list-container">
		<div class="header flex justify-between items-center mb-6">
			<h1 class="text-2xl font-bold">匿名提问箱</h1>
			<a-button
				type="primary"
				@click="navigateTo('/question/create')"
			>
				提问
			</a-button>
		</div>

		<div class="question-list">
			<a-list
				:loading="loading"
				item-layout="horizontal"
				:data-source="questions"
			>
				<template #renderItem="{ item }">
					<QuestionItem
						:question="item"
						@click="goToDetail(item.id)"
					/>
				</template>
			</a-list>

			<div class="load-more-container text-center mt-4">
				<a-button
					:disabled="noMoreData"
					:loading="loading"
					@click="loadMoreQuestions"
				>
					{{ noMoreData ? '没有更多问题' : '加载更多' }}
				</a-button>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue';

const router = useRouter();
const loading = ref(false);
const noMoreData = ref(false);
const LIMIT = 10;

const loadQuestions = async () => {
	loading.value = true;
	try {
		const data = await $fetch('/api/question', {
			method: 'POST',
			body: {
				cursor: cursor.value,
				limit: LIMIT,
			},
		});

		if (!data) {
			return;
		}

		if (data?.length < LIMIT) {
			noMoreData.value = true;
		}

		if (data?.length > 0) {
			questions.value = [...questions.value, ...data];
			cursor.value = questions.value[questions.value.length - 1].id - 1;
		}
	} catch (error) {
		console.error('加载问题失败', error);
	} finally {
		loading.value = false;
	}
	return;
};

const loadMoreQuestions = () => {
	loadQuestions();
};

const goToDetail = async (id) => {
	await navigateTo(`/question/${id}`);
};

const { data: cursor } = await useFetch('/api/question/nums', {
	method: 'GET',
});

const { data: questions } = await useFetch('/api/question', {
	method: 'POST',
	body: {
		cursor: cursor.value,
		limit: LIMIT,
	},
});

if (questions.value?.length < LIMIT) {
	noMoreData.value = true;
}

if (questions.value?.length > 0) {
	cursor.value = questions.value[questions.value.length - 1].id - 1;
}
</script>

<style lang="scss" scoped>
.question-list-container {
	max-width: 800px;
	margin: 0 auto;
	padding: 20px;
}
</style>
