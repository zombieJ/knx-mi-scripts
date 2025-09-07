import { Link, Outlet } from "umi";
import styles from "./index.less";
import "antd/dist/reset.css";

export default function Layout() {
  return (
    <div
      style={{
        padding: 32,
      }}
    >
      {/* <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/docs">Docs</Link>
        </li>
        <li>
          <a href="https://github.com/umijs/umi">Github</a>
        </li>
      </ul> */}
      <Outlet />
    </div>
  );
}
