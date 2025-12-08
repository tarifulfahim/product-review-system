'use client';

import { useAuth } from '@/lib/auth-context';
import { ReactNode } from 'react';

interface PermissionGuardProps {
  allowedRoles: string[];
  children: ReactNode;
  fallback?: ReactNode;
}

export function PermissionGuard({
  allowedRoles,
  children,
  fallback = null,
}: PermissionGuardProps) {
  const { user } = useAuth();

  if (!user) {
    return <>{fallback}</>;
  }

  const hasPermission = allowedRoles.includes(user.role);

  if (!hasPermission) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

