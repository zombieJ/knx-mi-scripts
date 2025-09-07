import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", component: "index" },
  ],
  npmClient: "cnpm",
  base: "/knx_mi_scripts/",
  publicPath: "/knx_mi_scripts/",
  targets: { chrome: 67 },
});
