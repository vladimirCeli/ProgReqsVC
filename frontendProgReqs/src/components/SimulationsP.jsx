// src/App.jsx
import React, { useState } from 'react';

export default function App() {
  const [servidorActivo, setServidorActivo] = useState(false);

  const activarServidor = () => {
    fetch('http://localhost:4000/start-server')
      .then(response => response.text())
      .then(message => {
        console.log(message);
        setServidorActivo(true);
      })
      .catch(error => console.error('Error:', error));
  };

  const activarSimulacion = () => {
    fetch('http://localhost:5000/simulate-path-traversal?file=archivo_importante.txt')
      .then(response => response.text())
      .then(result => {
        const newTab = window.open('', '_blank');
        newTab.document.write(`<pre>${result}</pre>`);
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Simulación de Ataques de Seguridad</h1>
      <button onClick={activarServidor} className="bg-blue-500 text-white px-4 py-2 rounded mr-4">
        Activar Servidor
      </button>
      <button
        onClick={activarSimulacion}
        disabled={!servidorActivo}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Activar Simulación
      </button>
    </div>
  );
}
