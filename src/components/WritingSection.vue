<script setup lang="ts">
import { ref, onMounted } from 'vue'
import OpenLink from './svg/OpenLink.vue'
import { WRITING_DATA } from '../data/writing'

defineProps<{
  variant: 'bento' | 'classic' | 'brutalist'
}>()

interface DevToArticle {
  title: string
  url: string
  published_at: string
  description: string
}

const posts = ref<
  Array<{
    title: string
    url: string
    date: string
    description: string
  }>
>([...WRITING_DATA.posts])

const loading = ref(true)

onMounted(async () => {
  try {
    const res = await fetch('https://dev.to/api/articles?username=karlodelarosa3&per_page=3')
    if (!res.ok) throw new Error('fetch failed')
    const data: DevToArticle[] = await res.json()
    if (data.length > 0) {
      posts.value = data.map((article) => ({
        title: article.title,
        url: article.url,
        date: new Date(article.published_at).toLocaleDateString('en-US', {
          month: 'short',
          year: 'numeric',
        }),
        description: article.description || '',
      }))
    }
  } catch {
    // keep fallback from WRITING_DATA
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <section :id="variant === 'classic' ? undefined : 'writing'" :class="['writing-section', `writing-section--${variant}`]">
    <div :class="variant === 'classic' ? 'classic-container' : variant === 'bento' ? 'bento-shell' : 'neo-section-inner'">
      <div
        v-if="variant === 'bento'"
        v-motion
        class="bento-section-head"
        :initial="{ opacity: 0, y: 40 }"
        :visible="{ opacity: 1, y: 0, transition: { duration: 700 } }"
      >
        <h2 class="bento-section-title">Writing</h2>
        <p>Notes on frontend craft — also on <a :href="WRITING_DATA.profileUrl" target="_blank" rel="noopener noreferrer" class="writing-profile-link">Dev.to</a>.</p>
      </div>

      <header v-else-if="variant === 'classic'" class="classic-section-head">
        <span class="classic-section-index">07</span>
        <h2 class="classic-section-title">
          Writing<span class="classic-dot">.</span>
        </h2>
      </header>

      <div v-else class="neo-section-head">
        <h2 class="neo-section-title">Writing</h2>
        <p class="neo-section-sub">From the Dev.to blog</p>
      </div>

      <div
        :class="
          variant === 'classic'
            ? 'classic-writing-grid'
            : variant === 'bento'
              ? 'bento-grid bento-grid-writing'
              : 'neo-writing-grid'
        "
      >
        <p v-if="loading && variant !== 'classic'" class="writing-loading">Loading posts…</p>

        <article
          v-for="(post, i) in posts"
          :key="post.url"
          v-motion
          :class="
            variant === 'classic'
              ? 'classic-writing-card'
              : variant === 'bento'
                ? 'bento-cell cell-writing'
                : 'neo-card neo-writing-card'
          "
          :initial="variant !== 'classic' ? { opacity: 0, y: 24 } : undefined"
          :visible="variant !== 'classic' ? { opacity: 1, y: 0, transition: { duration: 600, delay: i * 80 } } : undefined"
        >
          <span v-if="post.date && variant === 'bento'" class="cell-label">{{ post.date }}</span>
          <h3
            :class="
              variant === 'classic'
                ? 'classic-writing-title'
                : variant === 'bento'
                  ? 'writing-title'
                  : 'neo-writing-title'
            "
          >
            {{ post.title }}
          </h3>
          <p
            v-if="post.description"
            :class="variant === 'classic' ? 'classic-writing-desc' : variant === 'bento' ? 'writing-desc' : 'neo-writing-desc'"
          >
            {{ post.description }}
          </p>
          <a
            :href="post.url"
            target="_blank"
            rel="noopener noreferrer"
            :class="variant === 'classic' ? 'classic-writing-link' : variant === 'bento' ? 'contrib-link' : 'neo-writing-link'"
          >
            <OpenLink :class="variant === 'classic' ? 'classic-link-icon' : variant === 'bento' ? 'contrib-icon' : 'neo-open-icon'" />
            Read on Dev.to
          </a>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Bento — uses CSS variables inherited from .bento-page */
.writing-section--bento {
  position: relative;
  z-index: 1;
}

.writing-section--bento .bento-shell {
  position: relative;
  z-index: 1;
  max-width: 1280px;
  margin: 0 auto;
  padding: 96px 20px 0;
}

.writing-section--bento .bento-section-head {
  margin-bottom: 18px;
}

.writing-section--bento .bento-section-head p {
  color: rgba(244, 244, 248, 0.62);
  max-width: 560px;
}

.writing-section--bento .bento-section-title {
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 900;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 16px;
  color: #f4f4f8;
}

.writing-section--bento .bento-cell {
  position: relative;
  overflow: hidden;
  border-radius: 22px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.015));
  padding: 24px;
  transition: border-color 0.25s ease, background 0.25s ease;
}

.writing-section--bento .bento-cell:hover {
  border-color: rgba(255, 255, 255, 0.18);
  background: rgba(255, 255, 255, 0.055);
}

.writing-section--bento .cell-label {
  display: block;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(244, 244, 248, 0.62);
  margin-bottom: 8px;
}

.writing-section--bento .contrib-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: auto;
  font-size: 0.85rem;
  font-weight: 600;
  color: #46cf98;
  text-decoration: none;
}

