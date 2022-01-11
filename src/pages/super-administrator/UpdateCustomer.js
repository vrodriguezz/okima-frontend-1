import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import moment from "moment";
// material
import { Box, Button, Container, Link, Typography } from "@mui/material";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
// components
import Page from "../../components/Page";
// routes
import { PATH_DASHBOARD } from "../../routes/paths";
import { useParams } from "react-router-dom";
// redux
import { useDispatch } from "../../redux/store";
// utils
import axios from "../../utils/axios";
import alerts from "../../utils/alerts";
import CustomerForm from "../../components/customers/CustomerForm";
import { putCustomer } from "../../redux/slices/customer";

// ----------------------------------------------------------------------

export default function UpdateUser() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    getCustomers();
  }, []);

  const getCustomers = async () => {
    try {
      const response = await axios.get("/api/clientes/" + id);
      let cliente = response.data;
      console.log(cliente);
      setCustomer({
        email: cliente.email,
        name: cliente.nombre,
        address: cliente.direccion,
        billingDNI: cliente.rutFacturacion,
        company: cliente.empresa,
        notes: cliente.notas,
        benefitDate: new Date(cliente.fechaBeneficio),
        phone: cliente.telefono,
      });
      console.log("formatear fecha", new Date(cliente.fechaBeneficio))
    } catch (error) {
      alerts.handleAlert(
        "Ops...",
        "Ha ocurrido un error al obtener la información del usuario solicitado, intente nuevamente más tarde",
        "Ok",
        "error",
        () => (window.location.href = "/dashboard/clientes")
      );
    }
  };

  const editCustomer = async (values) => {
    let body = {
      idCliente: parseInt(id),
      nombre: values.name,
      direccion: values.address === "" ? null : values.address,
      rutFacturacion: values.billingDNI === "" ? null : values.billingDNI,
      empresa: values.company === "" ? null : values.company,
      fechaBeneficio: values.benefitDate === "" ? null : moment(values.benefitDate).format("DD-MM-YYYY"),
      email: values.email === "" ? null : values.email,
      telefono: "+" + values.phone,
      notas: values.notes === "" ? null : values.notes,
    };
    await dispatch(putCustomer(body));
  };

  return (
    <Page title="Editar cliente | Okima">
      <Box py={3} bgcolor="#ffffff" mb={2}>
        <Container maxWidth="xl">
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h4">Editar cliente</Typography>
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
        <CustomerForm submitForm={editCustomer} user={customer} />
      </Container>
    </Page>
  );
}
