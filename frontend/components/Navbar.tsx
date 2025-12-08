"use client"

import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import { usePermissions } from "@/lib/permissions/usePermissions"
import Link from "next/link"

export function Navbar() {
  const { isAuthenticated, user, logout } = useAuth()
  const { canViewUsers } = usePermissions()

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">Product Review System</span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link 
              href="/" 
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Products
            </Link>
            {canViewUsers() && (
              <Link 
                href="/users" 
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                Users
              </Link>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <span className="text-sm text-muted-foreground hidden md:block">
                {user?.email}
              </span>
              <Button 
                variant="destructive" 
                onClick={logout}
              >
                Logout
              </Button>
            </>
          ) : (
            <Link href="/login">
              <Button variant="default">Login</Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

