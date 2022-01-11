// material
import { styled } from "@mui/material/styles";
import { grey, green, red } from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import { Box, Button, Chip, Grid, Typography, Switch } from "@mui/material";
import { Paper } from "@mui/material";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableContainer,
  TableBody,
} from "@mui/material";
import Skeleton from "@mui/material/Skeleton";

import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";

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

export default function OrderDetailLoading() {
  return (
    <>
      <DrawerHeader>
        <Skeleton width="60%" variant="h5" />
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
            <Skeleton width="60%" />
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
            <Skeleton width="80%" />
          </GridData>

          <GridHead item xs={5}>
            Vendedor
          </GridHead>
          <GridData item xs={7}>
            <Skeleton width="40%" />
          </GridData>

          <GridHead item xs={5}>
            Fecha de ingreso
          </GridHead>
          <GridData item xs={7}>
            <Skeleton width="60%" />
          </GridData>

          <GridHead item xs={5}>
            Fecha de promesa
          </GridHead>
          <GridData item xs={7}>
            <Skeleton width="90%" />
          </GridData>
        </Grid>
      </Box>

      <Divider />
      <Box p={2}>
        <Typography variant="subtitle1" gutterBottom>
          Deuda
        </Typography>

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
                <TableCell>
                  <Skeleton width="90%" />
                </TableCell>
                <TableCell>
                  <Skeleton width="60%" />
                </TableCell>
                <TableCell>
                  <Skeleton width="70%" />
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
              <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                <TableCell>
                  <Skeleton width="70%" />
                </TableCell>
                <TableCell>
                  <Skeleton width="80%" />
                </TableCell>
                <TableCell>
                  <Skeleton width="60%" />
                </TableCell>
                <TableCell>
                  <Skeleton width="100%" />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}
