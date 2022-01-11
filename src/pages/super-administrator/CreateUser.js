import { Link as RouterLink } from "react-router-dom";
// material
import { Box, Button, Container, Link, Typography } from "@mui/material";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
// components
import Page from "../../components/Page";
import UserForm from "../../components/users/UserForm";
// routes
import { PATH_DASHBOARD } from "../../routes/paths";
// redux
import { useDispatch } from "../../redux/store";
import { postUser } from "../../redux/slices/user";

// ----------------------------------------------------------------------

export default function CreateUser() {
  const dispatch = useDispatch();

  const createUser = async (values) => {
    let body = {
      nombres: values.name,
      apellidoPaterno: values.surname,
      apellidoMaterno:
        values.motherSurname === "" ? null : values.motherSurname,
      email: values.email,
      clave: values.password,
      claveConfirmacion: values.confirmPassword,
      idTipoUsuario: values.rol,
    };
    await dispatch(postUser(body));
  };

  return (
    <Page title="Crear colaborador | Okima">
      <Box py={3} bgcolor="#ffffff" mb={2}>
        <Container maxWidth="xl">
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h4">Crear colaborador</Typography>
          </Box>
          <Link
            component={RouterLink}
            variant="button"
            to={PATH_DASHBOARD.general.users}
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
        <UserForm submitForm={createUser} />
      </Container>
    </Page>
  );
}
