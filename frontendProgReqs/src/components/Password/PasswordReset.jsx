import React, { useState } from 'react';
import { resetpassword } from '../../Services/Fetch';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  TextField,
  Button,
  Snackbar,
} from '@mui/material';

const PasswordReset = ({ onSuccessReset }) => {
  const { resetToken } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(resetpassword + resetToken, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ newPassword }),
    });
    const data = await response.json();
    if (!response.ok) {
      onSuccessReset();
      navigate('/passmesage');
    } else {
      setMessage(data.message);
      setOpenSnackbar(true);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h2" align="center">
        Restablecimiento de Contraseña
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nueva Contraseña"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={newPassword}
          onChange={handlePasswordChange}
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          size="large"
        >
          Restablecer Contraseña
        </Button>
      </form>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        message={message}
      />
    </Container>
  );
};

export default PasswordReset;
