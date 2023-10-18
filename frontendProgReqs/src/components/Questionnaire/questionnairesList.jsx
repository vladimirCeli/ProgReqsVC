import { useEffect, useState } from "react";
import { Grid, Paper, IconButton, Switch, CardContent, Box, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  questionnairesApi,
  questionnairesbyidApi,
  questionnairesEditPublished,
} from "../../Services/Fetch";

import DeleteConfirmationModal from "../Modal/DeleteConfirmationModal";

const variants = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0 },
};

const QuestionnairesList = () => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [categoryToDeleteId, setCategoryToDeleteId] = useState(null);

  const handleDeleteConfirmation = (id) => {
    setCategoryToDeleteId(id);
    setDeleteModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(questionnairesbyidApi + id, {
        method: "DELETE",
      });
      loadProjects();
      setDeleteModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const [questionnaire, setQuestionnaire] = useState([]);
  const navigate = useNavigate();

  const loadProjects = async () => {
    const res = await fetch(questionnairesApi);
    setQuestionnaire(await res.json());
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const togglePublish = async (id) => {
    try {
      const currentQuestionnaire = questionnaire.find((q) => q._id === id);
      if (currentQuestionnaire) {
        const newPublishedState = !currentQuestionnaire.published;

        const response = await fetch(questionnairesEditPublished + id, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ published: newPublishedState }),
        });

        if (response.ok) {
          const updatedQuestionnaire = await response.json();
          const updatedQuestionnaireId = updatedQuestionnaire._id;
          const updatedQuestionnairePublished = updatedQuestionnaire.published;
          const updatedQuestionnaires = questionnaire.map((q) =>
            q._id === updatedQuestionnaireId
              ? { ...q, published: updatedQuestionnairePublished }
              : q
          );
          setQuestionnaire(updatedQuestionnaires);
        } else {
          console.error("Error al actualizar el cuestionario en el servidor");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <DeleteConfirmationModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onDelete={() => handleDelete(categoryToDeleteId)}
      />
      <Box display="flex" flexDirection="column" alignItems="center">
        <h1>Lista de cuestionarios</h1>
        <Typography variant="h6" sx={{ mb: 2 }}></Typography>
        <Grid container spacing={2}>
          {Array.isArray(questionnaire) && Object.keys(questionnaire).length > 0 ? (
            questionnaire.map((project) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={project._id}>
                <motion.div
                  key={project._id}
                  initial="hidden"
                  animate="visible"
                  variants={variants}
                >
                  <Paper
                    elevation={3}
                    style={{
                      borderRadius: "16px",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
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
                            navigate(`/questionnaire/${project._id}/edit`)
                          }
                          aria-label="Editar"
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => handleDeleteConfirmation(project._id)}
                          aria-label="Eliminar"
                        >
                          <DeleteIcon />
                        </IconButton>
                        <Switch
                          color="success"
                          checked={project.published || false}
                          onChange={() => togglePublish(project._id)}
                          name="publicar"
                        />
                      </Box>
                    </CardContent>
                  </Paper>
                </motion.div>
              </Grid>
            ))
          ) : (
            <Typography variant="h6" sx={{ mb: 2 }}>
              No hay cuestionarios
            </Typography>
          )}
        </Grid>
      </Box>
    </div>
  );
};

export default QuestionnairesList;
