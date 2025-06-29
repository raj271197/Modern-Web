<template>
  <div class="random-images">
    <div class="controls">
      <button @click="fetchRandomImages" :disabled="loading" class="fetch-btn">
        {{ loading ? 'Loading...' : 'Get Random Images' }}
      </button>
    </div>

    <div v-if="error" class="error-message">
      {{ error }}
    </div>

    <div v-if="images.length" class="images-grid">
      <div v-for="(image, index) in images" :key="index" class="image-item">
        <img :src="image" :alt="`Random image ${index + 1}`" class="random-image" />
        <div class="image-info">
          <p>Image {{ index + 1 }}</p>
        </div>
      </div>
    </div>

    <div v-else-if="!loading && !error" class="no-images">
      <p>No images available. Upload some images first!</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  serverUrl: string
}

const props = defineProps<Props>()

const images = ref<string[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

const fetchRandomImages = async () => {
  loading.value = true
  error.value = null

  try {
    const response = await fetch(`${props.serverUrl}/random-images`)
    
    if (response.ok) {
      const data = await response.json()
      images.value = data
      
      if (data.length === 0) {
        error.value = 'No images found on server. Upload some images first!'
      }
    } else {
      error.value = 'Failed to fetch random images'
    }
  } catch (err) {
    error.value = 'Network error occurred while fetching images'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.random-images {
  max-width: 800px;
}

.controls {
  margin-bottom: 20px;
}

.fetch-btn {
  padding: 12px 24px;
  background-color: #667eea;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.fetch-btn:hover:not(:disabled) {
  background-color: #5a6fd8;
}

.fetch-btn:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}

.error-message {
  color: #721c24;
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 20px;
}

.images-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.image-item {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.image-item:hover {
  transform: translateY(-5px);
}

.random-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  display: block;
}

.image-info {
  padding: 15px;
  text-align: center;
}

.image-info p {
  margin: 0;
  font-weight: bold;
  color: #333;
}

.no-images {
  text-align: center;
  padding: 40px;
  color: #6c757d;
  font-style: italic;
}

.no-images p {
  margin: 0;
  font-size: 18px;
}
</style>
