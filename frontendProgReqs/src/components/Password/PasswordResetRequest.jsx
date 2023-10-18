import { useState } from 'react';
import { resetpass } from '../../Services/Fetch';
import {
  Container,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
} from '@mui/material';

const PasswordResetRequest = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [color, setColor] = useState(null)

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
      setMessage(data.message);
      setOpenSnackbar(true);
      setColor('error')
      return;
    } else {
      setMessage(data.message);
      setOpenSnackbar(true);
      setColor('success')
    }
  };

  return (
    <Container maxWidth="xs" style={{ marginTop: "20px" }}>
      <Typography variant="h4" component="h2" align="center">
        Solicitud de Restablecimiento de Contraseña
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Correo Electrónico"
          type="email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={handleEmailChange}
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          size="large"
        >
          Solicitar Restablecimiento de Contraseña
        </Button>
      </form>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert 
          onClose={() => setOpenSnackbar(false)} 
          severity={color}
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
        </Snackbar>
    </Container>
  );
};

export default PasswordResetRequest;
