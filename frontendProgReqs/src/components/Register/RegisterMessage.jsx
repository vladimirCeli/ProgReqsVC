import { Typography, Paper, Container } from "@mui/material";

const RegisterMessage = () => {
  return (
    <Container component="main" maxWidth="xs">
      <Paper
        sx={{
          marginTop: 4,
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        elevation={3}
      >
        <Typography variant="h5" sx={{ textAlign: "center" }}>
          Mensaje de Registro
        </Typography>
        <Typography variant="body1" sx={{ textAlign: "center" }}>
        <p>Estimado usuario,</p>
        <p> Gracias por registrarte.</p>
          <p>Por favor, verifica tu correo electrónico
          para confirmar tu cuenta. Tienes un plazo máximo de 5 minutos para
          hacerlo.</p>
          <p>Puedes cerrar esta ventana</p>
        </Typography>
      </Paper>
    </Container>
  );
};

export default RegisterMessage;
