<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue";
import { useLocale } from "../../composables/useLocale";
import heroImage from "../img/hero.jpg";

definePageMeta({
  pageTransition: {
    name: "page-home",
    mode: "out-in",
  },
});

const h1Visible = ref(false);
const revealText = ref(false);
const imageVisible = ref(false);
const activeSlide = ref(0);
const introFinished = ref(false);
let storyObserver = null;
const { t, locale } = useLocale();

const setupStoryObserver = () => {
  const slides = Array.from(document.querySelectorAll(".story-slide"));
  if (!slides.length) return;

  storyObserver = new IntersectionObserver(
    (entries) => {
      const visibleSlides = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

      if (visibleSlides.length) {
        activeSlide.value = Number(visibleSlides[0].target.dataset.index);
      }
    },
    {
      threshold: [0.3, 0.6, 0.9],
      rootMargin: "-15% 0px -15% 0px",
    },
  );

  slides.forEach((slide, index) => {
    slide.dataset.index = String(index);
    storyObserver.observe(slide);
  });
};

const resetAnimations = () => {
  h1Visible.value = false;
  revealText.value = false;
  imageVisible.value = false;

  // force a reflow before replaying the animation
  void document.body.offsetHeight;

  setTimeout(() => {
    h1Visible.value = true;
    imageVisible.value = true;
    setTimeout(() => {
      revealText.value = true;
    }, 1000);
  }, 50);
};

const startHomeAnimations = () => {
  if (introFinished.value) return;

  introFinished.value = true;
  resetAnimations();
  setupStoryObserver();
};

onMounted(() => {
  if (introFinished.value) {
    resetAnimations();
    setupStoryObserver();
  }
});

watch(locale, () => {
  if (introFinished.value) {
    resetAnimations();
  }
});

onUnmounted(() => {
  if (storyObserver) storyObserver.disconnect();
});
</script>

<template>
  <LogoIntro @finished="startHomeAnimations" />
  <main>
    <section class="hero">
      <div class="hero-panel hero-media">
        <img
          :src="heroImage"
          alt="Cuir maroquinerie haut de gamme"
          :class="{ visible: imageVisible }"
        />
      </div>
      <div class="hero-panel hero-copy">
        <p class="small" :class="{ appear: h1Visible }">
          {{ t("home.small") }}
        </p>
        <h1 class="heading-large" :class="{ appear: h1Visible }">
          <span v-if="locale === 'jp'" class="jp-title">
            アールキヌ・<br />パラード
          </span>
          <span v-else>
            {{ t("home.title") }}
          </span>
        </h1>
        <p class="hero-subtitle">
          <span class="reveal" :class="{ revealed: revealText }">{{
            t("home.subtitle")
          }}</span>
        </p>
      </div>
    </section>

    <div class="hero-cta">
      <div class="cta-inner">
        <NuxtLink to="/savoir-faire" class="button button-primary">{{
          t("home.ctaDiscover")
        }}</NuxtLink>
      </div>
    </div>

    <section class="story-scroller">
      <div
        class="story-slide story-slide-title"
        :class="{ active: activeSlide === 0 }"
        data-index="0"
      >
        <div class="story-card">
          <h2 class="section-title">
            {{ t("savoirFaire.title") }}
          </h2>
        </div>
      </div>

      <div
        class="story-slide story-slide-lead"
        :class="{ active: activeSlide === 1 }"
        data-index="1"
      >
        <div class="story-card">
          <p class="lead">
            {{ t("savoirFaire.lead") }}
          </p>
        </div>
      </div>

      <div
        class="story-slide story-slide-copy"
        :class="{ active: activeSlide === 2 }"
        data-index="2"
      >
        <div class="story-card">
          <p class="page-copy">
            {{ t("home.pageCopy") }}
          </p>
        </div>
      </div>
    </section>

    <div class="bottom-cta">
      <NuxtLink to="/sur-mesure" class="button button-secondary">{{
        t("home.ctaCustom")
      }}</NuxtLink>
    </div>
  </main>
