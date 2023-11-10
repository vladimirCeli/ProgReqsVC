import { useState } from "react";
import { resetpassword } from "../../Services/Fetch";
import { useParams, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "react-feather";

const PasswordReset = ({ onSuccessReset }) => {
  const { resetToken } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage("Las contraseñas no coinciden.");
      setOpenSnackbar(true);
    } else {
      const response = await fetch(resetpassword + resetToken, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newPassword }),
      });
      const data = await response.json();
      if (!response.ok) {
        onSuccessReset();
        navigate("/passmesage");
      } else {
        setMessage(data.message);
        setOpenSnackbar(true);
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl text-center font-bold mb-4">
          Restablecimiento de Contraseña
        </h2>
        <form onSubmit={handleSubmit} className="text-center">
          <div className="relative mb-4">
            <input
              className="w-full p-3 border border-gray-300 rounded-xl pr-10"
              type={showPassword ? "text" : "password"}
              placeholder="Nueva Contraseña"
              value={newPassword}
              onChange={handlePasswordChange}
              required
            />
            <button
              type="button"
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>
          <div className="relative mb-4">
            <input
              className="w-full p-3 border border-gray-300 rounded-xl pr-10"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirmar Contraseña"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
            />
            <button
              type="button"
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>
          <button
            type="submit"
            className="bg-indigo-700 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-xl transition duration-300 w-full"
          >
            Restablecer Contraseña
          </button>
        </form>
        {openSnackbar && (
          <div className="mt-4 p-2 bg-gray-200 rounded-xl text-center">
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default PasswordReset;
