// material
import { styled } from "@mui/material/styles";
import { grey, green, red } from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import { Box, Button, Chip, Grid, Typography, Switch } from "@mui/material";
import { FormControl, Select, MenuItem, Paper } from "@mui/material";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableContainer,
  TableBody,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
// components
import Label from "../Label";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  paddingRight: ".8rem",
  paddingLeft: "1rem",
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "space-between",
}));

const TableButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(grey[200]),
  backgroundColor: grey[200],
  minWidth: "auto",
  boxShadow: "0px 5px 15px -6px rgba(99,115,129,0.25)",
  height: 36,
  "&:hover": {
    backgroundColor: grey[300],
  },
  "& .MuiButton-startIcon": {
    marginRight: 0,
    marginLeft: 0,
    height: 20,
    width: 20,
  },
}));

const GridData = styled(Grid)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: 10,
}));

const GridHead = styled(Grid)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: 10,
  color: "#637381",
}));

const label = { inputProps: { "aria-label": "Habilitar" } };

export default function OrderDetail({ orderDetail }) {
  const { orden, bitacoras, pedidos } = orderDetail;

  const format = (num) => {
    var reg = /\d{1,3}(?=(\d{3})+$)/g;
    return (num + "").replace(reg, "$&.");
  };

  return (
    <>
      <DrawerHeader>
        <Typography variant="h5">{"Orden N° " + orden.idOrden}</Typography>
        <IconButton>
          <CloseIcon />
        </IconButton>
      </DrawerHeader>

      <Divider />
      <Box p={2}>
        <Typography variant="subtitle1" gutterBottom>
          Acciones
        </Typography>
        <Grid container>
          <GridHead item xs={5}>
            Editar
          </GridHead>
          <GridData item xs={7}>
            <TableButton
              type="button"
              size="small"
              variant="contained"
              startIcon={<EditIcon />}
            />
          </GridData>

          <GridHead item xs={5}>
            Habilitar
          </GridHead>
          <GridData item xs={7}>
            <Switch {...label} defaultChecked />
          </GridData>

          <GridHead item xs={5}>
            Estado
          </GridHead>
          <GridData item xs={7}>
            <FormControl sx={{ width: 200 }} size="small">
              <Select id="estado" value="Cotizado">
                <MenuItem value="Cotizado">Cotizado</MenuItem>
              </Select>
            </FormControl>
          </GridData>
        </Grid>
      </Box>

      <Divider />
      <Box p={2}>
        <Typography variant="subtitle1" gutterBottom>
          Datos principales
        </Typography>
        <Grid container>
          <GridHead item xs={5}>
            Cliente
          </GridHead>
          <GridData item xs={7}>
            {orden.nombreCliente}
          </GridData>

          <GridHead item xs={5}>
            Vendedor
          </GridHead>
          <GridData item xs={7}>
            {orden.nombreVendedor}
          </GridData>

          <GridHead item xs={5}>
            Fecha de ingreso
          </GridHead>
          <GridData item xs={7}>
            {orden.fechaIngreso}
          </GridData>

          <GridHead item xs={5}>
            Fecha de promesa
          </GridHead>
          <GridData item xs={7}>
            {orden.fechaPromesa}
          </GridData>
        </Grid>
      </Box>

      <Divider />
      <Box p={2}>
        <Typography variant="subtitle1" gutterBottom>
          Deuda
        </Typography>
        <Chip
          sx={{ backgroundColor: "#fff", mb: 1 }}
          icon={
            orden.tieneDeuda !== 1 ? (
              <CheckCircleIcon sx={{color: '#54D62C !important'}} />
            ) : (
              <CancelIcon sx={{color: '#FF4842 !important'}}/>
            )
          }
          label={orden.tieneDeuda !== 1 ? "Con deuda" : "Sin deuda"}
        />
        <TableContainer component={Paper}>
          <Table aria-label="table" size="small">
            <TableHead>
              <TableRow>
                <TableCell>Total</TableCell>
                <TableCell>Abono</TableCell>
                <TableCell>Saldo</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                <TableCell>{"$ " + format(orden.montoTotal)}</TableCell>
                <TableCell>{"$ " + format(orden.abono)}</TableCell>
                <TableCell
                  sx={{
                    color:
                      orden.montoTotal - orden.abono !== 0
                        ? red[500]
                        : green[500],
                  }}
                >
                  {"$ " + format(orden.montoTotal - orden.abono)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Divider />
      <Box p={2}>
        <Typography variant="subtitle1" gutterBottom>
          Pedidos
        </Typography>
        <TableContainer component={Paper}>
          <Table aria-label="table" size="small">
            <TableHead>
              <TableRow>
                <TableCell>Estado</TableCell>
                <TableCell>Producto</TableCell>
                <TableCell>Cant.</TableCell>
                <TableCell>Requisito</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pedidos.map((pedido) => (
                <TableRow
                  key={pedido.idPedido}
                  sx={{ "& > *": { borderBottom: "unset" } }}
                >
                  <TableCell>
                    <Label
                      variant="ghost"
                      color={
                        (pedido.estadoPedido === "Retirado" && "success") ||
                        (pedido.estadoPedido === "En producción" &&
                          "warning") ||
                        (pedido.estadoPedido === "Para retiro" && "info") ||
                        "default"
                      }
                    >
                      {pedido.estadoPedido}
                    </Label>
                  </TableCell>
                  <TableCell>{pedido.productoNombre}</TableCell>
                  <TableCell>{pedido.cantidad}</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}
