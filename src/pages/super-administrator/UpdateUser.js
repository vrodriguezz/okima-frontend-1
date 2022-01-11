import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
// material
import { Box, Button, Container, Link, Typography } from "@mui/material";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
// components
import Page from "../../components/Page";
import UserForm from "../../components/users/UserForm";
// routes
import { PATH_DASHBOARD } from "../../routes/paths";
import { useParams } from "react-router-dom";
// redux
import { useDispatch } from "../../redux/store";
import { putUser } from "../../redux/slices/user";
// utils
import axios from "../../utils/axios";
import alerts from "../../utils/alerts";

// ----------------------------------------------------------------------

export default function UpdateUser() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await axios.get("/api/usuarios/" + id);
      let usuario = response.data;
      setUser({
        name: usuario.nombres,
        surname: usuario.apellidoPaterno,
        motherSurname: usuario.apellidoMaterno ? usuario.apellidoMaterno : "",
        email: usuario.email,
        password: "",
        confirmPassword: "",
        rol: usuario.idTipoUsuario,
        status: usuario.estado === 1 ? true : false,
      });
    } catch (error) {
      alerts.handleAlert(
        "Ops...",
        "Ha ocurrido un error al obtener la información del usuario solicitado, intente nuevamente más tarde",
        "Ok",
        "error",
        () => (window.location.href = "/dashboard/colaboradores")
      );
    }
  };

  const editUser = async (values) => {
    let body = {
      idUsuario: parseInt(id),
      nombres: values.name,
      apellidoPaterno: values.surname,
      apellidoMaterno:
        values.motherSurname === "" ? null : values.motherSurname,
      email: values.email,
      clave: values.password === "" ? null : values.password,
      claveConfirmacion:
        values.confirmPassword === "" ? null : values.confirmPassword,
      idTipoUsuario: values.rol,
      estado: values.status ? 1 : 0,
    };
    await dispatch(putUser(body));
  };

  return (
    <Page title="Editar colaborador | Okima">
      <Box py={3} bgcolor="#ffffff" mb={2}>
        <Container maxWidth="xl">
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h4">Editar colaborador</Typography>
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
        <UserForm submitForm={editUser} user={user} />
      </Container>
    </Page>
  );
}
