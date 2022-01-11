import PropTypes from "prop-types";
// material
import { Box } from "@mui/material";

// ----------------------------------------------------------------------

Logo.propTypes = {
  sx: PropTypes.object,
};

export default function Logo({ sx }) {
  return (
    <Box sx={{ width: 40, height: 40, ...sx }}>
      <img
        src="/static/brand/isotipo_cyan.png"
        alt="login"
        style={{ width: "100%", height: "100%" }}
      />
    </Box>
  );
}
