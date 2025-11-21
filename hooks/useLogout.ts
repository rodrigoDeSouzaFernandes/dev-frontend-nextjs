import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export const useLogout = () => {
  const router = useRouter();

  const logout = () => {
    deleteCookie("token");
    router.replace("/login");
  };

  return { logout };
};
