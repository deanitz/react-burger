import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink } from "react-router-dom";
import { ROUTE_ROOT } from "../../utils/routes";

const NavLogo = () => (
  <NavLink to={ROUTE_ROOT} end>
    <Logo />
  </NavLink>
);

export default NavLogo;
