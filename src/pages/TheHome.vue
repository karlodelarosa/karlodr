<script setup lang="ts">
import ArrowDown from '../components/svg/ArrowDown.vue'
import ArrowDownBlack from '../components/svg/ArrowDownBlack.vue'
import Amplifier from '../components/svg/Amplifier.vue'
import GameController from '../components/svg/GameController.vue'
import Television from '../components/svg/Television.vue'
import OpenLink from '../components/svg/OpenLink.vue'
import LinkedIn from '../components/svg/LinkedIn.vue'
import Facebook from '../components/svg/Facebook.vue'
import Github from '../components/svg/Github.vue'
import LinkedInWhite from '../components/svg/LinkedInWhite.vue'

import { ABOUT_DATA } from '../data/about'
import { EXPERTISE_DATA } from '../data/expertise'
import { EXPERIENCE_DATA} from '../data/experience'
import { STACK_DATA } from '../data/stack'
import { PROJECT_DATA } from '../data/project'
import { CONTRIBUTION_DATA } from '../data/contribution'

const logo = '/logo.png'
const about = '/about.png'

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}
</script>

<template>
  <main class="w-full">

    <div class="w-full flex flex-row justify-between items-center fixed top-0 py-3 z-50 px-[20px] bg-black/70">
      <div @click="scrollToTop()" class="flex flex-row items-center gap-2">
        <img :src="logo" class="w-[50px]">
        <h1 class="text-white text-lg">karlodr.dev</h1>
      </div>
      <!-- <MenuIcon class="ml-auto"/> -->
      <a target="_blank" href="https://www.linkedin.com/in/karlo-dela-rosa/"><LinkedInWhite/></a>
    </div>

    <div id="top" class="bg-black min-h-screen">
      <div class="lg:max-w-7xl lg:mx-auto h-screen py-[10px] px-[20px] relative">
        <div class=" h-screen flex flex-col items-center justify-center">
          <h1 class="hero-text text-glow">JKDR</h1>
          <p class="text-white font-bold tracking-[8px] lg:tracking-[20px] pt-0 position-text" 
            v-motion
            :initial="{ opacity: 0, y: -20 }"
            :enter="{ opacity: 1, y: 0, transition: { duration: 1000 } }"
            :delay="1300"
          >FRONTEND DEVELOPER</p>
        </div>
        
        <a href="#about" class="absolute bottom-10 left-0 right-0  animate-pulse cursor-pointer">
          <ArrowDown class="mx-auto"/>
        </a>
      </div>
    </div>

    <div id="about" class="min-h-screen bg-black py-[50px] lg:py-[100px]">
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
          <h2 class="section-title text-white font-extra-bold text-left mb-[40px]">ABOUT</h2>
          <p class="text-white mb-[30px] text-[18px] font-light">{{ ABOUT_DATA.main_description }}</p>
          <p class="text-white mb-[50px] text-[18px] font-light">{{ ABOUT_DATA.sub_description }}</p>

          <div class="flex flex-row items-center justify-between md:justify-normal md:gap-[30px] px-[15px]">
            <GameController/>
            <Amplifier/>
            <Television/>
          </div>

          <!-- <BigArrowDown class="ml-auto"/> -->
        </div>
      </div>
      
    </div>

    <div class="min-h-screen bg-black py-[50px] lg:py-[100px] px-[20px]">
      <div class="lg:max-w-7xl lg:mx-auto "
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

    <div class="min-h-screen bg-black py-[50px] lg:py-[100px] px-[20px]">
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

    <div class="min-h-screen bg-black py-[50px] lg:py-[100px] px-[20px]">
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

    <div class="min-h-screen bg-black py-[50px] lg:py-[100px] px-[20px]">
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

    <div class="min-h-screen bg-black py-[50px] lg:py-[100px] px-[20px]">
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
          <a target="_blank" href="https://www.linkedin.com/in/karlo-dela-rosa/"><LinkedIn/></a>
          <a target="_blank" href="https://www.facebook.com/karlodrr/"><Facebook/></a>
          <a target="_blank" href="https://github.com/karlodelarosa"><Github/></a>
        </div>

        <ArrowDownBlack @click="scrollToTop()" class="rotate-180 mx-auto cursor-pointer active:scale-95"/>
        
      </div>
    </div>
  </main>
</template>

<style scoped>
.hero-text {
  /* text-orientation: sideways-right;
    writing-mode: horizontal-tb;
    letter-spacing: 20px; */
  letter-spacing: 10px;
  color: #fff;
  font-size: 100px;
  font-weight: 900;
  line-height: 1;
  animation: clearer 1.5s ease-in, toVerticalXsSm 3s ease;
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

.position-text {
  text-shadow: rgba(255,255,255,0.4) 0px 0px 20px;
}

.text-glow {
  text-shadow: rgba(255,255,255,0.4) 0px 0px 20px;
}

@keyframes clearer {
  from {
    filter: blur(10px);
  }

  to {
    filter: blur(0);
  }
}

@keyframes toVerticalXsSm {
  from {
    letter-spacing: -60px;
  }

  to {
    letter-spacing: 10px;
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