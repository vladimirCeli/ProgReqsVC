import { useRef, useState, useEffect } from "react";

import { useNavigate, useLocation, Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useInput from "../../hooks/useInput";
import useToggle from "../../hooks/useToggle";
import { Eye, EyeOff } from "react-feather";
import { login } from "../../Services/Fetch";
import { Logo } from "../Logo";

const Login = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/listsprojects";

  const userRef = useRef();

  const [values, handleChange] = useInput("user", {
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState("");
  const [check, toggleCheck] = useToggle("persist", false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrors("");
  }, [values]);

  const [, setLoginSuccessful] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const resp = await fetch(login, {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await resp.json();
      if (resp.ok) {
        const username = values?.username;
        const accessToken = data?.token;
        const roles = data?.rol_id;

        setAuth({
          username,
          accessToken,
          roles,
        });
        setLoginSuccessful(true);
        navigate(from, { replace: true });
        if (roles === 1) navigate("/managequestionnaire");
        if (roles === 2) navigate("/listsprojects");
      } else {
        setLoading(false);
        setErrors(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className=" flex items-center justify-center relative overflow-hidden md:p-32">
    <div className="w-96 bg-gray-50 rounded-2xl shadow-lg max-w-md p-8 flex flex-col items-center space-y-6 bg-opacity-75">
        <Link to="/">
        <Logo width={80} height={60} className="" />
        </Link>
        <h2 className="font-bold text-2xl">Iniciar sesión</h2>
        <p className="text-sm text-center">
          Si eres miembro, inicia sesión fácilmente.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
          <input
            className="p-3 rounded-xl border w-full"
            type="text"
            name="username"
            placeholder="Nombre de usuario"
            required
            ref={userRef}
            {...handleChange}
          />
          <div className="relative">
            <input
              className="p-3 rounded-xl border w-full"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Contraseña"
              required
              {...handleChange}
            />
            <button
              type="button"
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>
          <div className="flex items-center gap-2">
            <input
              className="rounded-xl"
              type="checkbox"
              name="persist"
              id="persist"
              checked={check}
              onChange={toggleCheck}
            />
            <label htmlFor="persist">Mantener sesión iniciada</label>
          </div>
          {errors && <p className="text-red-500">{errors}</p>}
          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-700 hover:bg-indigo-600 text-white font-bold py-3 rounded-xl w-full transition duration-300 ease-in-out"
          >
            Iniciar sesión
          </button>
        </form>
        <Link
          to="/request-password-reset"
          className="text-sm border-b border-gray-400 py-4"
        >
          ¿Olvidó su contraseña?
        </Link>
        <div className="text-sm flex justify-center items-center ">
          <p>¿No tiene cuenta?</p>
          <Link to="/register" className="text-blue-500 ml-2">
            <button className="py-2 px-4 bg-white border rounded-xl hover:scale-105 duration-300">
              Registrarse
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Login;
