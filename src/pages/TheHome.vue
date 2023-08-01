<script setup lang="ts">
import ArrowDown from '../components/svg/ArrowDown.vue'
import ArrowDownBlack from '../components/svg/ArrowDownBlack.vue'
import BigArrowDown from '../components/svg/BigArrowDown.vue'
import MenuIcon from '../components/svg/MenuIcon.vue'
import Amplifier from '../components/svg/Amplifier.vue'
import GameController from '../components/svg/GameController.vue'
import Television from '../components/svg/Television.vue'
import OpenLink from '../components/svg/OpenLink.vue'
import LinkedIn from '../components/svg/LinkedIn.vue'
import Facebook from '../components/svg/Facebook.vue'
import Github from '../components/svg/Github.vue'

import { EXPERTISE_DATA } from '../data/expertise'
import { EXPERIENCE_DATA} from '../data/experience'
import { STACK_DATA } from '../data/stack'
import { PROJECT_DATA } from '../data/project'
import { CONTRIBUTION_DATA } from '../data/contribution'

const logo = '/logo.png'
const about = '/about.png'
</script>

<template>
  <main class="w-full">
    <div class="bg-black min-h-screen">
      <div class="lg:max-w-7xl lg:mx-auto h-screen py-[10px] px-[20px] relative">

        <!-- Nav -->
        <div class="w-full flex flex-row justify-between items-center absolute top-0 py-3">
          <div class="flex flex-row items-center gap-2">
            <img :src="logo" class="w-[50px]">
            <h1 class="text-white text-lg">karlodr.dev</h1>
          </div>
          <MenuIcon class="ml-auto"/>
        </div>
        
        <!-- End of Nav -->

        <h1 class="hero-text h-screen flex items-center justify-center">JKDR</h1>

        <ArrowDown class="absolute bottom-10 right-10 lg:right-[50%] lg:left-[50%] animate-bounce"/>
      </div>
    </div>

    <div class="max-h-screen bg-black py-[50px] lg:py-[100px]">
      <div class="lg:max-w-7xl lg:mx-auto grid grid-cols-1 md:grid-cols-12"
        v-motion
        :initial="{ opacity: 0, y: 100 }"
        :visible="{ opacity: 1, y: 0, transition: { duration: 1000 } }"
        :delay="300"
      >
        <div class="md:col-span-4">
          <img :src="about" alt="About us">
        </div>

        <div class="pt-[50px] px-[20px] mb-[80px] md:col-span-8 lg:pt-0">
          <h2 class="section-title text-white font-extra-bold text-center mb-[40px] md:text-left">ABOUT</h2>
          <p class="text-white mb-[30px] text-[18px] font-light">Hi! I am Karlo, problem solver, explorer, passionate software developer, and also a Frontend developer who loves to create design that will users enjoy.</p>
          <p class="text-white mb-[50px] text-[18px] font-light">I love games, coffee, anime, and dogs!</p>

          <div class="flex flex-row items-center justify-between md:justify-normal md:gap-[30px] px-[15px]">
            <GameController/>
            <Amplifier/>
            <Television/>
          </div>

          <BigArrowDown class="ml-auto"/>
        </div>
      </div>
      
    </div>

    <div class="max-h-screen bg-black py-[50px] lg:py-[100px]">
      <div class="lg:max-w-7xl lg:mx-auto"
        v-motion
        :initial="{ opacity: 0, y: 100 }"
        :visible="{ opacity: 1, y: 0, transition: { duration: 1000 } }"
        :delay="300"
      >
        <h2 class="section-title text-white font-extra-bold text-left">EXPERTISE</h2>

        <div class="py-[30px] flex flex-col gap-[30px]">
          <div v-for="expertise in EXPERTISE_DATA" class="border border-white p-5 text-white">
            <h3 class="text-2xl uppercase font-bold mb-3">{{ expertise.title }}</h3>
            <p class="font-light text-lg">{{ expertise.description }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="max-h-screen bg-black py-[50px] lg:py-[100px]">
      <div class="lg:max-w-7xl lg:mx-auto"
        v-motion
        :initial="{ opacity: 0, y: 100 }"
        :visible="{ opacity: 1, y: 0, transition: { duration: 1000 } }"
        :delay="300"
      >
        <h2 class="section-title text-white font-extra-bold text-left">EXPERIENCE</h2>

        <div class="py-[30px] lg:w-7/12 lg:mx-auto">
          <div class="flex flex-row">
            <table>
              <tr v-for="experience in EXPERIENCE_DATA">
                <td class="border-r border-white text-white align-baseline pr-[25px] pt-[25px]">
                  {{ experience.date }}
                </td>
                <td class="text-white pl-[25px] py-[25px]">
                  <h3 class="text-2xl uppercase font-bold mb-3">{{ experience.title }}</h3>
                  <p class="font-light text-lg">{{ experience.description }}</p>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>

    <div class="max-h-screen bg-black py-[50px] lg:py-[100px]">
      <div class="lg:max-w-7xl lg:mx-auto"
        v-motion
        :initial="{ opacity: 0, y: 100 }"
        :visible="{ opacity: 1, y: 0, transition: { duration: 1000 } }"
        :delay="300"
      >
        <h2 class="section-title text-white font-extra-bold text-left">STACK</h2>

        <div class="py-[30px] lg:w-7/12 lg:mx-auto">
          <div class="flex flex-row flex-wrap gap-[50px] justify-center items-center">
            <img v-for="stack in STACK_DATA" :src="stack" alt="Stack" class="max-h-[60px] aspect-auto brightness-50 hover:brightness-100">
          </div>
        </div>
      </div>
    </div>

    <div class="min-h-screen bg-black py-[50px] lg:py-[100px]">
      <div class="lg:max-w-7xl lg:mx-auto"
        v-motion
        :initial="{ opacity: 0, y: 100 }"
        :visible="{ opacity: 1, y: 0, transition: { duration: 1000 } }"
        :delay="300"
      >
        <h2 class="section-title text-white font-extra-bold text-left">PROJECTS</h2>

        <div class="py-[30px]">
          <div class="grid grid-cols-1 md:grid-cols-12 gap-[15px]">
            <div class="card-container w-full md:col-span-4" v-for="project in PROJECT_DATA">
              <div class="image-container overflow-hidden h-[150px]">
                <img :src="project.thumbnail" alt="" class="w-full brightness-50 hover:brightness-100 hover:scale-110 transition-all duration-500">
              </div>

              <div class="content-container bg-white py-3 px-2 text-center">
                <h3 class="text-2xl font-bold">{{ project.title }}</h3>
                <p>{{ project.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="min-h-screen bg-black py-[50px] lg:py-[100px]">
      <div class="lg:max-w-7xl lg:mx-auto"
        v-motion
        :initial="{ opacity: 0, y: 100 }"
        :visible="{ opacity: 1, y: 0, transition: { duration: 1000 } }"
        :delay="300"
      >
        <h2 class="section-title text-white font-extra-bold text-left">CONTRIBUTIONS</h2>

        <div class="py-[30px] w-full">
          <div class="grid grid-cols-1 md:grid-cols-12 gap-[30px]">
            <div v-for="contribution in CONTRIBUTION_DATA" class="border border-white p-5 text-white md:col-span-4">
              <h3 class="text-2xl uppercase font-bold mb-3">{{ contribution.title }}</h3>
              <a :href="contribution.url" class="font-light hover:underline flex flex-row gap-1 items-center">
                <OpenLink class="w-3"/>
                Open link
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="py-[50px] px-[20px] bg-white">
      <img :src="logo" class="mx-auto mb-[30px]">

      <div class="py-[30px] text-center">
        <div class="mb-[50px]">
          <h3 class="text-xl font-black tracking-[10px] ">CONTACT INFO</h3>
          <a href="mailto:karlo.karlo59@gmail.com">karlo.karlo59@gmail.com</a>
        </div>

        <div class="flex flex-row gap-[30px] items-center justify-center mb-[50px]">
          <LinkedIn/>
          <Facebook/>
          <Github/>
        </div>

        <ArrowDownBlack class="rotate-180 mx-auto"/>
      </div>
    </div>
  </main>
</template>

<style scoped>
.hero-text {
  text-orientation: upright;
  writing-mode: vertical-rl;
  letter-spacing: -60px;
  color: #fff;
  font-size: 170px;
  font-weight: 900;
  line-height: 1;
  animation: clearer 1.5s ease-in
}

@media screen and (min-width: 768px) {
  .hero-text {
    text-orientation: sideways-right;
    writing-mode: horizontal-tb;
    letter-spacing: 20px;
    color: #fff;
    font-size: 170px;
    font-weight: 900;
    line-height: 1;
    animation: clearer 1.5s ease-in, toVertical 3s ease;
  }
}

@keyframes clearer {
  from {
    /* text-shadow: rgba(255,255,255,0.4) 0px 0px 15px; */
    filter: blur(10px);
  }

  to {
    /* text-shadow: rgba(255,255,255,0.4) 0px 0px 72px; */
    filter: blur(0);
  }
}

@keyframes toVertical {
  from {
    letter-spacing: -120px;
  }

  to {
    letter-spacing: 20px;
  }
}

.section-title {
  font-size: 70px;
  letter-spacing: 13px;
  word-break: break-all;
  line-height: 1;
  margin-bottom: 30px;
}
</style>