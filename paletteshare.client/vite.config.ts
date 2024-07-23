import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import plugin from "@vitejs/plugin-react";
import fs from "fs";
import path from "path";
import child_process from "child_process";
import { env } from "process";

const baseFolder =
  env.APPDATA !== undefined && env.APPDATA !== ""
    ? `${env.APPDATA}/ASP.NET/https`
    : `${env.HOME}/.aspnet/https`;

const certificateName = "paletteshare.client";
const certFilePath = path.join(baseFolder, `${certificateName}.pem`);
const keyFilePath = path.join(baseFolder, `${certificateName}.key`);

if (!fs.existsSync(certFilePath) || !fs.existsSync(keyFilePath)) {
  if (
    0 !==
    child_process.spawnSync(
      "dotnet",
      [
        "dev-certs",
        "https",
        "--export-path",
        certFilePath,
        "--format",
        "Pem",
        "--no-password",
      ],
      { stdio: "inherit" }
    ).status
  ) {
    throw new Error("Could not create certificate.");
  }
}

const target = env.ASPNETCORE_HTTPS_PORT
  ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}`
  : env.ASPNETCORE_URLS
  ? env.ASPNETCORE_URLS.split(";")[0]
  : "https://localhost:7009";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [plugin()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/_mantine";`,
      },
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    proxy: {
      "^/api/posts/getposts": {
        target,
        secure: false,
      },
      "^/api/posts/getpostsbyusername": {
        target,
        secure: false,
      },
      "^/api/posts/createpost": {
        target,
        secure: false,
      },
      "^/api/posts/getpost": {
        target,
        secure: false,
      },
      "^/api/posts/updatepost": {
        target,
        secure: false,
      },
      "^/api/posts/deletepost": {
        target,
        secure: false,
      },
      "^/api/users/getuser": {
        target,
        secure: false,
      },
      "^/api/users/getuserbyemail": {
        target,
        secure: false,
      },
      "^/api/users/getuserbyusername": {
        target,
        secure: false,
      },
      "^/api/users/createuser": {
        target,
        secure: false,
      },
      "^/api/users/updateuser": {
        target,
        secure: false,
      },
    },
    port: 5173,
    https: {
      key: fs.readFileSync(keyFilePath),
      cert: fs.readFileSync(certFilePath),
    },
  },
});
