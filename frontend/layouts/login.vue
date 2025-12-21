<template>
  <v-app class="background">
    <v-main class="d-flex align-center justify-center">
      <div class="pr-16">
        <img width="148px" class="mx-auto d-block" src="@/assets/rms-icon.png">
        <p class="text-h5 text-center">วิทยาลัยเทคนิคสมุทรปราการ</p>
      </div>
      <div>
        <slot />
        <p class="text-right">v{{ version }}-{{ git }}</p>
      </div>
    </v-main>
  </v-app>
</template>
<style scoped>
  .background {
    background-image: url('@/assets/background.png');
    background-size: cover;
    background-position: center;
}
</style>
<script setup lang="ts">
const config = useRuntimeConfig()
const version = config.public.appVersion
const git = config.public.gitHash
</script>