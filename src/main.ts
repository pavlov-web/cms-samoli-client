import { createApp } from "vue";
import myApp from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import { store } from "./store";
import "./assets/scss/main.scss";

const app = createApp(myApp);

app.directive("click-outside", {
  mounted(el, binding) {
    el.clickOutsideEvent = (event: Event) => {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value(event, el);
      }
    };
    document.body.addEventListener("click", el.clickOutsideEvent);
  },
  unmounted(el) {
    document.body.removeEventListener("click", el.clickOutsideEvent);
  },
});
app.use(store).use(router).mount("#app");
