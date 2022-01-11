import { useState } from "react";
import axios from "../../utils/axios";
// material
import { styled } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
// components
import Label from "../Label";

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

function Row(props) {
  const { row } = props;
  const [open, setOpen] = useState(false);
  const [pedidos, setPedidos] = useState(null);

  const handlePedidos = async (idOrder) => {
    if (open) {
      setOpen(!open);
    } else {
      setOpen(!open);
      const response = await axios.get("/api/pedido/resumen/orden/" + idOrder);
      setPedidos(response.data);
    }
  };

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell component="th" scope="row">
          {row.nroOrden}
        </TableCell>
        <TableCell>
          <Label
            variant="ghost"
            color={
              (row.nombreEstado === "Retirado" && "success") ||
              (row.nombreEstado === "En producción" && "warning") ||
              (row.nombreEstado === "Para retiro" && "info") ||
              "default"
            }
          >
            {row.nombreEstado}
          </Label>
        </TableCell>
        <TableCell>{row.nombreCliente}</TableCell>
        <TableCell>
          {row.tieneDeuda !== 1 ? (
            <CheckCircleIcon color="success" />
          ) : (
            <CancelIcon color="error" />
          )}
        </TableCell>
        <TableCell>{row.nombreVendedor}</TableCell>
        <TableCell>{row.fechaIngreso}</TableCell>
        <TableCell>{row.fechaPromesa}</TableCell>
        <TableCell align="right">
          <TableButton
            type="button"
            variant="contained"
            sx={{ mr: 1 }}
            startIcon={<VisibilityIcon />}
            onClick={() => props.orderDetail(row.idOrden)}
          />
          <TableButton
            type="button"
            variant="contained"
            sx={{ mr: 1 }}
            startIcon={<EditIcon />}
          />
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => handlePedidos(row.idOrden)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1, borderBottom: "1px solid #F4F6F8" }} pb={3}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Estado</TableCell>
                    <TableCell>Producto</TableCell>
                    <TableCell>Cantidad</TableCell>
                    <TableCell>Detalle</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pedidos ? (
                    pedidos.map((pedido) => (
                      <TableRow key={pedido.idPedido}>
                        <TableCell component="th" scope="row">
                          <Label
                            variant="ghost"
                            color={
                              (pedido.estadoPedido === "Retirado" &&
                                "success") ||
                              (pedido.estadoPedido === "En producción" &&
                                "warning") ||
                              (pedido.estadoPedido === "Para retiro" &&
                                "info") ||
                              "default"
                            }
                          >
                            {pedido.estadoPedido}
                          </Label>
                        </TableCell>
                        <TableCell>{pedido.productoNombre}</TableCell>
                        <TableCell>{pedido.cantidad}</TableCell>
                        <TableCell>{pedido.requisito}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell>
                        <Skeleton width="40%" />
                      </TableCell>
                      <TableCell>
                        <Skeleton width="80%" />
                      </TableCell>
                      <TableCell>
                        <Skeleton width="25%" />
                      </TableCell>
                      <TableCell>
                        <Skeleton width="80%" />
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default function CollapsibleTable({ orders, search, orderDetail }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Card sx={{ pt: 2, px: 1 }}>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell>Nro orden</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Cliente</TableCell>
              <TableCell>Deuda</TableCell>
              <TableCell>Vendedor</TableCell>
              <TableCell>Fecha de ingreso</TableCell>
              <TableCell>Fecha de promesa</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders ? (
              orders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} sx={{ color: "#637381" }} align="center">
                    <em>
                      - No se encuentran datos según los filtros indicados -
                    </em>
                  </TableCell>
                </TableRow>
              ) : (
                orders
                  .filter((order) => {
                    let flag = false;
                    if (
                      order.nroOrden
                        .toString()
                        .toLowerCase()
                        .includes(search.toLowerCase())
                    ) {
                      flag = true;
                    }
                    return flag;
                  })
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, i) => (
                    <Row key={i} row={row} orderDetail={orderDetail} />
                  ))
              )
            ) : (
              false
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={orders.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Filas por página: "
      />
    </Card>
  );
}
