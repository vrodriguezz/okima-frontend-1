import { Link as RouterLink } from "react-router-dom";
// material
import { Box, Button, Container, Link, Typography } from "@mui/material";
// components
import Page from "../../components/Page";
import TableUsers from "../../components/users/TableUsers";
// routes
import { PATH_DASHBOARD } from "../../routes/paths";
// ----------------------------------------------------------------------

export default function Users() {

  return (
    <Page title="Colaboradores | Okima">
      <Box py={3} bgcolor="#ffffff" mb={2}>
        <Container maxWidth="xl">
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h4">Colaboradores</Typography>
            <Link
              component={RouterLink}
              variant="button"
              to={PATH_DASHBOARD.general.createUsers}
            >
              <Button type="button" variant="contained">
                Crear colaborador
              </Button>
            </Link>
          </Box>
        </Container>
      </Box>
      <Container maxWidth="xl">
        <TableUsers />
      </Container>
    </Page>
  );
}
