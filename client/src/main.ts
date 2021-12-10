import { createApp } from "vue";
import myApp from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import { store } from "./store";
import "./assets/scss/main.scss";

const app = createApp(myApp);

app.use(store).use(router).mount("#app");
