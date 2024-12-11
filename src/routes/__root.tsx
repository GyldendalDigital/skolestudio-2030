import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Container, ThemeProvider } from "@mui/material";
import { theme } from "../theme";
import globalStyles from "./global.module.css";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Container maxWidth="xl">
          <Outlet />
        </Container>
      </ThemeProvider>
      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
}
