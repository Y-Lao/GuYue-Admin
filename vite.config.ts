import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from "path";

// @see: https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  resolve:{
    alias:{
      "@": resolve(__dirname, "./src")
    }
  },
  plugins: [vue()],
  server: {
    // 启动端口
    port: 8080,
    hmr: {
      host: "127.0.0.1",
      port: 8080
    },
    // 设置https 代理
    proxy: {
      "/api": {
        target: ' https://mock.mengxuegu.com/mock/64112a1afe77f949bc0d6ec6/guyue',
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/api/, "")
      }
    }
  }
})
