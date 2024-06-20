import React from "react";
import classNames from "classnames";
import { ScrollBar } from "components/ui";
import PropTypes from "prop-types";
import {
  SIDE_NAV_WIDTH,
  SIDE_NAV_COLLAPSED_WIDTH,
  NAV_MODE_DARK,
  NAV_MODE_THEMED,
  NAV_MODE_TRANSPARENT,
  SIDE_NAV_CONTENT_GUTTER,
  LOGO_X_GUTTER,
} from "constants/theme.constant";
import Logo from "components/template/Logo";
import navigationConfig from "configs/navigation.config";
import VerticalMenuContent from "components/template/VerticalMenuContent";
import useResponsive from "utils/hooks/useResponsive";
import { useSelector } from "react-redux";

const sideNavStyle = {
  width: SIDE_NAV_WIDTH,
  minWidth: SIDE_NAV_WIDTH,
};

const sideNavCollapseStyle = {
  width: SIDE_NAV_COLLAPSED_WIDTH,
  minWidth: SIDE_NAV_COLLAPSED_WIDTH,
};

const SideNav = () => {
 
  const permissions = sessionStorage.getItem("permissions");
  const permissionKeys = JSON.parse(permissions)?.map(
    (permission) => permission
  );
  permissionKeys?.push({ target: "home" });

  const hasPermission = (key) => {
    const keyAfterDot = getKeyAfterDot(key);
    return permissionKeys?.some((permission) => permission.target === keyAfterDot);
  };

  const getKeyAfterDot = (key) => {
    const dotIndex = key.lastIndexOf(".");
    return dotIndex !== -1 ? key.substring(dotIndex + 1) : key;
  };

  const filterRoutes = (routes) => {
    return routes.filter((route) => {
      if (route.subMenu && route.subMenu.length > 0) {
        route.subMenu = filterRoutes(route.subMenu); // Recursively filter submenus
        return route.subMenu.length > 0;
      } else {
        return hasPermission(route.key);
      }
    });
  };

  const filteredRoutes = filterRoutes(navigationConfig[0].subMenu);

  navigationConfig[0].subMenu = filteredRoutes;
  const themeColor = useSelector((state) => state.theme.themeColor);
  const primaryColorLevel = useSelector(
    (state) => state.theme.primaryColorLevel
  );
  const navMode = useSelector((state) => state.theme.navMode);
  const mode = useSelector((state) => state.theme.mode);
  const direction = useSelector((state) => state.theme.direction);
  const currentRouteKey = useSelector(
    (state) => state.base.common.currentRouteKey
  );
  const sideNavCollapse = useSelector(
    (state) => state.theme.layout.sideNavCollapse
  );
  const userAuthority = useSelector((state) => state.auth.user.authority);

  const { larger } = useResponsive();

  const sideNavColor = () => {
    if (navMode === NAV_MODE_THEMED) {
      return `bg-${themeColor}-${primaryColorLevel} side-nav-${navMode}`;
    }
    return `side-nav-${navMode}`;
  };

  const logoMode = () => {
    if (navMode === NAV_MODE_THEMED) {
      return NAV_MODE_DARK;
    }

    if (navMode === NAV_MODE_TRANSPARENT) {
      return mode;
    }

    return navMode;
  };

  const menuContent = (
    <VerticalMenuContent
      navMode={navMode}
      collapsed={sideNavCollapse}
      navigationTree={navigationConfig}
      routeKey={currentRouteKey}
      userAuthority={userAuthority}
    />
  );

  return (
    <>
      {larger.md && (
        <div
          style={sideNavCollapse ? sideNavCollapseStyle : sideNavStyle}
          className={classNames(
            "side-nav",
            sideNavColor(),
            !sideNavCollapse && "side-nav-expand"
          )}
        >
          <div className="side-nav-header my-2">
            <Logo
              type={sideNavCollapse ? "streamline" : "full"}
              gutter={sideNavCollapse ? SIDE_NAV_CONTENT_GUTTER : LOGO_X_GUTTER}
            />
          </div>
          {sideNavCollapse ? (
            <>{menuContent}</>
          ) : (
            <div className="side-nav-content">
              <ScrollBar autoHide direction={direction}>
                <>{menuContent}</>

                <span className="p-3">
                  version: {process.env.REACT_APP_VERSION}
                </span>
              </ScrollBar>
            </div>
          )}
        </div>
      )}
    </>
  );
};

SideNav.propTypes = {
  themed: PropTypes.bool,
  darkMode: PropTypes.bool,
  themeColor: PropTypes.string,
};

SideNav.defaultProps = {
  themed: false,
  darkMode: false,
  themeColor: "",
};

export default SideNav;
