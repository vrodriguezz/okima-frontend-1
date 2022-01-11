import { useEffect } from "react";
import * as Yup from "yup";
import { useFormik, Form, FormikProvider } from "formik";
// material
import {
  Alert,
  Box,
  InputLabel,
  FormControl,
  FormControlLabel,
  Grid,
  Paper,
  Select,
  Switch,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
// hooks
import useIsMountedRef from "../../hooks/useIsMountedRef";
// router
import { useLocation } from "react-router-dom";

// ----------------------------------------------------------------------

let tipos = [
  {
    idTipoUsuario: 1,
    nombreTipoUsuario: "Superadministrador",
  },
  {
    idTipoUsuario: 2,
    nombreTipoUsuario: "Administrador",
  },
  {
    idTipoUsuario: 3,
    nombreTipoUsuario: "Vendedor",
  },
  {
    idTipoUsuario: 4,
    nombreTipoUsuario: "Productor",
  },
];

export default function UserForm({ submitForm, user }) {
  const { pathname } = useLocation();
  const isMountedRef = useIsMountedRef();
  const UserSchema = Yup.object().shape({
    email: Yup.string()
      .email("Debe ingresar un correo electrónico valido")
      .required("Debe ingresar un correo"),
    rol: Yup.string().required("Debe seleccionar un tipo de perfil"),
    name: Yup.string().required("Debe ingresar el nombre"),
    surname: Yup.string().required("Debe ingresar el apellido paterno"),
    motherSurname: Yup.string(),
    password: pathname.includes("editar")
      ? Yup.string()
      : Yup.string().required("Debe ingresar una contraseña"),
    confirmPassword: pathname.includes("editar")
      ? Yup.string()
      : Yup.string()
          .oneOf(
            [Yup.ref("password"), null],
            "Las contaseñas ingresadas deben coincidir"
          )
          .required("Debe ingresar una contraseña"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      rol: "",
      name: "",
      surname: "",
      motherSurname: "",
      password: "",
      confirmPassword: "",
      status: true,
      remember: false,
    },
    validationSchema: UserSchema,
    onSubmit: async (values, { setErrors, setSubmitting, resetForm }) => {
      try {
        await submitForm(values);
        if (isMountedRef.current) {
          setSubmitting(false);
        }
      } catch (error) {
        resetForm();
        if (isMountedRef.current) {
          setSubmitting(false);
          setErrors({ afterSubmit: error.message });
        }
      }
    },
  });

  const {
    errors,
    values,
    touched,
    isSubmitting,
    handleSubmit,
    getFieldProps,
    setValues,
  } = formik;

  useEffect(() => {
    if (pathname.includes("editar")) {
      console.log("EDITAR");
      console.log(user);
      if (user) {
        setValues({
          email: user.email,
          rol: user.rol,
          name: user.name,
          surname: user.surname,
          motherSurname: user.motherSurname,
          password: "",
          confirmPassword: "",
          status: user.status,
          remember: false,
        });
      }
    }
  }, [pathname, user]);

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", p: 4 }}>
        <Typography variant="h6" sx={{ mb: 3 }}>
          {pathname.includes("editar")
            ? "Actualiza la información del colaborador aquí:"
            : "Si deseas ingresar a un nuevo colaborador, este es el lugar:"}
        </Typography>
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            {errors.afterSubmit && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {errors.afterSubmit}
              </Alert>
            )}
            <Grid spacing={3} container>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel id="rolLabel">Tipo de perfil*</InputLabel>
                  <Select
                    labelId="rolLabel"
                    {...getFieldProps("rol")}
                    error={Boolean(touched.rol && errors.rol)}
                    helperText={touched.rol && errors.rol}
                    label="Tipo de perfil"
                  >
                    {tipos.map((element, index) => (
                      <MenuItem value={element.idTipoUsuario} key={index}>
                        {element.nombreTipoUsuario}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="email"
                  label="Correo electrónico*"
                  {...getFieldProps("email")}
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="text"
                  label="Nombre*"
                  {...getFieldProps("name")}
                  error={Boolean(touched.name && errors.name)}
                  helperText={touched.name && errors.name}
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  type="text"
                  label="Apellido paterno*"
                  {...getFieldProps("surname")}
                  error={Boolean(touched.surname && errors.surname)}
                  helperText={touched.surname && errors.surname}
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  type="text"
                  label="Apellido materno*"
                  {...getFieldProps("motherSurname")}
                  error={Boolean(touched.motherSurname && errors.motherSurname)}
                  helperText={touched.motherSurname && errors.motherSurname}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="password"
                  label="Contraseña*"
                  {...getFieldProps("password")}
                  error={Boolean(touched.password && errors.password)}
                  helperText={touched.password && errors.password}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="password"
                  label="Repetir contraseña*"
                  {...getFieldProps("confirmPassword")}
                  error={Boolean(
                    touched.confirmPassword && errors.confirmPassword
                  )}
                  helperText={touched.confirmPassword && errors.confirmPassword}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                {pathname.includes("editar") ? (
                  <FormControlLabel
                    control={
                      <Switch
                        {...getFieldProps("status")}
                        checked={values.status}
                      />
                    }
                    label={values.status ? "Estado activo" : "Estado inactivo"}
                    labelPlacement="end"
                  />
                ) : (
                  false
                )}
              </Grid>

              <Grid item xs={12} md={6}>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  loading={isSubmitting}
                  sx={{ display: "block", marginLeft: "auto" }}
                >
                  Guardar
                </LoadingButton>
              </Grid>
            </Grid>
          </Form>
        </FormikProvider>
      </Paper>
    </Box>
  );
}
