import { createApp } from "vue";
// import "./style.css";
import App from "./App.vue";
import router from "./router/index.js";
import "element-plus/dist/index.css";
import copyDirectives from "./directives/copy.js";

console.log(import.meta.env.VITE_APP_URL);

const app = createApp(App);
app.use(router);

// 挂载一键复制指令
app.directive("copy", copyDirectives);
app.mount("#app");
