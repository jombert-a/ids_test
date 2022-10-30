<script setup>
import UsersView from "./views/Users/UsersView.vue";
</script>

<template>
  <div class="layout">
    <header></header>
    <main class="main-frame">
      <users-view />
    </main>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  flex-direction: col;
}

.main-frame {
  padding: 2rem;
}
</style>
