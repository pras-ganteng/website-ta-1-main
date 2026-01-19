import { useRouter } from 'next/navigation';
import { useEffect, ReactNode } from 'react';
import { getSession } from './session';

interface ProtectedRouteProps {
  children: ReactNode;
}

/**
 * Higher Order Component to protect routes that require authentication
 * Redirects to login page if user is not authenticated
 */
export function withAuth(Component: React.ComponentType<any>) {
  return function ProtectedComponent(props: any) {
    const router = useRouter();

    useEffect(() => {
      const checkAuth = async () => {
        const session = getSession();
        if (!session) {
          router.replace('/');
        }
      };

      checkAuth();
    }, [router]);

    return <Component {...props} />;
  };
}

/**
 * Component to ensure user is authenticated
 */
export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(true);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  useEffect(() => {
    const session = getSession();
    if (!session) {
      router.replace('/');
    } else {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-100 to-blue-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Memuat...</p>
        </div>
      </div>
    );
  }

  return isAuthenticated ? <>{children}</> : null;
}
