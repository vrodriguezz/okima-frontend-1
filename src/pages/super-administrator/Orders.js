import { useEffect, useState } from "react";
import axios from "../../utils/axios";
// material
import { styled } from "@mui/material/styles";
import { Box, Button, Container, Drawer, Typography } from "@mui/material";
import { green } from "@mui/material/colors";
// redux
import { useDispatch, useSelector } from "../../redux/store";
import { getCustomersOrdersGrid } from "../../redux/slices/customer";
import { getUsersOrdersGrid } from "../../redux/slices/user";
// components
import Page from "../../components/Page";
import TableOrders from "../../components/orders/TableOrders";
import Filters from "../../components/orders/Filters";
import SvgIconStyle from "../../components/SvgIconStyle";
import LoadingScreen from "../../components/LoadingScreen";
import OrderDetail from "../../components/orders/OrderDetail";
import OrderDetailLoading from "../../components/orders/OrderDetailLoading";

// ----------------------------------------------------------------------

const drawerWidth = 450;

const ExcelButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(green[800]),
  backgroundColor: green[800],
  minWidth: "auto",
  height: 36,
  "&:hover": {
    backgroundColor: green[900],
  },
  "& .MuiButton-startIcon": {
    marginRight: 0,
    marginLeft: 0,
    height: 20,
    width: 20,
  },
}));

export default function GeneralApp() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const { orders } = useSelector((state) => state.order);
  const { activeCustomers } = useSelector((state) => state.customer);
  const { inActiveCustomers } = useSelector((state) => state.customer);
  const { activeUsers } = useSelector((state) => state.user);
  const { inActiveUsers } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [drawerOrder, setDrawerOrder] = useState(false);
  const [orderDetail, setOrderDetail] = useState(null);

  useEffect(() => {
    dispatch(getCustomersOrdersGrid());
    dispatch(getUsersOrdersGrid());
  }, [dispatch]);

  const handleOpenOrderDetail = async (idOrder) => {
    setDrawerOrder(true);
    const response = await axios.get("/api/orden/resumen/" + idOrder);
    console.log(response);
    // setOrderDetail(response.data);
  };

  return (
    <Page title="Ordenes | Okima">
      {loading ? (
        <Box
          sx={{
            width: "100%",
            backgroundColor: "transparent",
            height: "100%",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            margin: "auto",
            position: "fixed !important",
            zIndex: "1999 !important",
            cursor: "progress",
          }}
        >
          <Box
            sx={{
              minHeight: "100vh",
              minWidth: "100%",
              display: "flex !important",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(255, 255, 255, 0.5)",
            }}
          >
            <LoadingScreen />
          </Box>
        </Box>
      ) : (
        false
      )}

      <Box py={3} bgcolor="#ffffff" mb={2}>
        <Container maxWidth="xl">
          <Box display="flex" justifyContent="space-between" mb={1}>
            <Typography variant="h4">Ordenes</Typography>

            <Box>
              <Button type="button" variant="contained">
                Crear orden
              </Button>

              <ExcelButton
                type="button"
                variant="contained"
                color="success"
                sx={{ ml: 1 }}
                startIcon={
                  <SvgIconStyle
                    src="/static/icons/ic_excel.svg"
                    sx={{ width: "100%", height: "100%" }}
                  />
                }
              />
            </Box>
          </Box>
          <Filters
            search={search}
            setSearch={setSearch}
            activeCustomers={activeCustomers}
            inActiveCustomers={inActiveCustomers}
            activeUsers={activeUsers}
            inActiveUsers={inActiveUsers}
            setLoading={setLoading}
          />
        </Container>
      </Box>

      <Container maxWidth="xl">
        <TableOrders
          orders={orders}
          search={search}
          orderDetail={handleOpenOrderDetail}
        />
      </Container>

      <Drawer
        anchor={"right"}
        open={drawerOrder}
        onClose={() => setDrawerOrder(false)}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        {orderDetail ? <OrderDetail orderDetail={orderDetail} /> : <OrderDetailLoading/>}
      </Drawer>
    </Page>
  );
}
