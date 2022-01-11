import { createSlice } from "@reduxjs/toolkit";
// utils
import axios from "../../utils/axios";
import alerts from "../../utils/alerts";

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  customers: [],
  activeCustomers: [],
  inActiveCustomers: [],
};

const slice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    //    POST USER
    postCustomerSuccess(state) {
      state.isLoading = false;
    },

    // PUT USER
    putCustomerSuccess(state) {
      state.isLoading = false;
    },

    // GET CUSTOMER
    getCustomersSuccess(state, action) {
      state.isLoading = false;
      state.customers = action.payload;
    },

    // GET CUSTOMERS GRID
    getCustomersOrdersGridSuccess(state, action) {
      const { active, inActive } = action.payload;
      state.isLoading = false;
      state.activeCustomers = active;
      state.inActiveCustomers = inActive;
    },
  },
});

// Reducer
export default slice.reducer;

export function putCustomer(body) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.put("/api/clientes", body);
      alerts.handleAlert(
        "Edición exitosa",
        "Clientes editado exitosamente",
        "Ok",
        "success",
        () => (window.location.href = "/dashboard/clientes")
      );
      dispatch(slice.actions.putCustomerSuccess(response.data));
    } catch (error) {
      if (error.errors) {
        if (error.errors[0].msg) {
          alerts.handleAlert(
            "Ops...",
            "Ha ocurrido un error al editar el cliente: " + error.errors[0].msg,
            "Ok",
            "error",
            () => {}
          );
        }
      }
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function postCustomer(body) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post("/api/clientes", body);
      alerts.handleAlert(
        "Creación exitosa",
        "Cliente creado exitosamente",
        "Ok",
        "success",
        () => (window.location.href = "/dashboard/clientes")
      );
      dispatch(slice.actions.postCustomerSuccess(response.data));
    } catch (error) {
      if (error.errors) {
        if (error.errors[0].msg) {
          alerts.handleAlert(
            "Ops...",
            "Ha ocurrido un error al editar el cliente: " + error.errors[0].msg,
            "Ok",
            "error",
            () => {}
          );
        }
      }
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getCustomers() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get("/api/clientes");
      dispatch(slice.actions.getCustomersSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getCustomersOrdersGrid() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get("/api/clientes/grillaOrdenes");
      let activeCustomers = [];
      let inActiveCustomers = [];
      response.data.forEach((element) => {
        if (element.estado === 1) {
          activeCustomers.push(element);
        } else {
          inActiveCustomers.push(element);
        }
      });

      dispatch(
        slice.actions.getCustomersOrdersGridSuccess({
          active: activeCustomers,
          inActive: inActiveCustomers,
        })
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
