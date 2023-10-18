import {
    Box,
    CardContent,
    Grid,
    IconButton,
    Paper,
    Typography,
} from "@mui/material";

import { motion } from "framer-motion";
import VisibilityIcon from '@mui/icons-material/Visibility';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';


const variants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
  };


const ProjectsQuestionnaires = ({ 
    questionnaires,
    params,
    navigate,
 }) => {
    return (
        <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
  <Typography variant="h4" gutterBottom>
    Lista de cuestionarios habilitados
  </Typography>
  <Grid container spacing={2}>
    {Array.isArray(questionnaires) && questionnaires.length > 0 ? (
      questionnaires.map((project) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={project._id}>
          <motion.div
            key={project._id}
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
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                    onClick={() => navigate(`/response/${project._id}/${params.id}`)}
                  >
                    <PlayCircleFilledWhiteIcon />
                  </IconButton>
                  <IconButton
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                    onClick={() => navigate(`/listresponses/${project._id}/${params.id}`)}
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
        No hay cuestionarios habilitados
      </Typography>
    )}
  </Grid>
</Box>
    )

}

export default ProjectsQuestionnaires