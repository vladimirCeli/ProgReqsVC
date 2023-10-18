
import { Box, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ErrorOutline } from "@mui/icons-material";
import "./styles.css"; 

const NotFoundError = () => {
  const navigate = useNavigate();

  const goBack = () => navigate("/");

  return (
    <Container maxWidth="sm">
      <Box
        className="not-found-container"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="80vh"
      >
        <ErrorOutline sx={{ fontSize: 100, color: "error.main" }} />
        <Typography variant="h4">¡Oops! Página No Encontrada</Typography>
        <br />
        <Typography variant="body1">
          Parece que te has perdido en el ciberespacio.
        </Typography>
        <div style={{ marginTop: "16px" }}>
          <Button variant="contained" color="primary" onClick={goBack}>
            Regresar
          </Button>
        </div>
      </Box>
    </Container>
  );
};

export default NotFoundError;
