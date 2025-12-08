import { useAuth } from '../auth-context';
import { Role } from './roles';

export function usePermissions() {
  const { user } = useAuth();

  const hasRole = (allowedRoles: string[]): boolean => {
    if (!user) return false;
    return allowedRoles.includes(user.role);
  };

  const canCreateUser = () => hasRole([Role.ADMIN]);
  const canViewUsers = () => hasRole([Role.ADMIN, Role.ASSOCIATE]);

  return {
    hasRole,
    canCreateUser,
    canViewUsers,
  };
}

