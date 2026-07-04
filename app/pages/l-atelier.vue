<script setup>
import { useLocale } from "../../composables/useLocale";
const { t } = useLocale();
</script>

<template>
  <main>
    <section class="page-inner">
      <div>
        <p class="small">{{ t("atelier.small") }}</p>
        <h1 class="section-title">{{ t("atelier.title") }}</h1>
        <p class="lead">{{ t("atelier.lead") }}</p>
      </div>
      <div class="card section-border">
        <p class="page-copy">{{ t("atelier.copy") }}</p>
      </div>
    </section>
  </main>
</template>
