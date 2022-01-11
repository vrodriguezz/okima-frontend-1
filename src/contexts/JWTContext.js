import { createContext, useEffect, useReducer } from "react";
import PropTypes from "prop-types";
import jwtDecode from "jwt-decode";
// utils
import axios from "../utils/axios";
import { isValidToken, setSession } from "../utils/jwt";

// ----------------------------------------------------------------------

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  },
  LOGIN: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),
  REGISTER: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
};

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

const AuthContext = createContext({
  ...initialState,
  method: "jwt",
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
});

AuthProvider.propTypes = {
  children: PropTypes.node,
};

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem("accessToken");
        const refreshToken = window.localStorage.getItem("refreshToken");

        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken, refreshToken);
          let { usuario } = jwtDecode(accessToken);

          const num = Math.floor(Math.random() * 7);
          const user = {
            apellidoMaterno: usuario.apellidoMaterno,
            apellidoPaterno: usuario.apellidoPaterno,
            email: usuario.email,
            idTipoUsuario: usuario.idTipoUsuario,
            idUsuario: usuario.idUsuario,
            nombreTipoUsuario: usuario.nombreTipoUsuario,
            role: usuario.nombreTipoUsuario,
            photoURL: "/static/mock-images/avatars/avatar_" + num + ".jpg",
            nombres: usuario.nombres,
            token: accessToken,
            refreshToken: refreshToken,
          };

          dispatch({
            type: "INITIALIZE",
            payload: {
              isAuthenticated: true,
              user,
            },
          });
        } else {
          dispatch({
            type: "INITIALIZE",
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: "INITIALIZE",
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    initialize();
  }, []);

  const login = async (email, password) => {
    const response = await axios.post("/api/login", {
      email,
      password,
    });
    const { token, refreshToken } = response.data;
    const { usuario } = jwtDecode(token);
    const num = Math.floor(Math.random() * 7);
    const user = {
      apellidoMaterno: usuario.apellidoMaterno,
      apellidoPaterno: usuario.apellidoPaterno,
      email: usuario.email,
      idTipoUsuario: usuario.idTipoUsuario,
      idUsuario: usuario.idUsuario,
      nombreTipoUsuario: usuario.nombreTipoUsuario,
      role: usuario.nombreTipoUsuario,
      photoURL: "/static/mock-images/avatars/avatar_" + num + ".jpg",
      nombres: usuario.nombres,
      token: token,
      refreshToken: refreshToken,
    };
    setSession(token, refreshToken);
    dispatch({
      type: "LOGIN",
      payload: {
        user,
      },
    });
  };

  const register = async (email, password, firstName, lastName) => {
    const response = await axios.post("/api/account/register", {
      email,
      password,
      firstName,
      lastName,
    });
    const { accessToken, user } = response.data;

    window.localStorage.setItem("accessToken", accessToken);
    dispatch({
      type: "REGISTER",
      payload: {
        user,
      },
    });
  };

  const logout = async () => {
    setSession(null, null);
    dispatch({ type: "LOGOUT" });
  };

  const resetPassword = () => {};

  const updateProfile = () => {};

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: "jwt",
        login,
        logout,
        register,
        resetPassword,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
