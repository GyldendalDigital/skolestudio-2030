import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Container, ThemeProvider } from "@mui/material";
import { theme } from "../theme";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Container maxWidth="xl" disableGutters sx={{paddingInline: "0.5rem"}}>
          <Outlet />
        </Container>
      </ThemeProvider>
      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
}
