import { useCallback } from "react";
import NavMenuContainer from "../NavMenuContainer/NavMenuContainer";
import NavMenuItem from "../NavMenuItem/NavMenuItem";
import {
  BurgerIcon,
  ListIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useLocation, matchPath } from "react-router-dom";

const NavLeftSide = () => {
  const { pathname } = useLocation();
  const getIconType = useCallback(
    (path) => (matchPath(pathname, path) ? "primary" : "secondary"),
    [pathname]
  );
  return (
    <NavMenuContainer>
      <NavMenuItem
        icon={<BurgerIcon type={getIconType("/")} />}
        text="Конструктор"
        to="/"
      />
      <NavMenuItem
        icon={<ListIcon type={getIconType("/orders-flow")} />}
        text="Лента заказов"
        to="/orders-flow"
      />
    </NavMenuContainer>
  );
};

export default NavLeftSide;
