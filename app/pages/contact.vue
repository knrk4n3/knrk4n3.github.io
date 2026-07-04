<script setup>
import { useLocale } from "../../composables/useLocale";
const { t } = useLocale();
</script>

<template>
  <main class="contact-page">
    <section class="contact-hero">
      <div class="hero-copy">
        <p class="eyebrow">{{ t("contact.eyebrow") }}</p>
        <h1 class="contact-title">{{ t("contact.title") }}</h1>
        <p class="contact-lead">{{ t("contact.lead") }}</p>
      </div>
    </section>

    <section class="contact-grid">
      <article class="panel panel-details">
        <div class="panel-head">
          <p class="panel-label">{{ t("contact.panelLabel") }}</p>
          <h2 class="panel-title">{{ t("contact.panelTitle") }}</h2>
        </div>

        <div class="detail-list">
          <div class="detail-row">
            <span class="detail-label">{{ t("contact.details.name") }}</span>
            <span class="detail-value">{{ t("brand") }}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">{{ t("contact.details.phone") }}</span>
            <span class="detail-value"
              ><a href="tel:0673293362">06 73 29 33 62</a></span
            >
          </div>
          <div class="detail-row">
            <span class="detail-label">{{
              t("contact.details.location")
            }}</span>
            <span class="detail-value">Clermont-Ferrand</span>
          </div>
        </div>
      </article>

      <article class="panel panel-actions">
        <div class="panel-head">
          <p class="panel-label">{{ t("contact.networkLabel") }}</p>
          <h2 class="panel-title">{{ t("contact.networkTitle") }}</h2>
        </div>

        <div class="social-grid">
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noreferrer"
            class="social-link"
            aria-label="Instagram"
          >
            <span class="social-icon instagram" aria-hidden="true"></span>
            <span class="sr-only">Instagram</span>
          </a>
          <a
            href="https://www.tiktok.com/"
            target="_blank"
            rel="noreferrer"
            class="social-link"
            aria-label="TikTok"
          >
            <span class="social-icon tiktok" aria-hidden="true"></span>
            <span class="sr-only">TikTok</span>
          </a>
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noreferrer"
            class="social-link"
            aria-label="Facebook"
          >
            <span class="social-icon facebook" aria-hidden="true"></span>
            <span class="sr-only">Facebook</span>
          </a>
          <a
            href="https://www.bereal.com/"
            target="_blank"
            rel="noreferrer"
            class="social-link"
            aria-label="BeReal"
          >
            <span class="social-icon bereal" aria-hidden="true"></span>
            <span class="sr-only">BeReal</span>
          </a>
        </div>
      </article>
    </section>
  </main>
</template>
