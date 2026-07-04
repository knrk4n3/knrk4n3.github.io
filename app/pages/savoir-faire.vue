<script setup>
import { useLocale } from "../../composables/useLocale";
const { t } = useLocale();
</script>

<template>
  <main>
    <section class="page-inner">
      <div>
        <p class="small">{{ t("savoirFaire.small") }}</p>
        <h1 class="section-title">{{ t("savoirFaire.title") }}</h1>
        <p class="lead">{{ t("savoirFaire.lead") }}</p>
      </div>
      <div class="card section-border">
        <p class="page-copy">{{ t("savoirFaire.copy") }}</p>
      </div>
    </section>
  </main>
</template>
