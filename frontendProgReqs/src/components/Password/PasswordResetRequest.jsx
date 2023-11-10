import { useState } from 'react';
import { resetpass } from '../../Services/Fetch';
import { useNavigate } from 'react-router-dom';
import useToast from '../../hooks/useToast';

const PasswordResetRequest = () => {
  const {toast} = useToast();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(resetpass, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    const data = await response.json();
    if (!response.ok) {
      toast.error(data.message);
      return;
    } else {
      navigate('/login', {replace: true});
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 rounded-2xl shadow-lg p-6 bg-gray-50 backdrop-filter backdrop-blur-lg bg-opacity-75">
      <h1 className="text-2xl text-center font-bold mb-4">
        Solicitud de Restablecimiento de Contraseña
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring focus:border-indigo-500"
            type="email"
            placeholder="Ingrese su correo electrónico"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-indigo-700 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-xl transition duration-300 w-full"
        >
          Solicitar Restablecimiento de Contraseña
        </button>
      </form>
    </div>
  );
};

export default PasswordResetRequest;
