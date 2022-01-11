import { useState, useEffect } from "react";
import moment from "moment";
// redux
import { useDispatch } from "../../redux/store";
import { getOrdersBy } from "../../redux/slices/orders";
// material
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import DateRangePicker from "@mui/lab/DateRangePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { styled } from "@mui/material/styles";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const estados = [
  {
    idEstadoOrden: 1,
    codigo: "COT",
    nombre: "Cotizado",
  },
  {
    idEstadoOrden: 2,
    codigo: "EN-PRO",
    nombre: "En producción",
  },
  {
    idEstadoOrden: 3,
    codigo: "PAR-RET",
    nombre: "Para retiro",
  },
  {
    idEstadoOrden: 4,
    codigo: "RET",
    nombre: "Retirado",
  },
];

const StartDateTextField = styled(TextField)(({ theme }) => ({
  width: 180,
  "& fieldset": {
    borderRight: "none",
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
}));

const EndDateTextField = styled(TextField)(({ theme }) => ({
  width: 180,
  "& fieldset": {
    borderLeft: "none",
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
}));

export default function Filters({
  search,
  setSearch,
  activeCustomers,
  inActiveCustomers,
  activeUsers,
  inActiveUsers,
  setLoading,
}) {
  const dispatch = useDispatch();
  const [estadosSelected, setEstadosSelected] = useState([1, 2, 3]);
  const [customer, setCustomer] = useState("");
  const [salesman, setSalesman] = useState("");
  const [dates, setDates] = useState([null, null]);

  useEffect(() => {
    initialData();
  }, []);

  const initialData = async () => {
    await setLoading(true);
    moment.addRealMonth = function addRealMonth(d) {
      var fm = moment(d).subtract(2, "M");
      var fmEnd = moment(fm).endOf("month");
      return d.date() != fm.date() && fm.isSame(fmEnd.format("YYYY-MM-DD"))
        ? fm.add(1, "d")
        : fm;
    };
    var nextMonth = moment.addRealMonth(moment());
    setDates([nextMonth._d, new Date()]);

    let obj = [
      {
        name: "cliente",
        data: customer,
      },
      {
        name: "vendedor",
        data: salesman,
      },
      {
        name: "estados",
        data: estadosSelected,
      },
      {
        name: "fecha_desde",
        data: moment(nextMonth._d).format("DD-MM-YYYY"),
      },
      {
        name: "fecha_hasta",
        data: moment(new Date()).format("DD-MM-YYYY"),
      },
    ];
    await dispatch(getOrdersBy(obj));
    setLoading(false);
  };

  const handleChange = async (event) => {
    await setLoading(true);
    const {
      target: { value },
    } = event;

    setEstadosSelected(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    let obj = [
      {
        name: "cliente",
        data: customer,
      },
      {
        name: "vendedor",
        data: salesman,
      },
      {
        name: "estados",
        data: typeof value === "string" ? value.split(",") : value,
      },
      {
        name: "fecha_desde",
        data: moment(dates[0]).format("DD-MM-YYYY"),
      },
      {
        name: "fecha_hasta",
        data: moment(dates[1]).format("DD-MM-YYYY"),
      },
    ];
    await dispatch(getOrdersBy(obj));
    setLoading(false);
  };

  const handleDates = async (event) => {
    await setLoading(true);
    setDates(event);

    let obj = [
      {
        name: "cliente",
        data: customer,
      },
      {
        name: "vendedor",
        data: salesman,
      },
      {
        name: "estados",
        data: estadosSelected,
      },
      {
        name: "fecha_desde",
        data: moment(event[0]).format("DD-MM-YYYY"),
      },
      {
        name: "fecha_hasta",
        data: moment(event[1]).format("DD-MM-YYYY"),
      },
    ];
    await dispatch(getOrdersBy(obj));
    setLoading(false);
  };

  const handleCustomer = async (event) => {
    await setLoading(true);
    setCustomer(event.target.value);

    let obj = [
      {
        name: "cliente",
        data: event.target.value,
      },
      {
        name: "vendedor",
        data: salesman,
      },
      {
        name: "estados",
        data: estadosSelected,
      },
      {
        name: "fecha_desde",
        data: moment(dates[0]).format("DD-MM-YYYY"),
      },
      {
        name: "fecha_hasta",
        data: moment(dates[1]).format("DD-MM-YYYY"),
      },
    ];
    await dispatch(getOrdersBy(obj));
    setLoading(false);
  };

  const handleSalesman = async (event) => {
    await setLoading(true);
    setSalesman(event.target.value);

    let obj = [
      {
        name: "cliente",
        data: customer,
      },
      {
        name: "vendedor",
        data: event.target.value,
      },
      {
        name: "estados",
        data: estadosSelected,
      },
      {
        name: "fecha_desde",
        data: moment(dates[0]).format("DD-MM-YYYY"),
      },
      {
        name: "fecha_hasta",
        data: moment(dates[1]).format("DD-MM-YYYY"),
      },
    ];
    await dispatch(getOrdersBy(obj));
    setLoading(false);
  };

  return (
    <Box>
      <TextField
        sx={{ mr: 1, width: 230 }}
        size="small"
        type="text"
        label="Buscar"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <FormControl sx={{ mr: 1, width: 230 }} size="small">
        <InputLabel id="estado-checkbox-label">Estado</InputLabel>
        <Select
          labelId="estado-checkbox-label"
          id="estado-checkbox"
          multiple
          value={estadosSelected}
          onChange={handleChange}
          input={<OutlinedInput label="Estado" />}
          renderValue={(selected) => {
            let nombres = [];
            selected.forEach((element) => {
              let i = estados.findIndex(
                (estado) => estado.idEstadoOrden === element
              );
              if (i >= 0) nombres.push(estados[i].nombre);
            });
            return nombres.join(", ");
          }}
          MenuProps={MenuProps}
        >
          {estados.map((estado) => (
            <MenuItem key={estado.idEstadoOrden} value={estado.idEstadoOrden}>
              <Checkbox
                checked={estadosSelected.indexOf(estado.idEstadoOrden) > -1}
              />
              <ListItemText primary={estado.nombre} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box display="inline-flex" mr={1}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateRangePicker
            startText="Desde"
            endText="Hasta"
            value={dates}
            onChange={handleDates}
            renderInput={(startProps, endProps) => (
              <>
                <StartDateTextField {...startProps} size="small" />
                <EndDateTextField {...endProps} size="small" />
              </>
            )}
          />
        </LocalizationProvider>
      </Box>

      <FormControl sx={{ mr: 1, width: 230 }} size="small">
        <InputLabel id="customers-label">Cliente</InputLabel>
        <Select
          labelId="customers-label"
          id="customer"
          value={customer}
          label="Cliente"
          onChange={handleCustomer}
        >
          <ListSubheader>Activos</ListSubheader>
          {activeCustomers.map((customer, i) => (
            <MenuItem value={customer.idCliente} key={i}>
              {customer.nombre}
            </MenuItem>
          ))}

          {inActiveCustomers.length !== 0 ? (
            <ListSubheader>Inactivos</ListSubheader>
          ) : (
            false
          )}
          {inActiveCustomers.map((customer, i) => (
            <MenuItem value={customer.idCliente} key={i}>
              {customer.nombre}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ mr: 1, width: 230 }} size="small">
        <InputLabel id="salesman-label">Vendedor</InputLabel>
        <Select
          labelId="salesman-label"
          id="salesman"
          value={salesman}
          label="Vendedor"
          onChange={handleSalesman}
        >
          <ListSubheader>Activos</ListSubheader>
          {activeUsers.map((user, i) => (
            <MenuItem value={user.idUsuario} key={i}>
              {user.nombre}
            </MenuItem>
          ))}

          {inActiveUsers.length !== 0 ? (
            <ListSubheader>Inactivos</ListSubheader>
          ) : (
            false
          )}
          {inActiveUsers.map((user, i) => (
            <MenuItem value={user.idUsuario} key={i}>
              {user.nombre}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
