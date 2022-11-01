import { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import PageLayout from "../components/PageLayout/PageLayout";
import { logout, resetLogout } from "../services/slices/authSlice";
import {
  ROUTE_LOGIN,
  ROUTE_PROFILE,
  ROUTE_PROFILE_ORDERS,
} from "../utils/routes";
import { useLocation, matchPath } from "react-router-dom";

import styles from "./Profile.module.css";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLogoutSuccess, isLogoutLoading, isLogoutError } = useSelector(
    ({ auth }) => ({
      isLogoutSuccess: auth.logout.success,
      isLogoutLoading: auth.logout.loading,
      isLogoutError: auth.logout.error,
    })
  );

  const handleLogout = useCallback(
    (e) => {
      e.preventDefault();

      if (isLogoutLoading) {
        return;
      }

      dispatch(logout());
    },
    [dispatch, isLogoutLoading]
  );

  useEffect(() => {
    if (isLogoutSuccess || isLogoutError) {
      dispatch(resetLogout());
      navigate(ROUTE_LOGIN, { replace: false });
    }
  }, [dispatch, navigate, isLogoutSuccess, isLogoutError]);

  const { pathname } = useLocation();
  const isProfileRoot = useMemo(
    () => matchPath(pathname, ROUTE_PROFILE),
    [pathname]
  );

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
                <NavLink
                  className={`text text_type_main-medium ${styles.navLink}`}
                  onClick={handleLogout}
                >
                  Выход
                </NavLink>
              </li>
            </ul>
          </nav>
          {isProfileRoot && (
            <span
              className={`mt-20 text text_type_main-default ${styles.infoText}`}
            >
              В этом разделе вы можете изменить свои персональные данные
            </span>
          )}
        </div>
        <Outlet />
      </section>
    </PageLayout>
  );
};

export default Profile;
