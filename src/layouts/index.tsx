import { Link, Outlet } from "umi";
import styles from "./index.less";
import "antd/dist/reset.css";
import { App } from "antd";

export default function Layout() {
  return (
    <App
      style={{
        padding: 32,
      }}
    >
      <Outlet />
    </App>
  );
}
