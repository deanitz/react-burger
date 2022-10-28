import { useCallback } from "react";
import NavMenuContainer from "../NavMenuContainer/NavMenuContainer";
import NavMenuItem from "../NavMenuItem/NavMenuItem";
import { ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useLocation, matchPath } from "react-router-dom";

const NavRightSide = () => {
  const { pathname } = useLocation();
  const getIconType = useCallback(
    (path) => (matchPath(pathname, path) ? "primary" : "secondary"),
    [pathname]
  );
  return (
    <NavMenuContainer right={true}>
      <NavMenuItem
        to="/profile"
        icon={<ProfileIcon type={getIconType("/profile")} />}
        text="Личный кабинет"
      />
    </NavMenuContainer>
  );
};

export default NavRightSide;
