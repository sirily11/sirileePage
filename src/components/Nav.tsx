import React from "react";
import { Menu } from "antd";
import { PageRoute, routes } from "../settings/routes";
import { useLocation, useHistory, useRouteMatch } from "react-router";
import { Layout } from "antd";

const { Header } = Layout;

export default function Navbar() {
  const location = useLocation();
  const history = useHistory();
  const [selected, setSelected] = React.useState<string>("/");

  React.useEffect(() => {
    let selectedRoute = routes.find(
      (r) => location.pathname.includes(r.navPath) && r.navPath !== "/"
    );
    if (selectedRoute) {
      setSelected(selectedRoute.path ?? "");
    } else if (location.pathname === "/") {
      setSelected("/");
    }
  }, [location]);

  return (
    <Header
      style={{
        // backgroundColor: "white",
        position: "sticky",
        top: 0,
        zIndex: 1200,
      }}
    >
      <Menu mode="horizontal" selectedKeys={[selected]} theme="dark">
        {routes
          .filter((r) => r.showInMenu)
          .map((r, i) => (
            <Menu.Item
              key={r.path}
              onClick={() => {
                history.push(r.navPath);
              }}
            >
              {r.title}
            </Menu.Item>
          ))}
      </Menu>
    </Header>
  );
}
