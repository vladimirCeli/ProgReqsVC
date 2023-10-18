import { logoutApi } from '../Services/Fetch'
import useAuth from './useAuth'

const useLogout = () => {
    const { setAuth } = useAuth();
    
    const logout = async () => {
        setAuth({})
        localStorage.removeItem('user');
        localStorage.clear();
        try {
            await fetch(logoutApi, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });
        } catch (error) {
            console.error(error)
        }
    };
    
    return logout;
    }

export default useLogout;
