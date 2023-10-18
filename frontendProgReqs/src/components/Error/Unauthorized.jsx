
import { Box, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { LockPerson } from "@mui/icons-material";
import { motion } from "framer-motion";
import "./styles.css";

const Unauthorized = () => {
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
        textAlign="center"
        position="relative"
        overflow="hidden"
      >
        {/* Icono de LockPerson en movimiento */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          <LockPerson sx={{ fontSize: 100, color: "error.main" }} />
        </motion.div>
        <Typography variant="h4" sx={{ mt: 2 }}>
          Acceso No Autorizado
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Usted no tiene acceso a la página solicitada.
        </Typography>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div style={{ marginTop: "16px" }}>
            <Button variant="contained" color="primary" onClick={goBack}>
              Regresar
            </Button>
          </div>
        </motion.div>
      </Box>
    </Container>
  );
};

export default Unauthorized;

