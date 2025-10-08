<template>
  <div class="app-wrapper">
    <AppHeader />
    <main class="page-layout">
      <RouterView />
    </main>
  </div>
  <AppFooter />
</template>

<script setup lang="ts">
import { RouterView } from "vue-router"
import AppHeader from "./components/AppHeader.vue"
import AppFooter from "./components/AppFooter.vue"
</script>

<style scoped>
.app-wrapper {
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  /* ✅ prevents horizontal scroll */
}

.page-layout {
  flex: 1;
  width: 100%;
  overflow-x: hidden;
  /* ✅ extra safety */
}
</style>

<style>
/* global body fix in case other components add overflow */
body {
  margin: 0;
  overflow-x: hidden;
}
</style>
