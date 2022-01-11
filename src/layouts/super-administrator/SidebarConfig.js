// routes
import { PATH_DASHBOARD } from "../../routes/paths";
// components
import SvgIconStyle from "../../components/SvgIconStyle";

// ----------------------------------------------------------------------

const getIcon = (name) => (
  <SvgIconStyle
    src={`/static/icons/navbar/${name}.svg`}
    sx={{ width: "100%", height: "100%" }}
  />
);

const ICONS = {
  order: getIcon("ic_order"),
  customer: getIcon("ic_user"),
  user: getIcon("ic_elements"),
};

const sidebarConfig = [
  // ORDERS
  // ----------------------------------------------------------------------
  {
    subheader: "ordenes",
    items: [
      {
        title: "ordenes",
        path: PATH_DASHBOARD.general.orders,
        icon: ICONS.order,
      },
    ],
  },

  // CUSTOMERS
  // ----------------------------------------------------------------------
  {
    subheader: "clientes",
    items: [
      {
        title: "clientes",
        path: PATH_DASHBOARD.general.customers,
        icon: ICONS.customer,
      },
    ],
  },

  // USERS
  // ----------------------------------------------------------------------
  {
    subheader: "colaboradores",
    items: [
      {
        title: "colaboradores",
        path: PATH_DASHBOARD.general.users,
        icon: ICONS.user,
      },
    ],
  },
];

export default sidebarConfig;
