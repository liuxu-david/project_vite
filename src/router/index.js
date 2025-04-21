import {
    createRouter,
    createWebHistory,
    createWebHashHistory,
} from "vue-router";

const routes = [
    {
        path: "/",
        redirect: "/home",
    },
    {
        path: "/home",
        name: "首页",
        component: () => import("@/views/home/index.vue"),
    },
    {
        path: "/components",
        name: "封装组件页面",
        component: () => import("@/views/my_components/index.vue"),
    },
    {
        path: "/db",
        name: "数据库验证页面",
        component: () => import("@/views/db/index.vue"),
    },
    {
        path: "/list",
        name: "虚拟列表",
        component: () => import("@/views/list/index.vue"),
        beforeEnter: (to, from) => {
            console.log("执行了路由独享守卫");
            document.title = "路由独享守卫";
        },
    },
    {
        path: "/list_extend",
        name: "虚拟列表拓展",
        component: () => import("@/views/list_extend/index.vue"),
    },
    {
        path: "/upload_files",
        name: "大文件上传",
        component: () => import("@/views/upload_files/main.vue"),
    },
    {
        path: "/company",
        name: "企业级文件上传下载",
        component: () => import("@/views/upload_files_max/index.vue"),
    },
    {
        path: "/theme",
        name: "一键换肤",
        component: () => import("@/views/change_theme/index.vue"),
    },
    {
        path: "/refresh",
        name: "触底刷新页面",
        component: () => import("@/views/refresh/index.vue"),
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
