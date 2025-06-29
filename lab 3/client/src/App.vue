<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ImageUpload from './components/ImageUpload.vue'
import RandomImages from './components/RandomImages.vue'
import DogImageFetcher from './components/DogImageFetcher.vue'

const serverUrl = 'http://localhost:5000'
</script>

<template>
  <div class="app">
    <header class="app-header">
      <h1>Lab 3 - Modern Web Technologies</h1>
      <p>Image Upload and Management System</p>
    </header>

    <main class="app-main">
      <section class="upload-section">
        <h2>Upload Multiple Images</h2>
        <ImageUpload :server-url="serverUrl" />
      </section>

      <section class="display-section">
        <h2>Random Images from Server</h2>
        <RandomImages :server-url="serverUrl" />
      </section>

      <section class="dog-section">
        <h2>Random Dog Image</h2>
        <DogImageFetcher :server-url="serverUrl" />
      </section>
    </main>
  </div>
</template>

<style scoped>
.app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.app-header {
  text-align: center;
  margin-bottom: 40px;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 10px;
}

.app-header h1 {
  margin: 0 0 10px 0;
  font-size: 2.5em;
}

.app-header p {
  margin: 0;
  font-size: 1.2em;
  opacity: 0.9;
}

.app-main {
  display: grid;
  gap: 30px;
}

section {
  background: white;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid #e1e5e9;
}

section h2 {
  margin: 0 0 20px 0;
  color: #333;
  font-size: 1.5em;
  border-bottom: 2px solid #667eea;
  padding-bottom: 10px;
}
</style>
