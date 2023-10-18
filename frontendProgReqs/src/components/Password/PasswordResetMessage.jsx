import { Typography, Paper, Container } from "@mui/material";

const PasswordResetMessage = () => {
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
        Restablecimiento de Contraseña Exitoso
        </Typography>
        <Typography variant="body1" sx={{ textAlign: "center" }}>
        <p>Estimado usuario,</p>
      <p>Le informamos que su contraseña ha sido restablecida exitosamente.</p>
      <p>A partir de este momento, puede utilizar su nueva contraseña para iniciar sesión en su cuenta de forma segura.</p>
      <p>Si no ha realizado esta solicitud o necesita asistencia adicional, por favor, póngase en contacto con nuestro equipo de soporte.</p>
      <p>Gracias por confiar en nuestros servicios.</p>
      <p>Puede cerrar esta ventana.</p>
        </Typography>
      </Paper>
    </Container>
  );
};

export default PasswordResetMessage;
