<script setup lang="ts">
import ArrowDown from '../components/svg/ArrowDown.vue'
import BigArrowDown from '../components/svg/BigArrowDown.vue'
import MenuIcon from '../components/svg/MenuIcon.vue'
import Amplifier from '../components/svg/Amplifier.vue'
import GameController from '../components/svg/GameController.vue'
import Television from '../components/svg/Television.vue'

const logo = '/logo.png'
const about = '/about.png'
</script>

<template>
  <main class="w-full ">
    <div class="min-h-screen">
      <div class="bg-black h-screen py-[10px] px-[20px] relative">

        <!-- Nav -->
        <div class="flex flex-row justify-between items-center">
          <div class="flex flex-row items-center gap-2">
            <img :src="logo" class="w-[50px]">
            <h1 class="text-white text-lg">karlodr.dev</h1>
          </div>
          <MenuIcon/>
        </div>
        <!-- End of Nav -->

        <h1 class="hero-text">JKDR</h1>

        <ArrowDown class="absolute bottom-10 right-10 animate-bounce"/>
      </div>
    </div>

    <div class="min-h-screen bg-black py-[50px]">
      <img :src="about" alt="">

      <div class="pt-[50px] px-[20px] mb-[80px]">
        <h2 class="section-title text-white font-extra-bold text-center mb-[40px]">ABOUT</h2>
        <p class="text-white mb-[30px] text-[18px] font-light">Hi! I am Karlo, problem solver, explorer, and passionate software developer, and also a Frontend developer who loves to create design that will users enjoy.</p>
        <p class="text-white mb-[50px] text-[18px] font-light">I love games, coffee, anime, and dogs!</p>

        <div class="flex flex-row justify-between px-[15px]">
          <GameController/>
          <Amplifier/>
          <Television/>
        </div>
      </div>

      <BigArrowDown class="ml-auto"/>
    </div>

    <div class="min-h-screen bg-black py-[50px] px-[20px]">
      <h2 class="section-title text-white font-extra-bold text-left">EXPERTISE</h2>

      <div>
        
      </div>
    </div>
  </main>
</template>

<style scoped>
.hero-text {
  text-orientation: upright;
  writing-mode: vertical-rl;
  color: white;
  font-size: 170px;
  font-weight: 900;
  letter-spacing: -60px;
  line-height: 1;
  text-shadow: rgba(255,255,255,0.4) 0px 0px 72px;
}

.section-title {
  font-size: 70px;
  letter-spacing: 13px;
  word-break: break-all;
  line-height: 1;
}
</style>