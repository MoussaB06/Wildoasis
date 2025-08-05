// import AppNav from "../components/AppNav";
import SideBar from "../components/SideBar";
import Map from "../components/Map";
import { app } from "./AppLayout.module.css";
import User from "../components/User";

function AppLayout() {
  return (
    <div className={app}>
      <User />
      <SideBar />
      <Map />
    </div>
  );
}

export default AppLayout;
