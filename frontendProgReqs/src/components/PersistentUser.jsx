import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";
import useLocalStorage from "../hooks/useLocalStorage";

const PersistentUser = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth } = useAuth();
    const [persist] = useLocalStorage("persist", false);
  
    useEffect(() => {
      let isMounted = true;
      const verifyRefreshToken = async () => {
        try {
          await refresh();
        } catch (error) {
          console.error(error);
        } finally {
          isMounted && setIsLoading(false);
        }
      };
      !auth?.accessToken && persist ? verifyRefreshToken() : setIsLoading(false);
      return () => (isMounted = false);
    }, []);
  
    useEffect(() => {}, [isLoading]);
    console.log(`isLoading: ${isLoading}`);
    console.log(`aT: ${JSON.stringify(auth?.accessToken)}`);
    return (
      <>{!persist ? <Outlet /> : isLoading ? <p>Loading...</p> : <Outlet />}</>
    );
  };
  
  export default PersistentUser;
  