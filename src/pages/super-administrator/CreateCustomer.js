import { Link as RouterLink } from "react-router-dom";
import moment from "moment";
// material
import { Box, Button, Container, Link, Typography } from "@mui/material";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
// components
import Page from "../../components/Page";
import CustomerForm from "../../components/customers/CustomerForm";
// routes
import { PATH_DASHBOARD } from "../../routes/paths";
// redux
import { useDispatch } from "../../redux/store";
import { postCustomer } from "../../redux/slices/customer";

// ----------------------------------------------------------------------

export default function CreateCustomer() {
  const dispatch = useDispatch();

  const createCustomer = async (values) => {
    let body = {
      nombre: values.name,
      direccion: values.address === "" ? null : values.address,
      rutFacturacion: values.billingDNI === "" ? null : values.billingDNI,
      empresa: values.company === "" ? null : values.company,
      fechaBeneficio: values.benefitDate === "" ? null : moment(values.benefitDate).format("DD-MM-YYYY"),
      email: values.email === "" ? null : values.email,
      telefono: "+" + values.phone,
      notas: values.notes === "" ? null : values.notes,
    };
    await dispatch(postCustomer(body));
  };

  return (
    <Page title="Crear clientes | Okima">
      <Box py={3} bgcolor="#ffffff" mb={2}>
        <Container maxWidth="xl">
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h4">Crear cliente</Typography>
          </Box>
          <Link
            component={RouterLink}
            variant="button"
            to={PATH_DASHBOARD.general.customers}
          >
            <Button
              type="button"
              variant="text"
              startIcon={<KeyboardReturnIcon />}
            >
              Volver
            </Button>
          </Link>
        </Container>
      </Box>
      <Container maxWidth="xl">
        <CustomerForm submitForm={createCustomer} />
      </Container>
    </Page>
  );
}
