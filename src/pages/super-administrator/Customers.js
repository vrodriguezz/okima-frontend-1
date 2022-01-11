import { Link as RouterLink } from "react-router-dom";
// material
import { Box, Button, Container, Link, Typography } from "@mui/material";
// components
import Page from "../../components/Page";
import TableCustomers from "../../components/customers/TableCustomers";
// routes
import { PATH_DASHBOARD } from "../../routes/paths";
// ----------------------------------------------------------------------

export default function Customers() {

  return (
    <Page title="Clientes | Okima">
      <Box py={3} bgcolor="#ffffff" mb={2}>
        <Container maxWidth="xl">
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h4">Clientes</Typography>
            <Link
              component={RouterLink}
              variant="button"
              to={PATH_DASHBOARD.general.createCustomers}
            >
              <Button type="button" variant="contained">
                Crear cliente
              </Button>
            </Link>
          </Box>
        </Container>
      </Box>
      <Container maxWidth="xl">
        <TableCustomers />
      </Container>
    </Page>
  );
}
