import NavMenuContainer from "../NavMenuContainer/NavMenuContainer";
import NavMenuItem from "../NavMenuItem/NavMenuItem";

import { ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const NavRightSide = () => (
  <NavMenuContainer right={true}>
    <NavMenuItem
      icon={<ProfileIcon type="secondary" />}
      text="Личный кабинет"
    />
  </NavMenuContainer>
);

export default NavRightSide;
