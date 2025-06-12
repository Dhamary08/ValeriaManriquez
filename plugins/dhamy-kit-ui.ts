import { defineNuxtPlugin } from "#app";
import DhamyKitUi from "dhamy-kit-ui";
import "dhamy-kit-ui/dhamy-kit-ui.css";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(DhamyKitUi);
});
