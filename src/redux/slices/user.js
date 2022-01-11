import { filter } from "lodash";
import { createSlice } from "@reduxjs/toolkit";
// utils
import axios from "../../utils/axios";
import alerts from "../../utils/alerts";

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  myProfile: null,
  users: [],
  userList: [],
  activeUsers: [],
  inActiveUsers: [],
};

const slice = createSlice({
  name: "user",
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

    // POST USER
    postUserSuccess(state) {
      state.isLoading = false;
    },

    // PUT USER
    putUserSuccess(state) {
      state.isLoading = false;
    },

    // GET USERS
    getUsersSuccess(state, action) {
      state.isLoading = false;
      state.users = action.payload;
    },

    // GET USERS
    getUsersOrdersGridSuccess(state, action) {
      const { active, inActive } = action.payload;
      state.isLoading = false;
      state.activeUsers = active;
      state.inActiveUsers = inActive;
    },

    // DELETE USERS
    deleteUser(state, action) {
      const deleteUser = filter(
        state.userList,
        (user) => user.id !== action.payload
      );
      state.userList = deleteUser;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { onToggleFollow, deleteUser } = slice.actions;

// ----------------------------------------------------------------------

export function postUser(body) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post("/api/usuarios", body);
      alerts.handleAlert(
        "Creación exitosa",
        "Usuario creado exitosamente",
        "Ok",
        "success",
        () => (window.location.href = "/dashboard/colaboradores")
      );
      dispatch(slice.actions.postUserSuccess(response.data));
    } catch (error) {
      if (error.errors) {
        if (error.errors[0].msg) {
          alerts.handleAlert(
            "Ops...",
            "Ha ocurrido un error al editar el usuario: " + error.errors[0].msg,
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

export function putUser(body) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.put("/api/usuarios", body);
      alerts.handleAlert(
        "Edición exitosa",
        "Usuario editado exitosamente",
        "Ok",
        "success",
        () => (window.location.href = "/dashboard/colaboradores")
      );
      dispatch(slice.actions.putUserSuccess(response.data));
    } catch (error) {
      if (error.errors) {
        if (error.errors[0].msg) {
          alerts.handleAlert(
            "Ops...",
            "Ha ocurrido un error al editar el usuario: " + error.errors[0].msg,
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

export function getUsers() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get("/api/usuarios");
      dispatch(slice.actions.getUsersSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getUsersOrdersGrid() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(
        "/api/usuarios/vendedores/grillaOrdenes"
      );
      let activeUsuarios = [];
      let inActiveUsuarios = [];
      response.data.forEach((element) => {
        if (element.estado === 1) {
          activeUsuarios.push(element);
        } else {
          inActiveUsuarios.push(element);
        }
      });

      dispatch(
        slice.actions.getUsersOrdersGridSuccess({
          active: activeUsuarios,
          inActive: inActiveUsuarios,
        })
      );
    } catch (error) {
      console.log(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}
