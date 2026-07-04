<script setup>
import { useLocale } from "../../composables/useLocale";
const { t } = useLocale();
</script>

<template>
  <main>
    <section class="page-inner">
      <div>
        <p class="small">{{ t("surMesure.small") }}</p>
        <h1 class="section-title">{{ t("surMesure.title") }}</h1>
        <p class="lead">{{ t("surMesure.lead") }}</p>
      </div>
      <div class="card section-border">
        <p class="page-copy">{{ t("surMesure.copy") }}</p>
      </div>
    </section>
  </main>
</template>
