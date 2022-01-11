// material
import { styled } from "@mui/material/styles";
import {
  Box,
  Card,
  Stack,
  Container,
  Typography,
  Button,
} from "@mui/material";
// hooks
import useAuth from "../../hooks/useAuth";
// layouts
import AuthLayout from "../../layouts/AuthLayout";
// components
import Page from "../../components/Page";
import { MHidden } from "../../components/@material-extend";
import { LoginForm } from "../../components/authentication/login";

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: "100%",
  maxWidth: 464,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  display: "flex",
  minHeight: "100vh",
  flexDirection: "column",
  justifyContent: "center",
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Login() {
  const { method, login } = useAuth();

  const handleLoginAuth0 = async () => {
    try {
      await login();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <RootStyle title="Iniciar sesión | Okima">
      <MHidden width="smUp">
        <AuthLayout></AuthLayout>
      </MHidden>

      <MHidden width="mdDown">
        <SectionStyle>
          <img
            src="/static/brand/logo_a_okima_cyan.png"
            alt="login"
            style={{ maxWidth: 300, display: "block", margin: "0 auto" }}
          />
          <Typography variant="h3" sx={{ px: 5, mt: 5, mb: 5 }} align="center">
            Hola, bienvenido de vuelta
          </Typography>
        </SectionStyle>
      </MHidden>

      <Container maxWidth="sm">
        <ContentStyle>
          <Stack direction="row" alignItems="center" sx={{ mb: 3 }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h4" gutterBottom>
                Iniciar sesión
              </Typography>
              <Typography sx={{ color: "text.secondary" }}>
                Ingresa tus datos
              </Typography>
            </Box>
          </Stack>

          {method !== "auth0" ? (
            <LoginForm />
          ) : (
            <Button
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              onClick={handleLoginAuth0}
            >
              Login
            </Button>
          )}
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