</template>

<style scoped>
main {
  min-height: 100vh;
}

.hero {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  min-height: 100vh;
  overflow: hidden;
  margin: 0 0 5rem;
  gap: 3.5rem;
}

.hero-panel {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.hero-media {
  max-height: calc(100vh - 4rem);
}

.hero-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  filter: saturate(0.96) brightness(0.98) contrast(0.97);
  opacity: 0;
  transform: scale(1.02);
  transition:
    opacity 900ms ease,
    transform 900ms ease;
}
.hero-media img.visible {
  opacity: 1;
  transform: scale(1);
}

.hero:hover .hero-media img {
  transform: scale(1.04);
}

.hero-media::after {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at center,
    rgba(247, 242, 233, 0.08),
    transparent 42%
  );
}

.hero-copy {
  align-self: center;
  padding: 3.5rem 2.5rem;
  background: transparent;
  backdrop-filter: none;
  border-radius: 0;
  display: grid;
  gap: 1.6rem;
  transform: translateY(-20px);
}

.hero-copy p.small {
  letter-spacing: 0.35em;
  font-size: 0.8rem;
  text-transform: uppercase;
  margin-bottom: 1rem;
  opacity: 0;
  transform: translateY(16px);
  transition:
    opacity 900ms ease,
    transform 900ms ease;
}
.hero-copy p.small.appear {
  opacity: 1;
  transform: translateY(0);
}

.hero-subtitle {
  font-size: 1.15rem;
  color: var(--muted);
  margin: 1.2rem 0 2rem;
  line-height: 1.75;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  opacity: 0;
  transform: translateY(8px);
  transition:
    opacity 420ms ease,
    transform 420ms ease;
}

.hero-actions.visible {
  opacity: 1;
  transform: none;
}

.heading-large {
  opacity: 0;
  transform: translateY(16px) scale(0.99);
  transition:
    opacity 3000ms cubic-bezier(0.2, 0.8, 0.2, 1),
    transform 3000ms cubic-bezier(0.2, 0.8, 0.2, 1);
  will-change: opacity, transform;
  white-space: pre-line;
  word-break: keep-all;
  overflow-wrap: normal;
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  line-height: 1.05;
}

