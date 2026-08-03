import { useAuthStore } from "@/app/lib/auth";

export function useAuth() {
  const { user, isAuthenticated, setUser, logout } = useAuthStore();

  return {
    user,
    isAuthenticated,
    setUser,
    logout,
  };
}