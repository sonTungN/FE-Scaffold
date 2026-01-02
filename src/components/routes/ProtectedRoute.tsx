import type { ReactNode } from 'react';
import { useProtectedRoute } from '@/hooks/useProtectedRoute';
import type { User } from '@/types';

interface ProtectedRouteProps {
  children: ReactNode;
  user: User | null;
}

export default function ProtectedRoute({ children, user }: ProtectedRouteProps) {
  const redirect = useProtectedRoute({ user });

  if (redirect) {
    return redirect;
  }

  return <>{children}</>;
}

