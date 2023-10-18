import { useState } from 'react';
import {
  Typography,
  Container,
  TextField,
  Button,
  CssBaseline,
  Grid,
  Box,
  LinearProgress,
  CircularProgress
} from '@mui/material';

import zxcvbn from 'zxcvbn';
import { useNavigate, Link } from 'react-router-dom';
import { Logo } from '../Logo';
import { register } from '../../Services/Fetch';

const Register = ({ onSuccessRegistration }) => {
    const navigate = useNavigate();

    const [values, setValues] = useState({
      first_name: '',
      last_name: '',
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
    });
  
    const [error, setError] = useState('');
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
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setValues({ ...values, [name]: value });
  
      if (name === 'password') {
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
        setError('Las contraseñas no coinciden');
        return;
      }
  
      try {
        const response = await fetch(register, {
          method: 'POST',
          body: JSON.stringify(values),
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        const data = await response.json();
        if (response.ok) {
          onSuccessRegistration();
          navigate('/registermessage');
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
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          style={{
            marginTop: '50px',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          elevation={3}
        >
          <Logo weight={250} height={150} />
          <Typography style={{ padding: '15px' }} variant="h5" component="h1">
            Registro
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="first_name"
                  label="Nombre"
                  name="first_name"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="last_name"
                  label="Apellido"
                  name="last_name"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  type="email"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Nombre de usuario"
                  name="username"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="password"
                  label="Contraseña"
                  name="password"
                  type="password"
                  onChange={handleChange}
                />
                {values.password && (
                  <div>
                    <LinearProgress
                      variant="determinate"
                      value={(Object.values(passwordRequirements).filter(Boolean).length / 7) * 100}
                      sx={{ width: '100%', marginTop: '8px' }}
                    />
                    <Typography variant="body2" color="textSecondary">
                      Fortaleza de la contraseña: {passwordStrength === 0 ? 'Débil' : passwordStrength === 4 ? 'Fuerte' : 'Moderada'}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" style={{ marginTop: '8px' }}>
                      Requisitos de contraseña:
                      <ul>
                        <li>Mínimo 12 caracteres: {passwordRequirements.minChars ? 'Cumple' : 'No cumple'}</li>
                        <li>Máximo 30 caracteres: {passwordRequirements.maxChars ? 'Cumple' : 'No cumple'}</li>
                        <li>Al menos una letra mayúscula: {passwordRequirements.hasUppercase ? 'Cumple' : 'No cumple'}</li>
                        <li>Al menos una letra minúscula: {passwordRequirements.hasLowercase ? 'Cumple' : 'No cumple'}</li>
                        <li>Al menos un dígito: {passwordRequirements.hasDigits ? 'Cumple' : 'No cumple'}</li>
                        <li>Al menos un símbolo: {passwordRequirements.hasSymbols ? 'Cumple' : 'No cumple'}</li>
                        <li>Sin espacios: {passwordRequirements.noSpaces ? 'Cumple' : 'No cumple'}</li>
                        <li>No es una contraseña común: {passwordRequirements.notCommon ? 'Cumple' : 'No cumple'}</li>
                      </ul>
                    </Typography>
                  </div>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="confirmPassword"
                  label="Confirmar Contraseña"
                  name="confirmPassword"
                  type="password"
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            {error && (
              <Typography variant="body2" color="error" style={{ marginTop: '8px' }}>
                {error}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              startIcon={
                loading && (
                  <CircularProgress
                    size={16}
                    color="inherit"
                    style={{ marginRight: '8px' }}
                  />
                )
              }
              style={{ backgroundColor: '#2683a2' }}
              sx={{ mt: 3, mb: 2 }}
            >
              Registrarse
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link variant="body2" color="textSecondary" to='/login'>
                  ¿Ya tienes una cuenta?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    );
  }
  

export default Register