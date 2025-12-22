<template>
  <v-container class="py-6">
    <h2 class="text-h5 mb-4">สวัสดี {{ auth.user?.name || 'ผู้ใช้' }} 👋</h2>
    <v-row v-if="!loading" dense>
      <v-col cols="12" md="4">
        <v-card variant="tonal" color="indigo">
          <v-card-title>ไฟล์หลักฐาน</v-card-title>
          <v-card-text class="text-h5">{{ stats.uploads }}</v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card variant="tonal" color="green">
          <v-card-title>การประเมินทั้งหมด</v-card-title>
          <v-card-text class="text-h5">{{ stats.evaluations }}</v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card variant="tonal" color="deep-orange">
          <v-card-title>คะแนนเฉลี่ย</v-card-title>
          <v-card-text class="text-h5">{{ stats.score }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-skeleton-loader v-else type="card" class="my-6" />
  </v-container>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '~/stores/auth'

const auth = useAuthStore()
const stats = ref({ uploads: 0, evaluations: 0, score: 0 })
const loading = ref(true)

onMounted(async () => {
  setTimeout(() => {
    stats.value = { uploads: 'ข้อมูลไม่พร้อมใช้งาน', evaluations: 'ข้อมูลไม่พร้อมใช้งาน', score: 'ข้อมูลไม่พร้อมใช้งาน' }
    loading.value = false
  }, 800)
})
</script>