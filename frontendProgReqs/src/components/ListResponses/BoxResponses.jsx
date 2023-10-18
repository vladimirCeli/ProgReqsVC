import { Typography, Paper, Grid, CardContent, Box, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { motion } from "framer-motion";

const variants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
  };

const BoxResponses = ({
    response,
    handleDelete,
    id1,
    id2,
    navigate,
 }) => {
  return (
   <Box display="flex" flexDirection="column" alignItems="center">
        <h1>Lista de Respuestas</h1>
        <Typography variant="h6" sx={{ mb: 2 }}></Typography>
        <Grid container spacing={2}>
          {Array.isArray(response) &&
          Object.keys(response).length > 0 ? (
            response.map((project) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={project.id}>
                <motion.div
                  key={project.id}
                  initial="hidden"
                  animate="visible"
                  variants={variants}
                >
                  <Paper elevation={3} style={{ borderRadius: "16px", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
                    <CardContent>
                      <Typography
                        variant="h5"
                        component="h2"
                        align="inherit"
                        noWrap
                      >
                        {project.name}
                      </Typography>
                      <Box mt={2} mb={1}>
                        <IconButton
                          color="secondary"
                          onClick={() =>
                            navigate(`/response/${id1}/${id2}/${project._id}/edit`)
                          }
                          aria-label="Editar"
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => handleDelete(project._id)}
                          aria-label="Eliminar"
                        >
                          <DeleteIcon />
                        </IconButton>
                        <IconButton
                          color="success"
                          onClick={() => navigate(`/graphicsresults/${id1}/${id2}/${project._id}`)}
                          aria-label="Ver"
                        >
                            <VisibilityIcon />
                        </IconButton>
                      </Box>
                    </CardContent>
                  </Paper>
                </motion.div>
              </Grid>
            ))
          ) : (
            <Typography variant="h6" sx={{ mb: 2 }}>
              No hay Respuestas
            </Typography>
          )}
        </Grid>
      </Box>
  );
};

export default BoxResponses;
