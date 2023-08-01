<script setup lang="ts">

</script>

<template>
  <router-view v-slot="{ Component }">
    <transition appear enter-active-class="animate__animated animate__fadeIn">
      <component :is="Component"></component>
    </transition>
  </router-view>
</template>