import AppHeader from "../AppHeader/AppHeader";
import { Outlet } from "react-router-dom";

const AppLayout = () => (
  <>
    <AppHeader />
    <Outlet />
  </>
);

export default AppLayout;
