// vite.config.ts
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///C:/Users/yugal/OneDrive/Documents/GitHub/palette-share/paletteshare.client/node_modules/vite/dist/node/index.js";
import plugin from "file:///C:/Users/yugal/OneDrive/Documents/GitHub/palette-share/paletteshare.client/node_modules/@vitejs/plugin-react/dist/index.mjs";
import fs from "fs";
import path from "path";
import child_process from "child_process";
import { env } from "process";
var __vite_injected_original_import_meta_url = "file:///C:/Users/yugal/OneDrive/Documents/GitHub/palette-share/paletteshare.client/vite.config.ts";
var baseFolder = env.APPDATA !== void 0 && env.APPDATA !== "" ? `${env.APPDATA}/ASP.NET/https` : `${env.HOME}/.aspnet/https`;
var certificateName = "paletteshare.client";
var certFilePath = path.join(baseFolder, `${certificateName}.pem`);
var keyFilePath = path.join(baseFolder, `${certificateName}.key`);
if (!fs.existsSync(certFilePath) || !fs.existsSync(keyFilePath)) {
  if (0 !== child_process.spawnSync(
    "dotnet",
    [
      "dev-certs",
      "https",
      "--export-path",
      certFilePath,
      "--format",
      "Pem",
      "--no-password"
    ],
    { stdio: "inherit" }
  ).status) {
    throw new Error("Could not create certificate.");
  }
}
var target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` : env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(";")[0] : "https://localhost:7009";
var vite_config_default = defineConfig({
  plugins: [plugin()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/_mantine";`
      }
    }
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  },
  server: {
    proxy: {
      "^/api/posts/getposts": {
        target,
        secure: false
      },
      "^/api/posts/getpostsbyusername": {
        target,
        secure: false
      },
      "^/api/posts/createpost": {
        target,
        secure: false
      },
      "^/api/posts/getpost": {
        target,
        secure: false
      },
      "^/api/posts/updatepost": {
        target,
        secure: false
      },
      "^/api/posts/deletepost": {
        target,
        secure: false
      },
      "^/api/users/getuser": {
        target,
        secure: false
      },
      "^/api/users/getuserbyemail": {
        target,
        secure: false
      },
      "^/api/users/getuserbyusername": {
        target,
        secure: false
      },
      "^/api/users/createuser": {
        target,
        secure: false
      },
      "^/api/users/updateuser": {
        target,
        secure: false
      },
      "^/api/users/getusersbysearchterm": {
        target,
        secure: false
      },
      "^/api/posts": {
        target,
        secure: false
      }
      // "^/api/gemini": {
      //   target,
      //   secure: false,
      // },
    },
    port: 5173,
    https: {
      key: fs.readFileSync(keyFilePath),
      cert: fs.readFileSync(certFilePath)
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFx5dWdhbFxcXFxPbmVEcml2ZVxcXFxEb2N1bWVudHNcXFxcR2l0SHViXFxcXHBhbGV0dGUtc2hhcmVcXFxccGFsZXR0ZXNoYXJlLmNsaWVudFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxceXVnYWxcXFxcT25lRHJpdmVcXFxcRG9jdW1lbnRzXFxcXEdpdEh1YlxcXFxwYWxldHRlLXNoYXJlXFxcXHBhbGV0dGVzaGFyZS5jbGllbnRcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL3l1Z2FsL09uZURyaXZlL0RvY3VtZW50cy9HaXRIdWIvcGFsZXR0ZS1zaGFyZS9wYWxldHRlc2hhcmUuY2xpZW50L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSBcIm5vZGU6dXJsXCI7XHJcblxyXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xyXG5pbXBvcnQgcGx1Z2luIGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiO1xyXG5pbXBvcnQgZnMgZnJvbSBcImZzXCI7XHJcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XHJcbmltcG9ydCBjaGlsZF9wcm9jZXNzIGZyb20gXCJjaGlsZF9wcm9jZXNzXCI7XHJcbmltcG9ydCB7IGVudiB9IGZyb20gXCJwcm9jZXNzXCI7XHJcblxyXG5jb25zdCBiYXNlRm9sZGVyID1cclxuICBlbnYuQVBQREFUQSAhPT0gdW5kZWZpbmVkICYmIGVudi5BUFBEQVRBICE9PSBcIlwiXHJcbiAgICA/IGAke2Vudi5BUFBEQVRBfS9BU1AuTkVUL2h0dHBzYFxyXG4gICAgOiBgJHtlbnYuSE9NRX0vLmFzcG5ldC9odHRwc2A7XHJcblxyXG5jb25zdCBjZXJ0aWZpY2F0ZU5hbWUgPSBcInBhbGV0dGVzaGFyZS5jbGllbnRcIjtcclxuY29uc3QgY2VydEZpbGVQYXRoID0gcGF0aC5qb2luKGJhc2VGb2xkZXIsIGAke2NlcnRpZmljYXRlTmFtZX0ucGVtYCk7XHJcbmNvbnN0IGtleUZpbGVQYXRoID0gcGF0aC5qb2luKGJhc2VGb2xkZXIsIGAke2NlcnRpZmljYXRlTmFtZX0ua2V5YCk7XHJcblxyXG5pZiAoIWZzLmV4aXN0c1N5bmMoY2VydEZpbGVQYXRoKSB8fCAhZnMuZXhpc3RzU3luYyhrZXlGaWxlUGF0aCkpIHtcclxuICBpZiAoXHJcbiAgICAwICE9PVxyXG4gICAgY2hpbGRfcHJvY2Vzcy5zcGF3blN5bmMoXHJcbiAgICAgIFwiZG90bmV0XCIsXHJcbiAgICAgIFtcclxuICAgICAgICBcImRldi1jZXJ0c1wiLFxyXG4gICAgICAgIFwiaHR0cHNcIixcclxuICAgICAgICBcIi0tZXhwb3J0LXBhdGhcIixcclxuICAgICAgICBjZXJ0RmlsZVBhdGgsXHJcbiAgICAgICAgXCItLWZvcm1hdFwiLFxyXG4gICAgICAgIFwiUGVtXCIsXHJcbiAgICAgICAgXCItLW5vLXBhc3N3b3JkXCIsXHJcbiAgICAgIF0sXHJcbiAgICAgIHsgc3RkaW86IFwiaW5oZXJpdFwiIH1cclxuICAgICkuc3RhdHVzXHJcbiAgKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZCBub3QgY3JlYXRlIGNlcnRpZmljYXRlLlwiKTtcclxuICB9XHJcbn1cclxuXHJcbmNvbnN0IHRhcmdldCA9IGVudi5BU1BORVRDT1JFX0hUVFBTX1BPUlRcclxuICA/IGBodHRwczovL2xvY2FsaG9zdDoke2Vudi5BU1BORVRDT1JFX0hUVFBTX1BPUlR9YFxyXG4gIDogZW52LkFTUE5FVENPUkVfVVJMU1xyXG4gID8gZW52LkFTUE5FVENPUkVfVVJMUy5zcGxpdChcIjtcIilbMF1cclxuICA6IFwiaHR0cHM6Ly9sb2NhbGhvc3Q6NzAwOVwiO1xyXG5cclxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICBwbHVnaW5zOiBbcGx1Z2luKCldLFxyXG4gIGNzczoge1xyXG4gICAgcHJlcHJvY2Vzc29yT3B0aW9uczoge1xyXG4gICAgICBzY3NzOiB7XHJcbiAgICAgICAgYWRkaXRpb25hbERhdGE6IGBAaW1wb3J0IFwiLi9zcmMvX21hbnRpbmVcIjtgLFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICB9LFxyXG4gIHJlc29sdmU6IHtcclxuICAgIGFsaWFzOiB7XHJcbiAgICAgIFwiQFwiOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoXCIuL3NyY1wiLCBpbXBvcnQubWV0YS51cmwpKSxcclxuICAgIH0sXHJcbiAgfSxcclxuICBzZXJ2ZXI6IHtcclxuICAgIHByb3h5OiB7XHJcbiAgICAgIFwiXi9hcGkvcG9zdHMvZ2V0cG9zdHNcIjoge1xyXG4gICAgICAgIHRhcmdldCxcclxuICAgICAgICBzZWN1cmU6IGZhbHNlLFxyXG4gICAgICB9LFxyXG4gICAgICBcIl4vYXBpL3Bvc3RzL2dldHBvc3RzYnl1c2VybmFtZVwiOiB7XHJcbiAgICAgICAgdGFyZ2V0LFxyXG4gICAgICAgIHNlY3VyZTogZmFsc2UsXHJcbiAgICAgIH0sXHJcbiAgICAgIFwiXi9hcGkvcG9zdHMvY3JlYXRlcG9zdFwiOiB7XHJcbiAgICAgICAgdGFyZ2V0LFxyXG4gICAgICAgIHNlY3VyZTogZmFsc2UsXHJcbiAgICAgIH0sXHJcbiAgICAgIFwiXi9hcGkvcG9zdHMvZ2V0cG9zdFwiOiB7XHJcbiAgICAgICAgdGFyZ2V0LFxyXG4gICAgICAgIHNlY3VyZTogZmFsc2UsXHJcbiAgICAgIH0sXHJcbiAgICAgIFwiXi9hcGkvcG9zdHMvdXBkYXRlcG9zdFwiOiB7XHJcbiAgICAgICAgdGFyZ2V0LFxyXG4gICAgICAgIHNlY3VyZTogZmFsc2UsXHJcbiAgICAgIH0sXHJcbiAgICAgIFwiXi9hcGkvcG9zdHMvZGVsZXRlcG9zdFwiOiB7XHJcbiAgICAgICAgdGFyZ2V0LFxyXG4gICAgICAgIHNlY3VyZTogZmFsc2UsXHJcbiAgICAgIH0sXHJcbiAgICAgIFwiXi9hcGkvdXNlcnMvZ2V0dXNlclwiOiB7XHJcbiAgICAgICAgdGFyZ2V0LFxyXG4gICAgICAgIHNlY3VyZTogZmFsc2UsXHJcbiAgICAgIH0sXHJcbiAgICAgIFwiXi9hcGkvdXNlcnMvZ2V0dXNlcmJ5ZW1haWxcIjoge1xyXG4gICAgICAgIHRhcmdldCxcclxuICAgICAgICBzZWN1cmU6IGZhbHNlLFxyXG4gICAgICB9LFxyXG4gICAgICBcIl4vYXBpL3VzZXJzL2dldHVzZXJieXVzZXJuYW1lXCI6IHtcclxuICAgICAgICB0YXJnZXQsXHJcbiAgICAgICAgc2VjdXJlOiBmYWxzZSxcclxuICAgICAgfSxcclxuICAgICAgXCJeL2FwaS91c2Vycy9jcmVhdGV1c2VyXCI6IHtcclxuICAgICAgICB0YXJnZXQsXHJcbiAgICAgICAgc2VjdXJlOiBmYWxzZSxcclxuICAgICAgfSxcclxuICAgICAgXCJeL2FwaS91c2Vycy91cGRhdGV1c2VyXCI6IHtcclxuICAgICAgICB0YXJnZXQsXHJcbiAgICAgICAgc2VjdXJlOiBmYWxzZSxcclxuICAgICAgfSxcclxuICAgICAgXCJeL2FwaS91c2Vycy9nZXR1c2Vyc2J5c2VhcmNodGVybVwiOiB7XHJcbiAgICAgICAgdGFyZ2V0LFxyXG4gICAgICAgIHNlY3VyZTogZmFsc2UsXHJcbiAgICAgIH0sXHJcbiAgICAgIFwiXi9hcGkvcG9zdHNcIjoge1xyXG4gICAgICAgIHRhcmdldCxcclxuICAgICAgICBzZWN1cmU6IGZhbHNlLFxyXG4gICAgICB9LFxyXG4gICAgICAvLyBcIl4vYXBpL2dlbWluaVwiOiB7XHJcbiAgICAgIC8vICAgdGFyZ2V0LFxyXG4gICAgICAvLyAgIHNlY3VyZTogZmFsc2UsXHJcbiAgICAgIC8vIH0sXHJcbiAgICB9LFxyXG4gICAgcG9ydDogNTE3MyxcclxuICAgIGh0dHBzOiB7XHJcbiAgICAgIGtleTogZnMucmVhZEZpbGVTeW5jKGtleUZpbGVQYXRoKSxcclxuICAgICAgY2VydDogZnMucmVhZEZpbGVTeW5jKGNlcnRGaWxlUGF0aCksXHJcbiAgICB9LFxyXG4gIH0sXHJcbn0pO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWdhLFNBQVMsZUFBZSxXQUFXO0FBRW5jLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sWUFBWTtBQUNuQixPQUFPLFFBQVE7QUFDZixPQUFPLFVBQVU7QUFDakIsT0FBTyxtQkFBbUI7QUFDMUIsU0FBUyxXQUFXO0FBUHVQLElBQU0sMkNBQTJDO0FBUzVULElBQU0sYUFDSixJQUFJLFlBQVksVUFBYSxJQUFJLFlBQVksS0FDekMsR0FBRyxJQUFJLE9BQU8sbUJBQ2QsR0FBRyxJQUFJLElBQUk7QUFFakIsSUFBTSxrQkFBa0I7QUFDeEIsSUFBTSxlQUFlLEtBQUssS0FBSyxZQUFZLEdBQUcsZUFBZSxNQUFNO0FBQ25FLElBQU0sY0FBYyxLQUFLLEtBQUssWUFBWSxHQUFHLGVBQWUsTUFBTTtBQUVsRSxJQUFJLENBQUMsR0FBRyxXQUFXLFlBQVksS0FBSyxDQUFDLEdBQUcsV0FBVyxXQUFXLEdBQUc7QUFDL0QsTUFDRSxNQUNBLGNBQWM7QUFBQSxJQUNaO0FBQUEsSUFDQTtBQUFBLE1BQ0U7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxJQUNGO0FBQUEsSUFDQSxFQUFFLE9BQU8sVUFBVTtBQUFBLEVBQ3JCLEVBQUUsUUFDRjtBQUNBLFVBQU0sSUFBSSxNQUFNLCtCQUErQjtBQUFBLEVBQ2pEO0FBQ0Y7QUFFQSxJQUFNLFNBQVMsSUFBSSx3QkFDZixxQkFBcUIsSUFBSSxxQkFBcUIsS0FDOUMsSUFBSSxrQkFDSixJQUFJLGdCQUFnQixNQUFNLEdBQUcsRUFBRSxDQUFDLElBQ2hDO0FBR0osSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUyxDQUFDLE9BQU8sQ0FBQztBQUFBLEVBQ2xCLEtBQUs7QUFBQSxJQUNILHFCQUFxQjtBQUFBLE1BQ25CLE1BQU07QUFBQSxRQUNKLGdCQUFnQjtBQUFBLE1BQ2xCO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssY0FBYyxJQUFJLElBQUksU0FBUyx3Q0FBZSxDQUFDO0FBQUEsSUFDdEQ7QUFBQSxFQUNGO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixPQUFPO0FBQUEsTUFDTCx3QkFBd0I7QUFBQSxRQUN0QjtBQUFBLFFBQ0EsUUFBUTtBQUFBLE1BQ1Y7QUFBQSxNQUNBLGtDQUFrQztBQUFBLFFBQ2hDO0FBQUEsUUFDQSxRQUFRO0FBQUEsTUFDVjtBQUFBLE1BQ0EsMEJBQTBCO0FBQUEsUUFDeEI7QUFBQSxRQUNBLFFBQVE7QUFBQSxNQUNWO0FBQUEsTUFDQSx1QkFBdUI7QUFBQSxRQUNyQjtBQUFBLFFBQ0EsUUFBUTtBQUFBLE1BQ1Y7QUFBQSxNQUNBLDBCQUEwQjtBQUFBLFFBQ3hCO0FBQUEsUUFDQSxRQUFRO0FBQUEsTUFDVjtBQUFBLE1BQ0EsMEJBQTBCO0FBQUEsUUFDeEI7QUFBQSxRQUNBLFFBQVE7QUFBQSxNQUNWO0FBQUEsTUFDQSx1QkFBdUI7QUFBQSxRQUNyQjtBQUFBLFFBQ0EsUUFBUTtBQUFBLE1BQ1Y7QUFBQSxNQUNBLDhCQUE4QjtBQUFBLFFBQzVCO0FBQUEsUUFDQSxRQUFRO0FBQUEsTUFDVjtBQUFBLE1BQ0EsaUNBQWlDO0FBQUEsUUFDL0I7QUFBQSxRQUNBLFFBQVE7QUFBQSxNQUNWO0FBQUEsTUFDQSwwQkFBMEI7QUFBQSxRQUN4QjtBQUFBLFFBQ0EsUUFBUTtBQUFBLE1BQ1Y7QUFBQSxNQUNBLDBCQUEwQjtBQUFBLFFBQ3hCO0FBQUEsUUFDQSxRQUFRO0FBQUEsTUFDVjtBQUFBLE1BQ0Esb0NBQW9DO0FBQUEsUUFDbEM7QUFBQSxRQUNBLFFBQVE7QUFBQSxNQUNWO0FBQUEsTUFDQSxlQUFlO0FBQUEsUUFDYjtBQUFBLFFBQ0EsUUFBUTtBQUFBLE1BQ1Y7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBS0Y7QUFBQSxJQUNBLE1BQU07QUFBQSxJQUNOLE9BQU87QUFBQSxNQUNMLEtBQUssR0FBRyxhQUFhLFdBQVc7QUFBQSxNQUNoQyxNQUFNLEdBQUcsYUFBYSxZQUFZO0FBQUEsSUFDcEM7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
