<template>
  <div class="dog-image-fetcher">
    <div class="controls">
      <button @click="fetchRandomDog" :disabled="fetchingDog" class="fetch-dog-btn">
        {{ fetchingDog ? 'Fetching...' : 'Get Random Dog Image' }}
      </button>
      
      <button 
        v-if="dogImageUrl" 
        @click="uploadDogToServer" 
        :disabled="uploadingDog"
        class="upload-dog-btn"
      >
        {{ uploadingDog ? 'Uploading...' : 'Upload Dog to Server' }}
      </button>
    </div>

    <div v-if="dogError" class="error-message">
      {{ dogError }}
    </div>

    <div v-if="uploadResult" class="upload-result">
      <p :class="uploadResult.success ? 'success' : 'error'">
        {{ uploadResult.message }}
      </p>
    </div>

    <div v-if="dogImageUrl" class="dog-image-container">
      <h3>Random Dog Image:</h3>
      <div class="dog-image-wrapper">
        <img :src="dogImageUrl" alt="Random dog" class="dog-image" />
        <div class="dog-image-info">
          <p>Fetched from: dog.ceo API</p>
          <p class="image-url">{{ dogImageUrl }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  serverUrl: string
}

const props = defineProps<Props>()

const dogImageUrl = ref<string | null>(null)
const fetchingDog = ref(false)
const uploadingDog = ref(false)
const dogError = ref<string | null>(null)
const uploadResult = ref<{success: boolean, message: string} | null>(null)

const fetchRandomDog = async () => {
  fetchingDog.value = true
  dogError.value = null
  uploadResult.value = null

  try {
    const response = await fetch('https://dog.ceo/api/breeds/image/random')
    const data = await response.json()

    if (data.status === 'success') {
      dogImageUrl.value = data.message
    } else {
      dogError.value = 'Failed to fetch dog image'
    }
  } catch (error) {
    dogError.value = 'Network error occurred while fetching dog image'
  } finally {
    fetchingDog.value = false
  }
}

const uploadDogToServer = async () => {
  if (!dogImageUrl.value) return

  uploadingDog.value = true
  uploadResult.value = null

  try {
    const response = await fetch(`${props.serverUrl}/upload-dog`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: dogImageUrl.value
      })
    })

    const result = await response.json()

    if (response.ok) {
      uploadResult.value = {
        success: true,
        message: result.message || 'Dog image uploaded successfully!'
      }
    } else {
      uploadResult.value = {
        success: false,
        message: result.message || 'Failed to upload dog image'
      }
    }
  } catch (error) {
    uploadResult.value = {
      success: false,
      message: 'Network error occurred while uploading'
    }
  } finally {
    uploadingDog.value = false
  }
}
</script>

<style scoped>
.dog-image-fetcher {
  max-width: 600px;
}

.controls {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.fetch-dog-btn, .upload-dog-btn {
  padding: 12px 24px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.fetch-dog-btn {
  background-color: #ff6b6b;
  color: white;
}

.fetch-dog-btn:hover:not(:disabled) {
  background-color: #ff5252;
}

.upload-dog-btn {
  background-color: #4ecdc4;
  color: white;
}

.upload-dog-btn:hover:not(:disabled) {
  background-color: #45b7aa;
}

.fetch-dog-btn:disabled, .upload-dog-btn:disabled {
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

.upload-result {
  margin-bottom: 20px;
}

.success {
  color: #155724;
  background-color: #d4edda;
  border: 1px solid #c3e6cb;
  padding: 15px;
  border-radius: 5px;
}

.error {
  color: #721c24;
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  padding: 15px;
  border-radius: 5px;
}

.dog-image-container h3 {
  margin: 0 0 15px 0;
  color: #333;
}

.dog-image-wrapper {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.dog-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
  display: block;
}

.dog-image-info {
  padding: 20px;
  background-color: #f8f9fa;
}

.dog-image-info p {
  margin: 5px 0;
  color: #333;
}

.image-url {
  font-size: 12px;
  color: #6c757d;
  word-break: break-all;
  font-family: monospace;
}
</style>