.writing-section--bento .contrib-link:hover {
  text-decoration: underline;
}

.writing-section--bento .contrib-icon {
  width: 12px;
}

.bento-grid-writing {
  display: grid;
  grid-template-columns: 1fr;
  gap: 14px;
}

.cell-writing {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.writing-title {
  font-size: 1.05rem;
  font-weight: 700;
  line-height: 1.35;
}

.writing-desc {
  font-size: 0.88rem;
  color: rgba(244, 244, 248, 0.62);
  line-height: 1.5;
  flex: 1;
}

.writing-profile-link {
  color: #46cf98;
  text-decoration: underline;
}

.writing-loading {
  color: rgba(244, 244, 248, 0.5);
  font-size: 0.9rem;
}

@media (min-width: 768px) {
  .bento-grid-writing {
    grid-template-columns: repeat(3, 1fr);
  }
}

.writing-section--brutalist {
  padding: 80px 20px;
  position: relative;
  z-index: 1;
}

.neo-section-inner {
  max-width: 1100px;
  margin: 0 auto;
}

.neo-section-head {
  margin-bottom: 32px;
}

.neo-section-title {
  font-size: clamp(2.5rem, 8vw, 4rem);
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  border-bottom: 3px solid #000;
  padding-bottom: 12px;
  margin-bottom: 8px;
}

.neo-section-sub {
  font-size: 1rem;
  font-weight: 600;
}

.neo-writing-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

.neo-writing-card {
  border: 3px solid #000;
  box-shadow: 6px 6px 0 0 #000;
  background: #fff;
  padding: 20px;
}

.neo-writing-title {
  font-size: 1.1rem;
  font-weight: 800;
  margin-bottom: 8px;
}

.neo-writing-desc {
  font-size: 0.9rem;
  margin-bottom: 12px;
  line-height: 1.5;
}

.neo-writing-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-weight: 800;
  text-decoration: none;
  color: #000;
}

.neo-open-icon {
  width: 12px;
}

@media (min-width: 768px) {
  .neo-writing-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Classic */
.writing-section--classic {
  position: relative;
  z-index: 1;
  padding: 0;
}

.writing-section--classic .classic-container {
  max-width: 1100px;
  margin: 0 auto;
}

.writing-section--classic .classic-section-head {
  margin-bottom: clamp(40px, 8vw, 72px);
}

.writing-section--classic .classic-section-index {
  display: block;
  margin-bottom: 12px;
  font-size: clamp(0.75rem, 2vw, 0.9rem);
  font-weight: 800;
  letter-spacing: 0.2em;
  color: #04b6c1;
}

.writing-section--classic .classic-section-title {
  font-size: clamp(56px, 14vw, 148px);
  font-weight: 900;
  letter-spacing: -0.03em;
  line-height: 0.92;
  text-transform: uppercase;
  color: inherit;
}

.writing-section--classic .classic-dot {
  color: #04b6c1;
}

.classic-writing-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

.classic-writing-card {
  padding: clamp(24px, 4vw, 32px);
  border: 1px solid rgba(10, 10, 10, 0.12);
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.5);
  display: flex;
  flex-direction: column;
  gap: 10px;
  transition:
    border-color 0.25s ease,
    transform 0.25s ease;
}

:global(.dark) .classic-writing-card {
  border-color: rgba(244, 244, 248, 0.14);
  background: rgba(12, 12, 18, 0.6);
}

.classic-writing-card:hover {
  border-color: #04b6c1;
  transform: translateY(-2px);
}

.classic-writing-title {
  font-size: clamp(1.05rem, 2.8vw, 1.35rem);
  font-weight: 900;
  line-height: 1.3;
  letter-spacing: -0.01em;
}

.classic-writing-desc {
  font-size: clamp(0.88rem, 2vw, 0.95rem);
  line-height: 1.55;
  color: rgba(10, 10, 10, 0.62);
  flex: 1;
}

:global(.dark) .classic-writing-desc {
  color: rgba(244, 244, 248, 0.62);
}

.classic-writing-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: auto;
  font-size: 0.85rem;
  font-weight: 700;
  color: #04b6c1;
  text-decoration: none;
}

.classic-writing-link:hover {
  text-decoration: underline;
}

.classic-link-icon {
  width: 12px;
}

@media (min-width: 768px) {
  .classic-writing-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
