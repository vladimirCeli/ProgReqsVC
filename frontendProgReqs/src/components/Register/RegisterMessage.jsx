import { useState } from "react";
import { confirmEmailApi } from "../../Services/Fetch";
import { useNavigate } from "react-router-dom";

const RegisterMessage = () => {
  const navigate = useNavigate();
  const [confirmationCode, setConfirmationCode] = useState("");
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [showInput, setShowInput] = useState(true);

  const handleConfirmation = async () => {
    try {
      const response = await fetch(confirmEmailApi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ confirmationToken: confirmationCode }),
      });

      const data = await response.json();

      if (response.ok) {
        setConfirmationMessage(data.message);
        setShowInput(false); 
      } else {
        
        setConfirmationMessage(data.message || "Algo salió mal");
      }
    } catch (error) {
      setConfirmationMessage("Algo salió mal");
    }
  };

  return (
    <div className="max-w-xs mx-auto mt-4 p-4 border-2 border-gray-200 rounded-lg">
      <h1 className="text-2xl font-bold text-center">Mensaje de Registro</h1>
      <div className="text-center mt-4">
        <p className="mb-2">Estimado usuario,</p>
        <p className="mb-2">Gracias por registrarte.</p>
       
        {showInput && (
          <>
           <p className="mb-2">
          Por favor, verifica tu correo electrónico para confirmar tu cuenta. Tienes un plazo máximo de 5 minutos para hacerlo.
        </p>
            <div className="mt-4">
              <label htmlFor="confirmationCode" className="block mb-1">Ingresa el código de confirmación:</label>
              <input
                type="text"
                id="confirmationCode"
                name="confirmationCode"
                className="border border-gray-300 rounded-md p-2 w-full"
                placeholder="Código de confirmación"
                value={confirmationCode}
                onChange={(e) => setConfirmationCode(e.target.value)}
              />
            </div>

            <button
              onClick={handleConfirmation}
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Confirmar
            </button>
          </>
        )}
        {confirmationMessage && (
          <>
          <p className="mt-4">{confirmationMessage}</p>
          <p className="mt-4 font-bold">Puedes cerrar esta ventana</p>
          </>
        )}
      </div>
    </div>
  );
};

export default RegisterMessage;
