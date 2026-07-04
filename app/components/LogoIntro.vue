<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import leftLogoSrc from "../img/logo_9-gauche.svg";
import rightLogoSrc from "../img/logo_9-droite.svg";

const emit = defineEmits(["finished"]);

const root = ref(null);
const leftLogo = ref(null);
const rightLogo = ref(null);
const wordmark = ref(null);

let ctx = null;

const readCssVar = (element, name, fallback) => {
  const raw = window.getComputedStyle(element).getPropertyValue(name).trim();
  const parsed = Number.parseFloat(raw);
  return Number.isFinite(parsed) ? parsed : fallback;
};

onMounted(async () => {
  if (!root.value || !leftLogo.value || !rightLogo.value || !wordmark.value) {
    return;
  }

  const { default: gsap } = await import("gsap");

  const finalLeftX = readCssVar(root.value, "--logo-intro-left-x-final", -96);
  const finalRightX = readCssVar(root.value, "--logo-intro-right-x-final", 96);

  ctx = gsap.context(() => {
    gsap.set(wordmark.value, {
      autoAlpha: 0,
      scale: 0.25,
      transformOrigin: "center center",
    });

    const timeline = gsap.timeline({
      defaults: {
        ease: "power3.inOut",
      },
    });

    timeline
      .to(
        leftLogo.value,
        {
          xPercent: finalLeftX,
          duration: 1.15,
        },
        0.55,
      )
      .to(
        rightLogo.value,
        {
          xPercent: finalRightX,
          duration: 1.15,
        },
        0.55,
      )
      .to(
        wordmark.value,
        {
          autoAlpha: 1,
          scale: 1,
          duration: 0.85,
        },
        0.72,
      )
      .to(
        root.value,
        {
          autoAlpha: 0,
          duration: 0.7,
          delay: 0.4,
          onComplete: () => {
            gsap.set(root.value, {
              display: "none",
            });
            emit("finished");
          },
        },
        2.15,
      );
  }, root.value);
});

onUnmounted(() => {
  if (ctx) {
    ctx.revert();
    ctx = null;
  }
});
</script>

<template>
  <div ref="root" class="logo-intro" aria-hidden="true">
    <div class="logo-intro__stage">
      <img
        ref="leftLogo"
        class="logo-intro__piece logo-intro__piece--left"
        :src="leftLogoSrc"
        :style="{
          '--logo-intro-x-initial': 'var(--logo-intro-left-x-initial)',
          '--logo-intro-y-initial': 'var(--logo-intro-left-y-initial)',
        }"
        alt=""
      />

      <img
        ref="rightLogo"
        class="logo-intro__piece logo-intro__piece--right"
        :src="rightLogoSrc"
        :style="{
          '--logo-intro-x-initial': 'var(--logo-intro-right-x-initial)',
          '--logo-intro-y-initial': 'var(--logo-intro-right-y-initial)',
        }"
        alt=""
      />

      <div ref="wordmark" class="logo-intro__wordmark">Arlequine Parade</div>
    </div>
  </div>
</template>

<style scoped>
.logo-intro {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: grid;
  place-items: center;
  overflow: hidden;
  background:
    radial-gradient(
      circle at center,
      rgba(255, 251, 244, 0.98),
      rgba(247, 242, 233, 0.98) 56%,
      rgba(237, 228, 214, 0.98)
    ),
    var(--bg);
  --logo-intro-left-x-initial: 0;
  --logo-intro-right-x-initial: 0;
  --logo-intro-left-y-initial: -12;
  --logo-intro-right-y-initial: 12;
  --logo-intro-left-x-final: -220;
  --logo-intro-right-x-final: 130;
}

.logo-intro__stage {
  position: relative;
  width: min(90vw, 54rem);
  height: clamp(14rem, 30vw, 24rem);
  transform: scale(var(--logo-intro-scale, 1));
  transform-origin: center center;
}

.logo-intro__piece,
.logo-intro__wordmark {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%)
    translate(
      calc(var(--logo-intro-x-initial, 0) * 1%),
      calc(var(--logo-intro-y-initial, 0) * 1%)
    );
  transform-origin: center center;
  will-change: transform, opacity;
}

.logo-intro__piece {
  display: block;
  width: clamp(8rem, 22vw, 18rem);
  height: auto;
  flex: 0 0 auto;
  filter: drop-shadow(0 12px 24px rgba(17, 17, 13, 0.12));
}

.logo-intro__piece--left {
  z-index: 2;
}

.logo-intro__piece--right {
  z-index: 3;
}

.logo-intro__wordmark {
  z-index: 4;
  opacity: 0;
  min-width: 0;
  padding: 0;
  border: 0;
  background: transparent;
  box-shadow: none;
  color: var(--text);
  font-family: "Micksenav", serif;
  font-size: clamp(3rem, 8vw, 7rem);
  line-height: 1;
  letter-spacing: 0;
  white-space: nowrap;
}

@media (max-width: 1024px) {
  .logo-intro {
    --logo-intro-scale: 0.8;
    --logo-intro-left-x-final: -170;
    --logo-intro-right-x-final: 105;
  }

  .logo-intro__stage {
    width: min(92vw, 46rem);
    height: clamp(13rem, 34vw, 22rem);
  }

  .logo-intro__piece {
    width: clamp(7rem, 24vw, 14rem);
  }

  .logo-intro__wordmark {
    font-size: clamp(2.6rem, 7vw, 5.6rem);
  }
}

@media (max-width: 720px) {
  .logo-intro {
    --logo-intro-scale: 0.62;
    --logo-intro-left-x-initial: 0;
    --logo-intro-right-x-initial: 0;
    --logo-intro-left-y-initial: -15;
    --logo-intro-right-y-initial: 9;
    --logo-intro-left-x-final: -200;
    --logo-intro-right-x-final: 120;
  }

  .logo-intro__stage {
    width: min(90vw, 30rem);
    height: clamp(12rem, 48vw, 18rem);
  }

  .logo-intro__piece {
    width: clamp(6.2rem, 26vw, 10rem);
  }

  .logo-intro__wordmark {
    min-width: 0;
    font-size: clamp(2rem, 8.5vw, 3.8rem);
    letter-spacing: 0;
  }
}

@media (max-width: 420px) {
  .logo-intro {
    --logo-intro-scale: 0.54;
    --logo-intro-left-x-initial: 0;
    --logo-intro-right-x-initial: 0;
    --logo-intro-left-y-initial: -15;
    --logo-intro-right-y-initial: 9;
    --logo-intro-left-x-final: -195;
    --logo-intro-right-x-final: 108;
  }

  .logo-intro__stage {
    width: 24rem;
    height: 15rem;
  }

  .logo-intro__piece {
    width: 7rem;
  }

  .logo-intro__wordmark {
    font-size: 2.45rem;
  }
}
</style>
