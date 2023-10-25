import { useRef, useState, useEffect } from "react";

import {
  Typography,
  Container,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Box,
  CssBaseline,
  CircularProgress,
} from "@mui/material";

import { useNavigate, useLocation, Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useInput from "../../hooks/useInput";
import useToggle from "../../hooks/useToggle";
import { login } from "../../Services/Fetch";
import { Logo } from "../Logo";

const Login = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/listsprojects";

  const userRef = useRef();

  const [values, handleChange] = useInput("user", {
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState("");
  const [check, toggleCheck] = useToggle("persist", false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrors("");
  }, [values]);

  const [, setLoginSuccessful] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const resp = await fetch(login, {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await resp.json();
      if (resp.ok) {
        const username = values?.username;
        const accessToken = data?.token;
        const roles = data?.rol_id;

        setAuth({
          username,
          accessToken,
          roles,
        });
        setLoginSuccessful(true);
        navigate(from, { replace: true });
        if (roles === 1) navigate("/managequestionnaire");
        if (roles === 2) navigate("/listsprojects");
      } else {
        setLoading(false);
        setErrors(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
    >
      <CssBaseline />
      <Box
        elevation={3}
        sx={{
          marginTop: "50px",
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          textAlign="center"
        >
          <Logo width={80} height={60} /> 
          <Typography style={{ padding: "15px" }} variant="h5">
            Iniciar sesión
          </Typography>
        </Box>
        <form
          onSubmit={handleSubmit}
          style={{ width: "100%", marginTop: "16px" }}
        >
          <TextField
            label="Nombre de usuario"
            name="username"
            type="text"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            inputRef={userRef}
            {...handleChange}
          />
          <TextField
            label="Contraseña"
            name="password"
            type="password"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            {...handleChange}
          />
          <FormControlLabel
            control={
              <Checkbox id="persist" checked={check} onChange={toggleCheck} />
            }
            label="Mantener sesión iniciada"
          />
          {errors && (
            <Typography
              variant="body2"
              color="error"
              style={{ marginTop: "8px" }}
            >
              {errors}
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
                  style={{ marginRight: "8px" }}
                />
              )
            }
            sx={{
              mt: 2,
            }}
          >
            Ingresar
          </Button>
          
            <Typography>
              <Link to="/request-password-reset" variant="body2">
                Recuperar Contraseña?
              </Link>
            </Typography>
            <Typography >
              <Link to="/register" variant="body2">
                Regístrate
              </Link>
            </Typography>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
