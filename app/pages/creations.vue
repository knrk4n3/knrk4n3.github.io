<script setup>
import { useLocale } from "../../composables/useLocale";
const { t } = useLocale();
</script>

<template>
  <main>
    <section class="page-inner">
      <div>
        <p class="small">{{ t("creations.small") }}</p>
        <h1 class="section-title">{{ t("creations.title") }}</h1>
        <p class="lead">{{ t("creations.lead") }}</p>
      </div>
      <div class="card section-border">
        <p class="page-copy">{{ t("creations.copy") }}</p>
      </div>
    </section>
  </main>
</template>
