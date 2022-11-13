import { useCallback } from "react";
import NavMenuContainer from "../NavMenuContainer/NavMenuContainer";
import NavMenuItem from "../NavMenuItem/NavMenuItem";
import { ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useLocation, matchPath } from "react-router-dom";
import { ROUTE_PROFILE } from "../../utils/routes";

const NavRightSide = () => {
  const { pathname } = useLocation();
  const getIconType = useCallback(
    (path: string) =>
      matchPath(
        {
          path,
          end: false,
        },
        pathname
      )
        ? "primary"
        : "secondary",
    [pathname]
  );
  return (
    <NavMenuContainer right={true}>
      <NavMenuItem
        to={ROUTE_PROFILE}
        icon={<ProfileIcon type={getIconType(ROUTE_PROFILE)} />}
        text="Личный кабинет"
      />
    </NavMenuContainer>
  );
};

export default NavRightSide;
