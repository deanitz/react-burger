import NavMenuContainer from "../NavMenuContainer/NavMenuContainer";
import NavMenuItem from "../NavMenuItem/NavMenuItem";

import {
  BurgerIcon,
  ListIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

const NavLeftSide = () => (
  <NavMenuContainer>
    <NavMenuItem
      icon={<BurgerIcon type="primary" />}
      text="Конструктор"
      active
    />
    <NavMenuItem icon={<ListIcon type="secondary" />} text="Лента заказов" />
  </NavMenuContainer>
);

export default NavLeftSide;
