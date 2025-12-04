<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import BlogDetail from '@/components/BlogDetail.vue'
import { getArticuloById } from '@/data/blogArticles'

const route = useRoute()
const router = useRouter()
const article = ref(null)

function loadArticle() {
  const articleId = route.params.id
  console.log('Loading article with ID:', articleId)
  article.value = getArticuloById(articleId)
  console.log('Article found:', article.value)
  
  if (!article.value) {
    console.log('Article not found, redirecting to blog')
    router.push({ name: 'blogview' })
  }
}

onMounted(() => {
  loadArticle()
})

watch(() => route.params.id, () => {
  loadArticle()
})
</script>

<template>
  <v-container>
    <div v-if="article">
      <BlogDetail :article="article" />
    </div>
    <div v-else class="d-flex justify-center align-center" style="min-height: 400px;">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
  </v-container>
</template>
