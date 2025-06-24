// Chakra imports
import { ChakraProvider, Portal, useDisclosure } from "@chakra-ui/react";
import Configurator from "components/Configurator/Configurator";
import Footer from "components/Footer/Footer.js";
// Layout components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar";
import { useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import routes from "routes.js";
// Custom Chakra theme
import theme from "theme/theme.js";
import FixedPlugin from "../components/FixedPlugin/FixedPlugin";
// Custom components
import MainPanel from "../components/Layout/MainPanel";
import PanelContainer from "../components/Layout/PanelContainer";
import PanelContent from "../components/Layout/PanelContent";

export default function Dashboard(props) {
  const { ...rest } = props;

  // States and functions
  const [sidebarVariant, setSidebarVariant] = useState("transparent");
  const [fixed, setFixed] = useState(false);

  // Sidebar toggle for Configurator
  const { isOpen, onOpen, onClose } = useDisclosure();

  const getRoute = () => window.location.pathname !== "/admin/full-screen-maps";

  const getActiveRoute = (routes) => {
    let activeRoute = "Default Brand Text";
    for (const route of routes) {
      if (route.collapse) {
        const collapseActiveRoute = getActiveRoute(route.views);
        if (collapseActiveRoute !== activeRoute) return collapseActiveRoute;
      } else if (route.category) {
        const categoryActiveRoute = getActiveRoute(route.views);
        if (categoryActiveRoute !== activeRoute) return categoryActiveRoute;
      } else {
        if (window.location.href.includes(route.layout + route.path)) return route.name;
      }
    }
    return activeRoute;
  };

  const getActiveNavbar = (routes) => {
    let activeNavbar = false;
    for (const route of routes) {
      if (route.category) {
        const categoryActiveNavbar = getActiveNavbar(route.views);
        if (categoryActiveNavbar !== activeNavbar) return categoryActiveNavbar;
      } else {
        if (window.location.href.includes(route.layout + route.path)) {
          if (route.secondaryNavbar) return route.secondaryNavbar;
        }
      }
    }
    return activeNavbar;
  };

  const getRoutes = (routes) =>
    routes.map((prop, key) => {
      if (prop.collapse) return getRoutes(prop.views);
      if (prop.category === "account") return getRoutes(prop.views);
      if (prop.layout === "/admin") return <Route path={prop.layout + prop.path} component={prop.component} key={key} />;
      return null;
    });

  document.documentElement.dir = "ltr";

  return (
    <ChakraProvider theme={theme} resetCss={false}>
      {/* Sidebar */}
      <Sidebar
        routes={routes}
        logoText={"PURITY UI DASHBOARD"}
        display="none"
        sidebarVariant={sidebarVariant}
        {...rest}
      />

      {/* Main Panel */}
      <MainPanel
        w={{
          base: "100%",
          xl: "calc(100% - 275px)",
        }}
      >
        {/* Navbar */}
        <Portal>
          <AdminNavbar
            onOpen={onOpen} // Open Configurator on click
            logoText={"PURITY UI DASHBOARD"}
            brandText={getActiveRoute(routes)}
            secondary={getActiveNavbar(routes)}
            fixed={fixed}
            {...rest}
          />
        </Portal>

        {/* Route Panels */}
        {getRoute() && (
          <PanelContent>
            <PanelContainer>
              <Switch>
                {getRoutes(routes)}
                <Redirect from="/admin" to="/admin/dashboard" />
              </Switch>
            </PanelContainer>
          </PanelContent>
        )}

        {/* Footer */}
        <Footer />

        {/* Fixed Plugin Button (Triggers Configurator Sidebar) */}
        <Portal>
        <FixedPlugin
  isOpen={isOpen} // Open sidebar on click
  onOpen={onOpen} // Triggers sidebar
  onClose={onClose} // Closes sidebar
  secondary={getActiveNavbar(routes)}
  fixed={fixed}
  isChecked={fixed}
  onSwitch={(value) => setFixed(value)}
  onOpaque={() => setSidebarVariant("opaque")}
  onTransparent={() => setSidebarVariant("transparent")}
/>
        </Portal>

        {/* Configurator Sidebar */}
        <Configurator
          secondary={getActiveNavbar(routes)}
          isOpen={isOpen} // Open Drawer when clicking FixedPlugin button
          onClose={onClose} // Close Drawer when user dismisses it
          isChecked={fixed} // Fixed Navbar toggle state
          onSwitch={(value) => setFixed(value)}
          onOpaque={() => setSidebarVariant("opaque")}
          onTransparent={() => setSidebarVariant("transparent")}
        />
      </MainPanel>
    </ChakraProvider>
  );
}