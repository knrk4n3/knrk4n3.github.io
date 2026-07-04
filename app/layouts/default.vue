<script setup>
import { useLocale } from "../../composables/useLocale";
const { t, locale, setLocale } = useLocale();
const currentYear = new Date().getFullYear();

const changeLocale = (value) => {
  if (locale.value === value) {
    return;
  }

  setLocale(value);
};
</script>

<template>
  <div>
    <header class="navbar">
      <div class="navbar-brand">{{ t("brand") }}</div>
      <nav class="navbar-links">
        <NuxtLink to="/" active-class="active">{{ t("nav.home") }}</NuxtLink>
        <NuxtLink to="/savoir-faire" active-class="active">{{
          t("nav.savoirFaire")
        }}</NuxtLink>
        <NuxtLink to="/creations" active-class="active">{{
          t("nav.creations")
        }}</NuxtLink>
        <NuxtLink to="/sur-mesure" active-class="active">{{
          t("nav.surMesure")
        }}</NuxtLink>
        <NuxtLink to="/l-atelier" active-class="active">{{
          t("nav.atelier")
        }}</NuxtLink>
        <NuxtLink to="/contact" active-class="active">{{
          t("nav.contact")
        }}</NuxtLink>
      </nav>
      <div class="lang-switcher" role="group" aria-label="Changer la langue">
        <button
          class="lang-flag"
          type="button"
          :class="{ active: locale === 'fr' }"
          aria-label="Français"
          @click="changeLocale('fr')"
        >
          🇫🇷
        </button>
        <button
          class="lang-flag"
          type="button"
          :class="{ active: locale === 'en' }"
          aria-label="English"
          @click="changeLocale('en')"
        >
          🇬🇧
        </button>
        <button
          class="lang-flag"
          type="button"
          :class="{ active: locale === 'jp' }"
          aria-label="日本語"
          @click="changeLocale('jp')"
        >
          🇯🇵
        </button>
      </div>
    </header>
    <slot />
    <footer class="footer">
      <p>{{ t("footer") }}</p>
      <p class="footer-copy">© {{ currentYear }} {{ t("brand") }}</p>
    </footer>
  </div>
</template>
