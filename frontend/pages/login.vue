<!-- ~/pages/login.vue -->
<template>
  <div>
    <v-card width="320">
      <v-card-text>
        <form class="flex flex-col" @submit.prevent="onSubmit">
          <v-text-field
                v-model="email"
                label="Email"
                type="email"
                density="compact"
                prepend-inner-icon="mdi-email-outline"
                required
                temporary
              />
              <v-text-field
                v-model="password"
                label="Password"
                :type="showPw ? 'text' : 'password'"
                :append-inner-icon="show ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append-inner="showPw = !showPw"
                density="compact"
                prepend-inner-icon="mdi-lock-outline"
                required
              />
          <v-alert v-if="errorMsg" type="error" density="comfortable" variant="tonal">
            {{ errorMsg }}
          </v-alert>
          <v-card-actions>
            <v-btn :loading="loading" color="primary" width="100%" type="submit">Sign in</v-btn>
          </v-card-actions>
        </form>
      </v-card-text>
    </v-card>
  </div>
</template>
<script setup>
definePageMeta({ layout: 'login', ssr: false })
import { ref } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { useCommonStore } from '~/stores/common.js'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'

const { $api } = useNuxtApp()
const router = useRouter()
const auth = useAuthStore()
const common = useCommonStore()

const errorMsg = ref('')
const showPw = ref(false)
const rememberMe = ref(false)
const loading = ref(false)

const schema = yup.object({
  email: yup.string().email('อีเมลไม่ถูกต้อง').required('กรอกอีเมล'),
  password: yup.string().min(6, 'รหัสผ่านอย่างน้อย 6 ตัว').required('กรอกรหัสผ่าน')
})

const { handleSubmit } = useForm({ validationSchema: schema })
const { value: email, errorMessage: emailErr } = useField('email')
const { value: password, errorMessage: passwordErr } = useField('password')

const onSubmit = handleSubmit(async (values) => {
  errorMsg.value = ''
  loading.value = true
  try {
    const { data } = await $api.post('/api/auth/login', { ...values, remember: rememberMe.value })
    if (data?.accessToken) {
      auth.setAuth(data.accessToken, data.user)   // ← เก็บลง localStorage เรียบร้อย
      common.approvedRedirect()
    } else {
      errorMsg.value = 'Invalid response'
    }
  } catch (e) {
    errorMsg.value = e.response?.data?.message || e.message || 'Login error'
    console.error('LOGIN ERROR:', e)
  } finally {
    loading.value = false
  }
})
</script>