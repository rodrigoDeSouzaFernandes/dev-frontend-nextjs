import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";

interface UseLogoutReturn {
  logout: () => void;
}

export const useLogout = (): UseLogoutReturn => {
  const router = useRouter();

  const logout = (): void => {
    deleteCookie("token");
    router.replace("/login");
  };

  return { logout };
};
