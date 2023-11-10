import { useNavigate } from "react-router-dom";

const PasswordResetMessage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-4">
          Restablecimiento de Contraseña Exitoso
        </h1>
        <div className="text-center">
          <p>Estimado usuario,</p>
          <p>Le informamos que su contraseña ha sido restablecida exitosamente.</p>
          <p>A partir de este momento, puede utilizar su nueva contraseña para iniciar sesión en su cuenta de forma segura.</p>
          <p>Si no ha realizado esta solicitud o necesita asistencia adicional, por favor, póngase en contacto con nuestro equipo de soporte.</p>
          <p>Gracias por confiar en nuestros servicios.</p>
          <p>Puede cerrar esta ventana.</p>
          <br />
          <button
          onClick={() => navigate("/login")}
        className="bg-indigo-700 hover:bg-indigo-600 text-white hover:text-black font-bold py-2 px-4 rounded-xl drop-shadow-xl hover:drop-shadow-md transition duration-500 ease-in-out w-full"
      >
        Ir a Inicio de Sesión
      </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordResetMessage;

