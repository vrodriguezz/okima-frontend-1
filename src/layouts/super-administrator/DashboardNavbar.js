import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import menu2Fill from "@iconify/icons-eva/menu-2-fill";
// material
import { alpha, styled } from "@mui/material/styles";
import { Box, AppBar, Toolbar, IconButton } from "@mui/material";
// hooks
import useCollapseDrawer from "../../hooks/useCollapseDrawer";
// components
import { MHidden } from "../../components/@material-extend";

// ----------------------------------------------------------------------

const COLLAPSE_WIDTH = 102;
const APPBAR_MOBILE = 64;

const RootStyle = styled(AppBar)(({ theme }) => ({
  display: "none",
  [theme.breakpoints.down("lg")]: {
    display: "flex !important",
    boxShadow: "none",
    backdropFilter: "blur(6px)",
    WebkitBackdropFilter: "blur(6px)", // Fix on Mobile
    backgroundColor: alpha(theme.palette.background.default, 0.72),
  },
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  [theme.breakpoints.down("lg")]: {
    minHeight: APPBAR_MOBILE,
    padding: theme.spacing(0, 5),
  },
}));

// ----------------------------------------------------------------------

DashboardNavbar.propTypes = {
  onOpenSidebar: PropTypes.func,
};

export default function DashboardNavbar({ onOpenSidebar }) {
  const { isCollapse } = useCollapseDrawer();

  return (
    <RootStyle
      sx={{
        ...(isCollapse && {
          width: { lg: `calc(100% - ${COLLAPSE_WIDTH}px)` },
        }),
      }}
    >
      <ToolbarStyle>
        <MHidden width="lgUp">
          <IconButton
            onClick={onOpenSidebar}
            sx={{ mr: 1, color: "text.primary" }}
          >
            <Icon icon={menu2Fill} />
          </IconButton>
        </MHidden>

        <Box sx={{ flexGrow: 1 }} />
      </ToolbarStyle>
    </RootStyle>
  );
}
