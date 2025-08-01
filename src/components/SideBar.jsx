import { sidebar } from "./SideBar.module.css";
import Logo from "./Logo";
import AppNav from "./AppNav";
import Footer from "./Footer";

import { Outlet } from "react-router-dom";

function SideBar() {
  return (
    <div className={sidebar}>
      <Logo />
      <AppNav />
      <Outlet />
      <Footer />
    </div>
  );
}

export default SideBar;
