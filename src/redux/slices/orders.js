import { createSlice } from "@reduxjs/toolkit";
// utils
import axios from "../../utils/axios";

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  orders: [],
};

const slice = createSlice({
  name: "orders",
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
    postOrderSuccess(state) {
      state.isLoading = false;
    },

    // PUT USER
    putOrderSuccess(state) {
      state.isLoading = false;
    },

    // GET CUSTOMER
    getOrdersBySuccess(state, action) {
      state.isLoading = false;
      state.orders = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

const formatData = (filtros) => {
  let string = "";
  filtros.forEach((element) => {
    if (element.data) {
      let simbol = string === "" ? "?" : "&";
      string = string + simbol + element.name + "=" + element.data;
    }
  });
  return string;
};

export function getOrdersBy(filtros) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      let filtro = formatData(filtros);
      const response = await axios.get("/api/ordenes" + filtro);
      if (response.status === 200) {
        dispatch(slice.actions.getOrdersBySuccess(response.data));
      } else {
        dispatch(slice.actions.getOrdersBySuccess([]));
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
