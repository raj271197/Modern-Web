<template>
  <div class="image-upload">
    <div class="upload-form">
      <input
        type="file"
        ref="fileInput"
        @change="handleFileSelect"
        multiple
        accept="image/*"
        class="file-input"
      />
      <button @click="selectFiles" class="select-btn">
        Select Images
      </button>
      <button 
        @click="uploadImages" 
        :disabled="!selectedFiles.length || uploading"
        class="upload-btn"
      >
        {{ uploading ? 'Uploading...' : 'Upload Images' }}
      </button>
    </div>

    <div v-if="selectedFiles.length" class="selected-files">
      <h3>Selected Files ({{ selectedFiles.length }}):</h3>
      <div class="file-list">
        <div v-for="(file, index) in selectedFiles" :key="index" class="file-item">
          <img :src="getFilePreview(file)" alt="Preview" class="file-preview" />
          <span class="file-name">{{ file.name }}</span>
          <button @click="removeFile(index)" class="remove-btn">×</button>
        </div>
      </div>
    </div>

    <div v-if="uploadResult" class="upload-result">
      <h3>Upload Result:</h3>
      <p :class="uploadResult.success ? 'success' : 'error'">
        {{ uploadResult.message }}
      </p>
      <div v-if="uploadResult.files" class="uploaded-files">
        <p>Uploaded {{ uploadResult.files.length }} files successfully!</p>
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

const fileInput = ref<HTMLInputElement>()
const selectedFiles = ref<File[]>([])
const uploading = ref(false)
const uploadResult = ref<{success: boolean, message: string, files?: any[]} | null>(null)

const selectFiles = () => {
  fileInput.value?.click()
}

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files) {
    selectedFiles.value = Array.from(target.files)
    uploadResult.value = null
  }
}

const removeFile = (index: number) => {
  selectedFiles.value.splice(index, 1)
}

const getFilePreview = (file: File): string => {
  return URL.createObjectURL(file)
}

const uploadImages = async () => {
  if (!selectedFiles.value.length) return

  uploading.value = true
  uploadResult.value = null

  try {
    const formData = new FormData()
    selectedFiles.value.forEach(file => {
      formData.append('images', file)
    })

    const response = await fetch(`${props.serverUrl}/upload`, {
      method: 'POST',
      body: formData
    })

    const result = await response.json()

    if (response.ok) {
      uploadResult.value = {
        success: true,
        message: result.message,
        files: result.files
      }
      selectedFiles.value = []
      if (fileInput.value) {
        fileInput.value.value = ''
      }
    } else {
      uploadResult.value = {
        success: false,
        message: result.message || 'Upload failed'
      }
    }
  } catch (error) {
    uploadResult.value = {
      success: false,
      message: 'Network error occurred'
    }
  } finally {
    uploading.value = false
  }
}
</script>

<style scoped>
.image-upload {
  max-width: 600px;
}

.upload-form {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  align-items: center;
}

.file-input {
  display: none;
}

.select-btn, .upload-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

.select-btn {
  background-color: #667eea;
  color: white;
}

.select-btn:hover {
  background-color: #5a6fd8;
}

.upload-btn {
  background-color: #28a745;
  color: white;
}

.upload-btn:hover:not(:disabled) {
  background-color: #218838;
}

.upload-btn:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}

.selected-files h3 {
  margin: 0 0 15px 0;
  color: #333;
}

.file-list {
  display: grid;
  gap: 10px;
}

.file-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  background-color: #f8f9fa;
  border-radius: 5px;
  border: 1px solid #dee2e6;
}

.file-preview {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 3px;
}

.file-name {
  flex: 1;
  font-size: 14px;
}

.remove-btn {
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.remove-btn:hover {
  background-color: #c82333;
}

.upload-result {
  margin-top: 20px;
  padding: 15px;
  border-radius: 5px;
}

.upload-result h3 {
  margin: 0 0 10px 0;
}

.success {
  color: #155724;
  background-color: #d4edda;
  border: 1px solid #c3e6cb;
  padding: 10px;
  border-radius: 5px;
}

.error {
  color: #721c24;
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  padding: 10px;
  border-radius: 5px;
}

.uploaded-files {
  margin-top: 10px;
  font-weight: bold;
}
</style>
