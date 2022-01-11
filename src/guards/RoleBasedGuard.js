import PropTypes from 'prop-types';
import { Container, Alert, AlertTitle } from '@mui/material';
// hooks
import useAuth from '../hooks/useAuth';

// ----------------------------------------------------------------------

RoleBasedGuard.propTypes = {
  accessibleRoles: PropTypes.array, // Example ['admin', 'leader']
  children: PropTypes.node
};

const useCurrentRole = (user) => {
  // Logic here to get current user role
  const role = user.role;
  return role;
};

export default function RoleBasedGuard({ accessibleRoles, children }) {
  const { user } = useAuth();
  const currentRole = useCurrentRole(user);

  if (!accessibleRoles.includes(currentRole)) {
    return (
      <Container>
        <Alert severity="error">
          <AlertTitle>Permission Denied</AlertTitle>
          You do not have permission to access this page
        </Alert>
      </Container>
    );
  }

  return <>{children}</>;
}