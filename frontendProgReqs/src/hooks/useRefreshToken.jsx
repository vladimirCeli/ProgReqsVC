import useAuth from './useAuth'

import { refreshApi } from '../Services/Fetch'

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await fetch(refreshApi, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("No se pudo refrescar el token");
    }
    const data = await response.json();
    const username = data?.username;
    const roles = data?.rol_id;
    const accessToken = data?.token;

    setAuth((prev) => {
      return {
        ...prev,
        username,
        accessToken,
        roles,
      };
    });
    return data;
  };

  return refresh;
};

export default useRefreshToken;
