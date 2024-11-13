import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  console.log(command, __dirname);
  return {
    // 共享配置
    mode: "development", //配置开发模式
    define: {
      //定义全局常量
      _APP_VERSION: JSON.stringify("v1.0.0"),
    },
    resolve: {
      alias: {
        //配置路径别名
        "@": path.resolve(__dirname, "src"),
      },
      extensions: [".mjs", ".js", ".mts", ".ts", ".jsx", ".tsx", ".json"], //自定义省略导入文件扩展名
    },
    plugins: [
      //插件配置
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      {
        ...vue(),
      },
    ],
    //服务器选项配置
    server: {
      //port: 5173, //自定义启动服务端口号，默认值5173
      //open: true, //启动服务后是否自动打开浏览器
      cors: true, //为开发服务器配置cors，默认允许任何源
      proxy: {
        //为服务配置自定义代理规则
        //配置代理，解决常见跨域问题
        "/api": {
          target: "http://localhost:5000", //将/api开头的请求转发到这个地址上
          changeOrigin: true, //是否需要修改请求头的origin值，避免后端设置origin限制引起跨域问题
          //rewrite: (path) => path.replace(/^\/api/, "/api"), //重写请求路径，这里/api/user会被转发到/user路径上
        },
      },
    },
    // 构建配置
    build: {
      target: "modules", //最终构建的浏览器兼容目标,默认modules
      outDir: "dist", //自定义输出目录,默认dist
      assetsDir: "build", //自定义静态资源目录
      sourcemap: true, //是否生成sourcemap文件，默认false
      emptyOutDir: true, //构建时清理输出目录,如果输出目录在根目录下则默认为true
    },
  };
});
