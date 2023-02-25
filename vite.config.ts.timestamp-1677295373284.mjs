// vite.config.ts
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import mkcert from "vite-plugin-mkcert";
import path from "path";
var vite_config_default = defineConfig(({ mode }) => {
  const serverOptions = {
    proxy: {
      "/api": {
        target: process.env.VITE_PUBLIC_API_SERVER,
        changeOrigin: true,
        rewrite: (path2) => path2.replace(/^\/api/, "")
      }
    }
  };
  const buildOptions = {
    outDir: "dist",
    assetsDir: "assets",
    commonjsOptions: {
      include: []
    }
  };
  if (mode === "production") {
    process.env = {
      ...process.env,
      ...loadEnv(mode, process.cwd())
    };
    Object.assign(serverOptions, {
      host: "0.0.0.0",
      port: 3e3
    });
    Object.assign(buildOptions, {
      sourcemap: false,
      manifest: true
    });
  }
  if (mode === "development") {
    Object.assign(serverOptions, {
      host: "localhost",
      port: 3e3
    });
    Object.assign(buildOptions, {
      sourcemap: true
    });
  }
  return {
    plugins: [
      tsconfigPaths(),
      react({
        jsxImportSource: "@emotion/react",
        babel: {
          plugins: ["@emotion/babel-plugin"]
        }
      }),
      mkcert()
    ],
    optimizeDeps: {
      disabled: false
    },
    base: "/",
    publicDir: "./public",
    server: serverOptions,
    build: buildOptions,
    preview: {
      port: 3e3
    },
    resolve: {
      alias: {
        react: path.resolve("./node_modules/react")
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvYW4teWVpbi9Eb2N1bWVudHMvQUktSW50ZXJ2aWV3TWF0ZS1GRVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2FuLXllaW4vRG9jdW1lbnRzL0FJLUludGVydmlld01hdGUtRkUvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2FuLXllaW4vRG9jdW1lbnRzL0FJLUludGVydmlld01hdGUtRkUvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcsIGxvYWRFbnYsIFNlcnZlck9wdGlvbnMsIEJ1aWxkT3B0aW9ucyB9IGZyb20gXCJ2aXRlXCI7XG5pbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0XCI7XG5pbXBvcnQgdHNjb25maWdQYXRocyBmcm9tIFwidml0ZS10c2NvbmZpZy1wYXRoc1wiO1xuaW1wb3J0IG1rY2VydCBmcm9tIFwidml0ZS1wbHVnaW4tbWtjZXJ0XCI7XG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSB9KSA9PiB7XG4gIC8qKlxuICAgKiBDb21tb24gU2VydmVyIE9wdGlvbnNcbiAgICovXG4gIGNvbnN0IHNlcnZlck9wdGlvbnM6IFNlcnZlck9wdGlvbnMgPSB7XG4gICAgcHJveHk6IHtcbiAgICAgIFwiL2FwaVwiOiB7XG4gICAgICAgIHRhcmdldDogcHJvY2Vzcy5lbnYuVklURV9QVUJMSUNfQVBJX1NFUlZFUixcbiAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxuICAgICAgICByZXdyaXRlOiAocGF0aCkgPT4gcGF0aC5yZXBsYWNlKC9eXFwvYXBpLywgXCJcIiksXG4gICAgICB9LFxuICAgIH0sXG4gIH07XG5cbiAgLyoqXG4gICAqIENvbW1vbiBCdWlsZCBPcHRpb25zXG4gICAqL1xuICBjb25zdCBidWlsZE9wdGlvbnM6IEJ1aWxkT3B0aW9ucyA9IHtcbiAgICBvdXREaXI6IFwiZGlzdFwiLFxuICAgIGFzc2V0c0RpcjogXCJhc3NldHNcIixcbiAgICBjb21tb25qc09wdGlvbnM6IHtcbiAgICAgIGluY2x1ZGU6IFtdLFxuICAgIH0sXG4gIH07XG5cbiAgLyoqXG4gICAqIFByb2R1Y3Rpb24gTW9kZVxuICAgKi9cbiAgaWYgKG1vZGUgPT09IFwicHJvZHVjdGlvblwiKSB7XG4gICAgcHJvY2Vzcy5lbnYgPSB7XG4gICAgICAuLi5wcm9jZXNzLmVudixcbiAgICAgIC4uLmxvYWRFbnYobW9kZSwgcHJvY2Vzcy5jd2QoKSksIFxuICAgIH07XG5cbiAgICBPYmplY3QuYXNzaWduKHNlcnZlck9wdGlvbnMsIHtcbiAgICAgIGhvc3Q6IFwiMC4wLjAuMFwiLFxuICAgICAgcG9ydDogMzAwMCxcbiAgICB9KTtcblxuICAgIE9iamVjdC5hc3NpZ24oYnVpbGRPcHRpb25zLCB7XG4gICAgICBzb3VyY2VtYXA6IGZhbHNlLFxuICAgICAgbWFuaWZlc3Q6IHRydWUsXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogRGV2ZWxvcG1lbnQgTW9kZVxuICAgKi9cbiAgaWYgKG1vZGUgPT09IFwiZGV2ZWxvcG1lbnRcIikge1xuICAgIE9iamVjdC5hc3NpZ24oc2VydmVyT3B0aW9ucywge1xuICAgICAgaG9zdDogXCJsb2NhbGhvc3RcIixcbiAgICAgIHBvcnQ6IDMwMDAsXG4gICAgfSk7XG5cbiAgICBPYmplY3QuYXNzaWduKGJ1aWxkT3B0aW9ucywge1xuICAgICAgc291cmNlbWFwOiB0cnVlLFxuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBwbHVnaW5zOiBbXG4gICAgICB0c2NvbmZpZ1BhdGhzKCksXG4gICAgICByZWFjdCh7XG4gICAgICAgIGpzeEltcG9ydFNvdXJjZTogXCJAZW1vdGlvbi9yZWFjdFwiLFxuICAgICAgICBiYWJlbDoge1xuICAgICAgICAgIHBsdWdpbnM6IFsgXCJAZW1vdGlvbi9iYWJlbC1wbHVnaW5cIiBdLFxuICAgICAgICB9LFxuICAgICAgfSksXG4gICAgICBta2NlcnQoKSxcbiAgICBdLFxuICAgIG9wdGltaXplRGVwczoge1xuICAgICAgZGlzYWJsZWQ6IGZhbHNlLFxuICAgIH0sXG5cbiAgICBiYXNlOiBcIi9cIixcbiAgICBwdWJsaWNEaXI6IFwiLi9wdWJsaWNcIixcblxuICAgIHNlcnZlcjogc2VydmVyT3B0aW9ucyxcbiAgICBidWlsZDogYnVpbGRPcHRpb25zLFxuICAgIHByZXZpZXc6IHtcbiAgICAgIHBvcnQ6IDMwMDAsXG4gICAgfSxcblxuICAgIHJlc29sdmU6IHtcbiAgICAgIGFsaWFzOiB7XG4gICAgICAgIHJlYWN0OiBwYXRoLnJlc29sdmUoXCIuL25vZGVfbW9kdWxlcy9yZWFjdFwiKSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfTtcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFzVCxTQUFTLGNBQWMsZUFBNEM7QUFDelgsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sbUJBQW1CO0FBQzFCLE9BQU8sWUFBWTtBQUNuQixPQUFPLFVBQVU7QUFFakIsSUFBTyxzQkFBUSxhQUFhLENBQUMsRUFBRSxLQUFLLE1BQU07QUFJeEMsUUFBTSxnQkFBK0I7QUFBQSxJQUNuQyxPQUFPO0FBQUEsTUFDTCxRQUFRO0FBQUEsUUFDTixRQUFRLFFBQVEsSUFBSTtBQUFBLFFBQ3BCLGNBQWM7QUFBQSxRQUNkLFNBQVMsQ0FBQ0EsVUFBU0EsTUFBSyxRQUFRLFVBQVUsRUFBRTtBQUFBLE1BQzlDO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFLQSxRQUFNLGVBQTZCO0FBQUEsSUFDakMsUUFBUTtBQUFBLElBQ1IsV0FBVztBQUFBLElBQ1gsaUJBQWlCO0FBQUEsTUFDZixTQUFTLENBQUM7QUFBQSxJQUNaO0FBQUEsRUFDRjtBQUtBLE1BQUksU0FBUyxjQUFjO0FBQ3pCLFlBQVEsTUFBTTtBQUFBLE1BQ1osR0FBRyxRQUFRO0FBQUEsTUFDWCxHQUFHLFFBQVEsTUFBTSxRQUFRLElBQUksQ0FBQztBQUFBLElBQ2hDO0FBRUEsV0FBTyxPQUFPLGVBQWU7QUFBQSxNQUMzQixNQUFNO0FBQUEsTUFDTixNQUFNO0FBQUEsSUFDUixDQUFDO0FBRUQsV0FBTyxPQUFPLGNBQWM7QUFBQSxNQUMxQixXQUFXO0FBQUEsTUFDWCxVQUFVO0FBQUEsSUFDWixDQUFDO0FBQUEsRUFDSDtBQUtBLE1BQUksU0FBUyxlQUFlO0FBQzFCLFdBQU8sT0FBTyxlQUFlO0FBQUEsTUFDM0IsTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLElBQ1IsQ0FBQztBQUVELFdBQU8sT0FBTyxjQUFjO0FBQUEsTUFDMUIsV0FBVztBQUFBLElBQ2IsQ0FBQztBQUFBLEVBQ0g7QUFFQSxTQUFPO0FBQUEsSUFDTCxTQUFTO0FBQUEsTUFDUCxjQUFjO0FBQUEsTUFDZCxNQUFNO0FBQUEsUUFDSixpQkFBaUI7QUFBQSxRQUNqQixPQUFPO0FBQUEsVUFDTCxTQUFTLENBQUUsdUJBQXdCO0FBQUEsUUFDckM7QUFBQSxNQUNGLENBQUM7QUFBQSxNQUNELE9BQU87QUFBQSxJQUNUO0FBQUEsSUFDQSxjQUFjO0FBQUEsTUFDWixVQUFVO0FBQUEsSUFDWjtBQUFBLElBRUEsTUFBTTtBQUFBLElBQ04sV0FBVztBQUFBLElBRVgsUUFBUTtBQUFBLElBQ1IsT0FBTztBQUFBLElBQ1AsU0FBUztBQUFBLE1BQ1AsTUFBTTtBQUFBLElBQ1I7QUFBQSxJQUVBLFNBQVM7QUFBQSxNQUNQLE9BQU87QUFBQSxRQUNMLE9BQU8sS0FBSyxRQUFRLHNCQUFzQjtBQUFBLE1BQzVDO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogWyJwYXRoIl0KfQo=
