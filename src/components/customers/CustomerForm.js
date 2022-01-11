import { useEffect } from "react";
import * as Yup from "yup";
import { useFormik, Form, FormikProvider } from "formik";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { styled } from "@mui/material/styles";
// material
import { Alert, Box, Grid, Paper, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import DatePicker from "@mui/lab/DatePicker";
// hooks
import useIsMountedRef from "../../hooks/useIsMountedRef";
// router
import { useLocation } from "react-router-dom";

// ----------------------------------------------------------------------

const StyledTypography = styled(Typography)(({ theme }) => ({
  minWidth: 40,
  padding: "5px 5px",
  marginLeft: 10,
}));

export default function CustomerForm({ submitForm, user }) {
  const { pathname } = useLocation();
  const isMountedRef = useIsMountedRef();
  const CustomerSchema = Yup.object().shape({
    email: Yup.string().email("Debe ingresar un correo electrónico valido"),
    name: Yup.string().required("Debe ingresar el nombre"),
    address: Yup.string().required("Debe ingresar dirección"),
    billingDNI: Yup.string(),
    company: Yup.string().required("Debe ingresar la empresa"),
    notes: Yup.string(),
    benefitDate: Yup.string(),
    phone: Yup.string()
      .min(11, "Debe ingresar un teléfono válido")
      .max(12, "Debe ingresar un teléfono válido")
      .required("Debe ingresar un teléfono"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      address: "",
      billingDNI: "",
      company: "",
      notes: "",
      benefitDate: "",
      phone: "",
      remember: false,
    },
    validationSchema: CustomerSchema,
    onSubmit: async (values, { setErrors, setSubmitting, resetForm }) => {
      try {
        console.log("aqui en el form", values);
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
      if (user) {
        setValues({
          email: user.email,
          name: user.name,
          address: user.address,
          billingDNI: user.billingDNI,
          company: user.company,
          notes: user.notes,
          benefitDate: user.benefitDate,
          phone: user.phone,
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
            ? "Actualiza la información del cliente aquí:"
            : "Si deseas ingresar a un nuevo cliente, este es el lugar:"}
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
                <TextField
                  fullWidth
                  type="text"
                  label="Nombre de Cliente*"
                  {...getFieldProps("name")}
                  error={Boolean(touched.name && errors.name)}
                  helperText={touched.name && errors.name}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="email"
                  label="Correo electrónico"
                  {...getFieldProps("email")}
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <PhoneInput
                  preferredCountries={["cl", "mx"]}
                  country={"cl"}
                  placeholder="989828918"
                  name="phone"
                  {...getFieldProps("phone")}
                  error={Boolean(touched.phone && errors.phone)}
                  helperText={touched.phone && errors.phone}
                  value={values.phone}
                  onChange={(e) =>
                    setValues({
                      ...values,
                      phone: e.replace(/[^0-9.]/g, ""),
                    })
                  }
                />
                {Boolean(touched.phone && errors.phone) ? (
                  <StyledTypography variant="body1">
                    {errors.phone}
                  </StyledTypography>
                ) : (
                  false
                )}
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="text"
                  label="Dirección"
                  {...getFieldProps("address")}
                  error={Boolean(touched.address && errors.address)}
                  helperText={touched.address && errors.address}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="text"
                  label="Rut de Facturación"
                  {...getFieldProps("billingDNI")}
                  error={Boolean(touched.billingDNI && errors.billingDNI)}
                  helperText={touched.billingDNI && errors.billingDNI}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="text"
                  label="Empresa"
                  {...getFieldProps("company")}
                  error={Boolean(touched.company && errors.company)}
                  helperText={touched.company && errors.company}
                />
              </Grid>

              <Grid item xs={12} md={12}>
                <TextField
                  fullWidth
                  type="text"
                  label="Notas"
                  multiline
                  rows={4}
                  {...getFieldProps("notes")}
                  error={Boolean(touched.notes && errors.notes)}
                  helperText={touched.notes && errors.notes}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <DatePicker
                  views={["day", "month"]}
                  label="Fecha de cumpleaños"
                  name="benefitDate"
                  value={values.benefitDate}
                  onChange={(newValue) =>
                    setValues({
                      ...values,
                      benefitDate: newValue,
                    })
                  }
                  inputFormat="d/MM"
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      placeholder="10/12"
                      error={Boolean(touched.benefitDate && errors.benefitDate)}
                      helperText={touched.benefitDate && errors.benefitDate}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={6}></Grid>
            </Grid>
            <LoadingButton
              type="submit"
              variant="contained"
              loading={isSubmitting}
              sx={{ display: "block", marginLeft: "auto" }}
            >
              Guardar
            </LoadingButton>
          </Form>
        </FormikProvider>
      </Paper>
    </Box>
  );
}
