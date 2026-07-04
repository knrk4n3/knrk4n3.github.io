import { defineStore } from "pinia";

export type LocaleCode = "fr" | "en" | "jp";

export const useLocaleStore = defineStore("locale", {
  state: () => ({
    locale: "fr" as LocaleCode,
  }),
  actions: {
    initLocale() {
      if (process.client) {
        const stored = window.localStorage.getItem(
          "site-locale",
        ) as LocaleCode | null;
        this.locale = stored ?? "fr";
      }
    },
    setLocale(value: LocaleCode) {
      if (this.locale === value) {
        return;
      }
      this.locale = value;
      if (process.client) {
        window.localStorage.setItem("site-locale", value);
      }
    },
  },
});
