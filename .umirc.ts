import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", component: "index" },
  ],
  npmClient: "cnpm",
  base: "/knx-mi-scripts/",
  publicPath: "/knx-mi-scripts/",
  targets: { chrome: 67 },
});
