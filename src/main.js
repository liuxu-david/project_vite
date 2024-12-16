import { createApp } from "vue";
// import "./style.css";
import App from "./App.vue";
import router from "./router/index.js";
import "element-plus/dist/index.css";

console.log(import.meta.env.VITE_APP_URL);

createApp(App).use(router).mount("#app");
