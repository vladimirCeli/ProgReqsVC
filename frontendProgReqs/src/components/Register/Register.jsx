import { useState } from "react";

import zxcvbn from "zxcvbn";
import { useNavigate, Link } from "react-router-dom";
import { Logo } from "../Logo";
import { register } from "../../Services/Fetch";
import { Eye, EyeOff } from "react-feather";

const Register = ({ onSuccessRegistration }) => {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordRequirements, setPasswordRequirements] = useState({
    minChars: false,
    maxChars: false,
    hasUppercase: false,
    hasLowercase: false,
    hasDigits: false,
    hasSymbols: false,
    noSpaces: false,
    notCommon: false,
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });

    if (name === "password") {
      const result = zxcvbn(value);
      setPasswordStrength(result.score);

      checkPasswordRequirements(value);
    }
  };

  const checkPasswordRequirements = (value) => {
    const requirements = {
      minChars: value.length >= 12,
      maxChars: value.length <= 30,
      hasUppercase: /[A-Z]/.test(value),
      hasLowercase: /[a-z]/.test(value),
      hasDigits: /[0-9]/.test(value),
      hasSymbols: /[!@#$%^&*()_+[\]{};':"\\|,.<>/?-]/.test(value),
      noSpaces: !/\s/.test(value),
      notCommon: !["Passw0rd", "Password123", "12345678"].includes(value),
    };

    setPasswordRequirements(requirements);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    if (values.password !== values.confirmPassword) {
      setLoading(false);
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      const response = await fetch(register, {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();
      if (response.ok) {
        onSuccessRegistration();
        navigate("/registermessage");
      } else {
        setLoading(false);
        setError(data.message);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <section className="flex items-center justify-center relative overflow-hidden md:p-20">
      <div className="w-96 bg-gray-50 rounded-2xl shadow-lg max-w-md p-4 flex flex-col items-center space-y-6 bg-opacity-75">
        <Link to="/">
          <Logo width={80} height={60} className="" />
        </Link>
        <h1 className="text-2xl font-bold mt-4">Registro</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 w-full md:flex-row md:flex-wrap md:justify-between"
        >
          <input
            type="text"
            className="p-3 rounded-xl border w-full md:w-5/12 focus:outline-none focus:border-indigo-700"
            required
            id="first_name"
            placeholder="Nombre"
            name="first_name"
            onChange={handleChange}
          />

          <input
            type="text"
            className="rounded-xl border w-full p-3 focus:outline-none focus:border-indigo-700 md:w-5/12"
            required
            id="last_name"
            placeholder="Apellido"
            name="last_name"
            onChange={handleChange}
          />
          <input
            type="email"
            className="border rounded-xl w-full p-3 focus:outline-none focus:border-indigo-700"
            required
            id="email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
          />

          <input
            type="text"
            className="border rounded-xl w-full p-3 focus:outline-none focus:border-indigo-700"
            required
            id="username"
            placeholder="Nombre de usuario"
            name="username"
            onChange={handleChange}
          />

          <div className="w-full relative">
              <input
                type={showPassword ? "text" : "password"}
                className="border rounded-xl w-full p-3 focus:outline-none focus:border-indigo-700"
                required
                id="password"
                placeholder="Contraseña"
                name="password"
                onChange={handleChange}
              />
              <button
                type="button"
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
          </div>
          <div className="w-full">
          {values.password && (
              <div className="mt-2">
                <progress
                  value={
                    (Object.values(passwordRequirements).filter(Boolean)
                      .length /
                      7) *
                    100
                  }
                  max="100"
                  className="w-full"
                ></progress>
                <p className="text-sm text-gray-600">
                  Fortaleza de la contraseña:{" "}
                  {passwordStrength === 0
                    ? "Débil"
                    : passwordStrength === 4
                    ? "Fuerte"
                    : "Moderada"}
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  Requisitos de contraseña:
                  <ul className="list-disc ml-4">
                    <li>
                      Mínimo 12 caracteres:{" "}
                      {passwordRequirements.minChars ? "Cumple" : "No cumple"}
                    </li>
                    <li>
                      Máximo 30 caracteres:{" "}
                      {passwordRequirements.maxChars ? "Cumple" : "No cumple"}
                    </li>
                    <li>
                      Al menos una letra mayúscula:{" "}
                      {passwordRequirements.hasUppercase
                        ? "Cumple"
                        : "No cumple"}
                    </li>
                    <li>
                      Al menos una letra minúscula:{" "}
                      {passwordRequirements.hasLowercase
                        ? "Cumple"
                        : "No cumple"}
                    </li>
                    <li>
                      Al menos un dígito:{" "}
                      {passwordRequirements.hasDigits ? "Cumple" : "No cumple"}
                    </li>
                    <li>
                      Al menos un símbolo:{" "}
                      {passwordRequirements.hasSymbols ? "Cumple" : "No cumple"}
                    </li>
                    <li>
                      Sin espacios:{" "}
                      {passwordRequirements.noSpaces ? "Cumple" : "No cumple"}
                    </li>
                    <li>
                      No es una contraseña común:{" "}
                      {passwordRequirements.notCommon ? "Cumple" : "No cumple"}
                    </li>
                  </ul>
                </p>
              </div>
            )}
          </div>
          <div className="w-full relative">
            <input
             type={showConfirmPassword ? "text" : "password"}
              className="border rounded-xl w-full p-3 focus:outline-none focus:border-indigo-700"
              required
              id="confirmPassword"
              placeholder="Confirmar Contraseña"
              name="confirmPassword"
              onChange={handleChange}
            />
             <button
              type="button"
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>

          {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-700 hover:bg-indigo-600 text-white font-bold py-3 rounded-xl w-full transition duration-300 ease-in-out"
          >
            Registrarse
            {loading && (
              <svg
                className="animate-spin h-5 w-5 ml-2"
                viewBox="0 0 24 24"
              ></svg>
            )}
          </button>
          <div className="text-center mt-4 w-full">
            <p className="text-sm text-gray-600">
              ¿Ya tienes una cuenta?{" "}
              <Link to="/login" className="text-blue-500">
                <a className="text-blue-500">Iniciar sesión</a>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Register;
