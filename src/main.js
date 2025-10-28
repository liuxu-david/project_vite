import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import "element-plus/dist/index.css";
import copyDirectives from "./directives/copy.js";
// import "./style/index.less";
import "./style/themes.scss";
import monitor from "project_monitor"

console.log("当前所处与环境",import.meta.env.VITE_PROJECT_ENV);

const app = createApp(App);
app.use(router);

// 挂载监控
monitor.init({
    vueConfig:{
        app:app,
        router,
    }
})

// 挂载一键复制指令
app.directive("copy", copyDirectives);
app.mount("#app");
