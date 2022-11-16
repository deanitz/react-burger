import { useCallback, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import PageLayout from "../../components/PageLayout/PageLayout";
import { logout, resetLogout } from "../../services/slices/authSlice";
import { ROUTE_PROFILE, ROUTE_PROFILE_ORDERS } from "../../utils/routes";
import { useAppDispatch, useAppSelector } from "../../utils/store";

import styles from "./Profile.module.css";

const Profile = () => {
  const dispatch = useAppDispatch();

  const { isLogoutLoading } = useAppSelector(({ auth }) => ({
    isLogoutLoading: auth.logout.loading,
  }));

  const { infoText } = useAppSelector(({ profileText }) => ({
    infoText: profileText.info,
  }));

  const handleLogout = useCallback(() => {
    if (isLogoutLoading) {
      return;
    }

    dispatch(logout());
  }, [dispatch, isLogoutLoading]);

  useEffect(() => {
    return () => {
      dispatch(resetLogout());
    };
  }, [dispatch]);

  return (
    <PageLayout>
      <section className={styles.profile}>
        <div className={`ml-5 mt-6 mr-15 ${styles.leftColumn}`}>
          <nav>
            <ul className={styles.menuContainer}>
              <li className="pt-2 pb-2">
                <NavLink
                  to={ROUTE_PROFILE}
                  end
                  className={({ isActive }) =>
                    `text text_type_main-medium ${styles.navLink} ${
                      isActive ? styles.navLinkActive : ""
                    }`
                  }
                >
                  Профиль
                </NavLink>
              </li>
              <li className="pt-2 pb-2">
                <NavLink
                  to={ROUTE_PROFILE_ORDERS}
                  end
                  className={({ isActive }) =>
                    `text text_type_main-medium ${styles.navLink} ${
                      isActive ? styles.navLinkActive : ""
                    }`
                  }
                >
                  История заказов
                </NavLink>
              </li>
              <li className="pt-2 pb-2">
                <span
                  className={`text text_type_main-medium ${styles.navLink} ${styles.logout}`}
                  onClick={handleLogout}
                >
                  Выход
                </span>
              </li>
            </ul>
          </nav>
          <span
            className={`mt-20 text text_type_main-default ${styles.infoText}`}
          >
            {infoText}
          </span>
        </div>
        <Outlet />
      </section>
    </PageLayout>
  );
};

export default Profile;
