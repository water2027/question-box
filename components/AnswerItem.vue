<template>
	<a-list-item class="answer-item">
		<a-list-item-meta>
			<template #title>
				<div class="user-info">
					<span class="user-name">{{
						answer.authorName || '匿名用户'
					}}</span>
				</div>
			</template>
			<template #description>
				<div class="answer-content mt-2">{{ answer.content }}</div>
				<div class="meta-info text-gray-400 text-sm mt-2">
					{{ formatDate(answer.createdAt) }}
				</div>
			</template>
		</a-list-item-meta>

		<template #actions>
			<slot name="actions"></slot>
		</template>
	</a-list-item>
</template>

<script setup>
const props = defineProps({
	answer: {
		type: Object,
		required: true,
	},
});

const formatDate = (dateString) => {
	const date = new Date(dateString);
	return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
};
</script>

<style lang="scss" scoped>
.answer-item {
	border-bottom: 1px solid #f0f0f0;
	padding: 16px 0;

	.answer-content {
		white-space: pre-wrap;
	}
}
</style>
