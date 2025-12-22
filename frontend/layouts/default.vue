<!-- layouts/dashboard.vue -->
<template>
  <v-app>
    <!-- Drawer -->
    <v-navigation-drawer
      v-model="drawer"
      :temporary="smAndDown"
      :rail="!smAndDown"
      :expand-on-hover="!smAndDown"
      scrim="false"
      app
    >
    
      <v-list density="compact" nav>
        <v-list-item class="pt-1" :title="auth.user?.name || 'ไม่ระบุชื่อ'" :subtitle="auth.user?.email || '-'" prepend-icon="mdi-account"/>
        <template v-for="sec in menu" :key="sec.label">
          <v-divider class="my-2" />
          <template v-for="it in sec.items" :key="it.to || it.href">
            <NuxtLink
              v-if="it.to"
              :to="it.to"
              class="no-underline"
              color="surface"
              exact-active-class="rounded-lg"
            >
              <v-list-item :title="it.label">
                <template #prepend>
                  <v-icon :icon="it.icon || 'mdi-circle-small'" />
                </template>
              </v-list-item>
            </NuxtLink>
          </template>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-toolbar-title class="font-semibold">ระบบประเมินบุคลากร</v-toolbar-title>
      <v-spacer />
      <v-btn icon @click="toggleTheme" :aria-label="`Switch to ${themeName === 'dark' ? 'light':'dark'} theme`">
        <v-icon>mdi-theme-light-dark</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <div>
        <slot />
      </div>
    </v-main>
    <v-footer app class="text-caption justify-center">
      © {{ year }} Patin Muangjan
    </v-footer>
  </v-app>
</template>

<script setup>
definePageMeta({ ssr: false })
import { ref, computed, watch, onMounted } from 'vue'
import { useDisplay, useTheme } from 'vuetify'
import { useAuthStore } from '~/stores/auth'
import { useMenu } from '~/composables/useMenu'

const route = useRoute()
const { smAndDown } = useDisplay()
const theme = useTheme()

// Drawer responsive
const drawer = ref(false)
const group = ref(null)
drawer.value = false

// Auth + role
const auth = useAuthStore()
const role = computed(() => auth?.user?.role ?? 'user')

// ✅ ดึงชื่อย่อ (initials) สำหรับ fallback avatar
const initials = computed(() => {
  if (!auth?.user?.name) return '?'
  const parts = auth.user.name.trim().split(' ')
  if (parts.length === 1) return parts[0][0]?.toUpperCase() || '?'
  return (parts[0][0] + parts[1][0]).toUpperCase()
})


// เมนูตาม role (ส่ง ref/computed เข้าไป)
const { menu } = useMenu(role)

// Theme sync
const themeName = useState('theme', () => 'light')
function applyTheme (name) {
  theme.global.name.value = name
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-theme', name)
    try { localStorage.setItem('theme', name) } catch {}
  }
}
onMounted(() => {
  drawer.value = true
  let saved = null
  try { saved = localStorage.getItem('theme') } catch {}
  themeName.value = saved || themeName.value
  applyTheme(themeName.value)
})
function toggleTheme () {
  themeName.value = themeName.value === 'dark' ? 'light' : 'dark'
  applyTheme(themeName.value)
}

// Footer year
const year = new Date().getFullYear()

// Logout
function logout () {
  try { auth.logout() } catch {}
  navigateTo('/login')
}
</script>

<style scoped>
.no-underline { text-decoration: none; color: inherit; }
.v-avatar span {
  font-size: 0.9rem;
  text-transform: uppercase;
}

</style>
<!-- layouts/dashboard.vue -->