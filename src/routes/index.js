import { Suspense, lazy } from "react";
import { Navigate, useRoutes, useLocation } from "react-router-dom";
// layouts
import LogoOnlyLayout from "../layouts/LogoOnlyLayout";
import SuperAdminDashboardLayout from "../layouts/super-administrator";
// guards
import GuestGuard from "../guards/GuestGuard";
import AuthGuard from "../guards/AuthGuard";
// import RoleBasedGuard from "../guards/RoleBasedGuard";
// components
import LoadingScreen from "../components/LoadingScreen";

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();
  const isDashboard = pathname.includes("/dashboard");

  return (
    <Suspense
      fallback={
        <LoadingScreen
          sx={{
            ...(!isDashboard && {
              top: 0,
              left: 0,
              width: 1,
              zIndex: 9999,
              position: "fixed",
            }),
          }}
        />
      }
    >
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: (
        <GuestGuard>
          <Login />
        </GuestGuard>
      ),
    },

    // Dashboard Routes
    {
      path: "dashboard",
      element: (
        <AuthGuard>
          <SuperAdminDashboardLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to="/dashboard/ordenes" replace /> },
        { path: "ordenes", element: <OrdersSuperAdmin /> },
        { path: "colaboradores", element: <UsersSuperAdmin />  },
        { path: "colaboradores/crear", element: <CreateUserSuperAdmin />  },
        { path: "colaboradores/editar/:id", element: <UpdateUserSuperAdmin />  },
        { path: "clientes", element: <CustomersSuperAdmin />  },
        { path: "clientes/crear", element: <CreateCustomerSuperAdmin/>},
        { path: "clientes/editar/:id", element: <UpdateCustomerSuperAdmin/>}

        // { path: "clientes", element: <GeneralEcommerce /> },
        // { path: "usuarios", element: <GeneralAnalytics /> },
        // {
        //   path: "usuario",
        //   children: [
        //     { element: <Navigate to="/dashboard/usuario/perfil" replace /> },
        //     { path: "perfil", element: <UserProfile /> },
        //     { path: ":name/editar", element: <UserCreate /> },
        //     { path: "cuenta", element: <UserAccount /> },
        //   ],
        // },
      ],
    },

    // Main Routes
    {
      path: "*",
      element: <LogoOnlyLayout />,
      children: [
        { path: "reset-password", element: <ResetPassword /> },
        { path: "coming-soon", element: <ComingSoon /> },
        { path: "mantenimiento", element: <Maintenance /> },
        { path: "500", element: <Page500 /> },
        { path: "404", element: <NotFound /> },
        { path: "*", element: <Navigate to="/404" replace /> },
      ],
    },
  ]);
}

// IMPORT COMPONENTS

// Authentication
const Login = Loadable(lazy(() => import("../pages/authentication/Login")));
const ResetPassword = Loadable(
  lazy(() => import("../pages/authentication/ResetPassword"))
);
// Dashboard
const OrdersSuperAdmin = Loadable(lazy(() => import("../pages/super-administrator/Orders")));
const UsersSuperAdmin = Loadable(lazy(() => import("../pages/super-administrator/Users")));
const CreateUserSuperAdmin = Loadable(lazy(() => import("../pages/super-administrator/CreateUser")));
const UpdateUserSuperAdmin = Loadable(lazy(() => import("../pages/super-administrator/UpdateUser")));
const CustomersSuperAdmin = Loadable(lazy(() => import("../pages/super-administrator/Customers")));
const CreateCustomerSuperAdmin = Loadable(lazy(() => import("../pages/super-administrator/CreateCustomer")));
const UpdateCustomerSuperAdmin = Loadable(lazy(() => import("../pages/super-administrator/UpdateCustomer")));

// Main
const ComingSoon = Loadable(lazy(() => import("../pages/ComingSoon")));
const Maintenance = Loadable(lazy(() => import("../pages/Maintenance")));
const Page500 = Loadable(lazy(() => import("../pages/Page500")));
const NotFound = Loadable(lazy(() => import("../pages/Page404")));
