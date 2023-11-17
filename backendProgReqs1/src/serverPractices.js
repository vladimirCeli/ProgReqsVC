// server.js
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());

let servidorActivo = false;

app.get('/start-server', (req, res) => {
  // Lógica para activar el servidor
  servidorActivo = true;
  res.send('Servidor activado');
});

app.get('/stop-server', (req, res) => {
  // Lógica para detener el servidor
  servidorActivo = false;
  res.send('Servidor detenido');
});

app.get('/simulate-path-traversal', (req, res) => {
 
    const { file } = req.query;
    // Lógica para simular el ataque de path traversal
    // Aquí debes implementar una lógica segura para evitar problemas de seguridad en un entorno real
    res.send(`Simulación de ataque de path traversal completada. Archivo solicitado: ${file}`);
  
});

app.listen(PORT, () => {
  console.log(`Servidor para prácticas escuchando en el puerto ${PORT}`);
});
