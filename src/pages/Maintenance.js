import { Link as RouterLink } from "react-router-dom";
// material
import { styled } from "@mui/material/styles";
import { Button, Typography, Container } from "@mui/material";
// components
import Page from "../components/Page";
//
import { MaintenanceIllustration } from "../assets";

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  minHeight: "100%",
  display: "flex",
  alignItems: "center",
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
}));

// ----------------------------------------------------------------------

export default function Maintenance() {
  return (
    <RootStyle title="Mantenimiento | Okima">
      <Container sx={{ textAlign: "center" }}>
        <Typography variant="h3" paragraph>
          Sitio web actualmente en mantenimiento
        </Typography>
        <Typography sx={{ color: "text.secondary" }}>
          Actualmente estamos trabajando en esta página
        </Typography>

        <MaintenanceIllustration sx={{ my: 10, height: 240 }} />

        <Button variant="contained" size="large" component={RouterLink} to="/">
          Volver
        </Button>
      </Container>
    </RootStyle>
  );
}
