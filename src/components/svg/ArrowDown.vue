<script setup lang="ts">
import { useDark } from '@vueuse/core'
const isDark = useDark();
</script>

<template>
  <svg class="fill-current "
    :class="{ 'text-white': isDark }" width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M20.5 5.125C21.4436 5.125 22.2084 5.88985 22.2084 6.83333V30.0424L31.2504 21.0004C31.9175 20.3333 32.9992 20.3333 33.6663 21.0004C34.3334 21.6675 34.3334 22.7492 33.6663 23.4163L21.708 35.3746C21.0409 36.0417 19.9592 36.0417 19.2921 35.3746L7.33373 23.4163C6.66659 22.7492 6.66659 21.6675 7.33373 21.0004C8.00088 20.3333 9.08253 20.3333 9.74969 21.0004L18.7917 30.0424V6.83333C18.7917 5.88985 19.5565 5.125 20.5 5.125Z" />
  </svg>
</template>