import { useCallback } from "react";
import NavMenuContainer from "../NavMenuContainer/NavMenuContainer";
import NavMenuItem from "../NavMenuItem/NavMenuItem";
import {
  BurgerIcon,
  ListIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useLocation, matchPath } from "react-router-dom";
import { ROUTE_ORDERS_FLOW, ROUTE_ROOT } from "../../utils/routes";

const NavLeftSide = () => {
  const { pathname } = useLocation();
  const getIconType = useCallback(
    (path) => (matchPath(pathname, path) ? "primary" : "secondary"),
    [pathname]
  );
  return (
    <NavMenuContainer>
      <NavMenuItem
        icon={<BurgerIcon type={getIconType(ROUTE_ROOT)} />}
        text="Конструктор"
        to={ROUTE_ROOT}
        end
      />
      <NavMenuItem
        icon={<ListIcon type={getIconType(ROUTE_ORDERS_FLOW)} />}
        text="Лента заказов"
        to={ROUTE_ORDERS_FLOW}
        end
      />
    </NavMenuContainer>
  );
};

export default NavLeftSide;
