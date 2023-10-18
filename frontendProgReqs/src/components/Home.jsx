import { Container, Button, Typography, Box } from "@mui/material";
import { motion } from "framer-motion";
import { Logo } from "./Logo";
import { Link } from "react-router-dom";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.2, duration: 1 } },
  };

  const textVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { delay: 0.5, duration: 1 } },
  };

  const buttonVariants = {
    hover: {
      scale: 1.1,
      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
      color: "#fff", // Cambiar el color del texto al pasar el mouse
      backgroundColor: "#2683a2", // Cambiar el fondo al pasar el mouse
    },
    animate: {
      y: [0, 5, 0],
      transition: { yoyo: Infinity, duration: 1.5 },
    },
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: "20px" }}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Box display="flex" alignItems="center" justifyContent="center">
          <motion.div
            variants={textVariants}
            initial="hidden"
            animate="visible"
          >
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              textAlign="center"
            >
              <Logo weight={290} height={190} />
              <Typography variant="h3" gutterBottom>
                Bienvenido a Secure Dev
              </Typography>
              <Typography variant="h6" paragraph>
                Potencie su desarrollo con productos seguros y basados en las
                mejores prácticas.
              </Typography>
              <Typography variant="body1" paragraph>
                Cree aplicaciones sólidas y seguras con facilidad. Únase a
                Secure Dev hoy mismo.
              </Typography>
            </Box>
          </motion.div>
        </Box>
        <Box my={3} display="flex" alignItems="center" justifyContent="center">
          <motion.div variants={buttonVariants} animate="animate">
            <Button
              variant="outlined"
              color="primary"
              component={Link}
                to="/login"
                startIcon={<LockOpenIcon />}
            >
              Iniciar Sesión
            </Button>
          </motion.div>
        </Box>
        <Box my={2} display="flex" alignItems="center" justifyContent="center">
          <motion.div variants={buttonVariants} animate="animate">
            <Button
              variant="contained"
              color="primary"
              component={Link}
                to="/register"
                startIcon={<PersonAddIcon />}
              style={{ backgroundColor: "#2683a2", marginTop: "16px" }}
            >
              Registrarse
            </Button>
          </motion.div>
        </Box>
      </motion.div>
    </Container>
  );
};

export default Home;