.heading-large.appear {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.jp-title {
  display: inline-block;
  font-size: clamp(2.2rem, 4.8vw, 4rem);
  line-height: 1.1;
  white-space: normal;
  text-align: left;
}

.hero-subtitle {
  font-size: 1.15rem;
  color: var(--muted);
  margin: 1.2rem 0 2rem;
  line-height: 1.75;
  text-align: right;
}

/* left-to-right reveal mask for subtitle */
.reveal {
  display: inline-block;
  position: relative;
  color: var(--muted);
  font-family: "Mr De Haviland", cursive;
  font-size: clamp(1.2rem, 6vw, 3.6rem);
  letter-spacing: 0.01em;
  white-space: normal;
  overflow: hidden;
  text-overflow: clip;
  word-break: break-word;
  overflow-wrap: anywhere;
}
.reveal::before {
  content: "";
  position: absolute;
  inset: 0 0 0 0;
  background: var(--bg);
  transform-origin: right center;
  transform: scaleX(1);
  transition: transform 2000ms linear;
  pointer-events: none;
}
.reveal.revealed::before {
  transform: scaleX(0);
}
.reveal::after {
  content: ".";
  opacity: 0;
  display: inline-block;
}
.reveal.revealed::after {
  animation: showDot 0s linear 2500ms forwards;
}

@keyframes showDot {
  to {
    opacity: 1;
  }
}
/* scrollytelling slides */
.story-scroller {
  position: relative;
  display: grid;
  gap: 0;
  margin: 6rem 0 2rem;
}

.story-slide {
  position: relative;
  min-height: 160vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1.5rem;
  opacity: 0.28;
  transform: translateY(28px);
  transition:
    opacity 700ms ease,
    transform 700ms ease;
  will-change: opacity, transform;
}

.story-slide.active {
  opacity: 1;
  transform: translateY(0);
}

.story-card {
  position: sticky;
  top: 50%;
  width: min(72ch, 100%);
  display: grid;
  gap: 1rem;
  padding: 2rem 2.3rem;
  border: 1px solid rgba(17, 17, 13, 0.08);
  border-radius: 2rem;
  background: rgba(255, 251, 244, 0.86);
  box-shadow: var(--shadow);
  backdrop-filter: blur(10px);
  transform: translateY(-50%) translateY(24px);
  transition:
    transform 700ms ease,
    opacity 700ms ease;
  opacity: 0.85;
}

.story-slide.active .story-card {
  transform: translateY(-50%) translateY(0);
  opacity: 1;
}

.story-slide-title .story-card {
  justify-items: center;
  text-align: center;
}

.story-slide-lead .story-card {
  justify-items: end;
  text-align: right;
}

.story-slide-copy .story-card {
  justify-items: start;
  text-align: left;
}

.story-kicker {
  margin: 0;
  font-size: 0.82rem;
  letter-spacing: 0.32em;
  text-transform: uppercase;
  color: var(--accent);
}

.page-inner {
  display: none;
}

.lead-block {
  display: none;
}

.page-block {
  display: none;
}

@keyframes blink {
  to {
    opacity: 0;
  }
}

/* CTA block under hero */
.hero-cta {
  display: flex;
  justify-content: center;
  padding: 9rem 1.5rem;
  margin-bottom: 8rem;
}
.cta-inner {
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
}

.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 14rem;
  padding: 1.15rem 2rem;
  border: 1px solid transparent;
  border-radius: 999px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  text-decoration: none;
  transition:
    transform 220ms ease,
    box-shadow 220ms ease,
    background-color 220ms ease,
    color 220ms ease,
    filter 220ms ease;
}

.button:hover {
  transform: translateY(-2px);
}

.button-primary {
  background: linear-gradient(
    135deg,
    rgba(189, 149, 78, 1),
    rgba(144, 107, 52, 1)
  );
  color: #fff;
  box-shadow: 0 18px 40px rgba(119, 82, 31, 0.18);
}

.button-primary:hover {
  filter: brightness(1.02);
  box-shadow: 0 22px 46px rgba(119, 82, 31, 0.24);
}

.button-secondary {
  background: rgba(0, 0, 0, 0.9);
  color: #fff;
  border-color: rgba(255, 255, 255, 0.08);
  box-shadow: 0 14px 32px rgba(0, 0, 0, 0.18);
}

.button-secondary:hover {
  filter: brightness(1.05);
  box-shadow: 0 18px 38px rgba(0, 0, 0, 0.24);
}

.bottom-cta {
  display: flex;
  justify-content: center;
  padding: 10rem 1.5rem 2rem;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* stagger children when page-inner becomes visible */
.page-inner > * {
  opacity: 0;
  transform: translateY(18px);
}
.page-inner.visible > * {
  opacity: 1;
  transform: none;
  animation: fadeInUp 820ms ease both;
}
.page-inner.visible > *:nth-child(1) {
  animation-delay: 0ms;
}
.page-inner.visible > *:nth-child(2) {
  animation-delay: 120ms;
}
.page-inner.visible > *:nth-child(3) {
  animation-delay: 240ms;
}
.page-inner.visible > *:nth-child(4) {
  animation-delay: 360ms;
}
.page-inner.visible > *:nth-child(5) {
  animation-delay: 480ms;
}

@media (max-width: 820px) {
  .hero {
    margin: 0;
    grid-template-columns: 1fr;
  }

  .hero-copy {
    padding: 2.5rem 1.5rem 2rem;
  }

  .button {
    width: 100%;
  }

  .cta-inner,
  .bottom-cta {
    width: 100%;
  }
}
</style>
