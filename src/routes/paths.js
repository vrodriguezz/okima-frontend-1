// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = "/";
const ROOTS_DASHBOARD = "/dashboard";

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: "/",
  resetPassword: "/reset-password",
};

export const PATH_PAGE = {
  comingSoon: "/coming-soon",
  maintenance: "/mantenimiento",
  page404: "/404",
  page500: "/500",
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  general: {
    orders: path(ROOTS_DASHBOARD, "/ordenes"),
    customers: path(ROOTS_DASHBOARD, "/clientes"),
    users: path(ROOTS_DASHBOARD, "/colaboradores"),
    createUsers: path(ROOTS_DASHBOARD, "/colaboradores/crear"),
    updateUsers: path(ROOTS_DASHBOARD, "/colaboradores/editar/"),
    createCustomers: path(ROOTS_DASHBOARD, "/clientes/crear"),
  },
  user: {
    root: path(ROOTS_DASHBOARD, "/user"),
    profile: path(ROOTS_DASHBOARD, "/user/profile"),
    account: path(ROOTS_DASHBOARD, "/user/account"),
  },
};

export const PATH_DOCS = "https://docs-minimals.vercel.app/introduction";
