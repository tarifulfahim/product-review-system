'use client';

import { PermissionGuard } from '@/components/permissions/PermissionGuard';
import { RegisterUserForm } from '@/components/users/RegisterUserForm';
import { UsersList } from '@/components/users/UsersList';
import { useAuth } from '@/lib/auth-context';
import { Role } from '@/lib/permissions/roles';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function UsersPage() {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  // Check if user has permission to view users page
  const canView = user && [Role.ADMIN, Role.ASSOCIATE].includes(user.role as Role);

  if (!canView) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-destructive/15 text-destructive p-4 rounded-md">
          <h2 className="text-lg font-semibold mb-2">Access Denied</h2>
          <p>You do not have permission to view this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Users Management</h1>

      {/* Register User Form - Admin Only */}
      <PermissionGuard allowedRoles={[Role.ADMIN]}>
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Register New User</h2>
          <div className="bg-card border rounded-lg p-6">
            <RegisterUserForm />
          </div>
        </div>
      </PermissionGuard>

      {/* Users List - All Authenticated Users */}
      <div>
        <h2 className="text-xl font-semibold mb-4">All Users</h2>
        <UsersList />
      </div>
    </div>
  );
}

