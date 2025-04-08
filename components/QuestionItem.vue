<template>
    <a-list-item class="question-item hover:bg-gray-50 cursor-pointer">
      <a-list-item-meta :title="question.title">
        <template #description>
          <div class="description">
            <!-- <div class="content-preview text-gray-600">{{ contentPreview }}</div> -->
            <div class="meta-info text-gray-400 text-sm mt-2">
              <span>{{ formatDate(question.createdAt) }}</span>
              <span class="ml-4">{{ question.answerCount || 0 }} 个回答</span>
            </div>
          </div>
        </template>
      </a-list-item-meta>
    </a-list-item>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  
  const props = defineProps({
    question: {
      type: Object,
      required: true
    }
  })
  
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString()
  }
  </script>