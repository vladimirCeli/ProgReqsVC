import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Paper,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";

import {
  responseApi,
  responseApiId,
  questionnairesComplete,
} from "../Services/Fetch";

const Response = () => {
  const { id1, id2, id3 } = useParams();
  const navigate = useNavigate();
  const [questionnaire, setQuestionnaire] = useState(null);
  const [responses, setResponses] = useState({});
  const [responseName, setResponseName] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [currentPracticeIndex, setCurrentPracticeIndex] = useState(0);
  const questionnaireId = id1;

  const loadQuestionnaire = useCallback(async () => {
    try {
      const response = await axios.get(
        questionnairesComplete + questionnaireId
      );
      setQuestionnaire(response.data);
      console.log("Cuestionario cargado");
      console.log(response.data);
      console.log("Score del cuestionario");
    } catch (error) {
      console.error("Error al obtener el cuestionario:", error);
    }
  }, [questionnaireId]);

  useEffect(() => {
    if (id3) {

      setEditMode(true);
      axios
        .get(responseApiId + id3)
        .then((response) => {
          const responseData = response.data;
          setResponseName(responseData.name);
          setResponses(responseData.questions);
          loadQuestionnaire();
        })
        .catch((error) => {
          console.error("Error al obtener la respuesta:", error);
        });
    } else {
      loadQuestionnaire();
    }
  }, []);

  const handleOptionChange = (questionNumber, optionValue) => {
    console.log(
      "Selected option for question",
      questionNumber,
      ":",
      optionValue
    );
    setResponses((prevResponses) => ({
      ...prevResponses,
      [`question${questionNumber}`]: optionValue,
    }));
  };

  const handleNextCategory = () => {
    if (currentCategoryIndex < questionnaire.categories.length - 1) {
      setCurrentCategoryIndex(currentCategoryIndex + 1);
    }
    // Reset practice index when changing the category
    setCurrentPracticeIndex(0);
  };

  const handlePreviousCategory = () => {
    if (currentCategoryIndex > 0) {
      setCurrentCategoryIndex(currentCategoryIndex - 1);
    }
    // Reset practice index when changing the category
    setCurrentPracticeIndex(0);
  };

  const handleNextPractice = () => {
    if (currentPracticeIndex < currentCategory.practices.length - 1) {
      setCurrentPracticeIndex(currentPracticeIndex + 1);
    }
  };

  const handlePreviousPractice = () => {
    if (currentPracticeIndex > 0) {
      setCurrentPracticeIndex(currentPracticeIndex - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedResponses = {};

    questionnaire.categories.forEach((category) => {
      category.practices.forEach((practice) => {
        practice.questions.forEach((question) => {
          const questionId = `question${question._id}`;
          const selectedOption = responses[questionId] || null;

          if (selectedOption !== undefined) {
            formattedResponses[questionId] = selectedOption;
          } else {
            formattedResponses[questionId] = null;
          }
        });
      });
    });

    const data = {
      project_id: id2,
      questionnaire_id: id1,
      name: responseName,
      questions: formattedResponses,
    };

    if (editMode) {
      axios
        .put(responseApiId + id3, data)
        .then(() => {
          navigate(`/listresponses/${id1}/${id2}`);
        })
        .catch((error) => {
          console.error("Error al actualizar la respuesta:", error);
        });
    } else {
      axios
        .post(responseApi, data)
        .then((response) => {
          navigate(`/projects/${id2}`);
        })
        .catch((error) => {
          console.error("Error al crear la respuesta:", error);
        });
    }
  };

  const handleChange = (e) => {
    setResponseName(e.target.value);
  };

  if (!questionnaire) {
    return <div>Cargando...</div>;
  }

  const currentCategory = questionnaire.categories[currentCategoryIndex];

  return (
    <Container maxWidth="lg" style={{ marginTop: "20px" }}>
      <Typography variant="h4" align="center">
        {editMode ? "Editar Respuesta" : "Responder Cuestionario"}:{" "}
        {questionnaire.name}
      </Typography>

      <TextField
        label="Nombre de Respuesta"
        required
        variant="outlined"
        fullWidth
        autoFocus
        sx={{
          mb: 2,
        }}
        value={responseName}
        onChange={handleChange}
      />

      {currentCategory && (
        <Paper elevation={3} style={{ marginBottom: "20px", padding: "20px" }}>
          <Typography variant="h5" align="center" gutterBottom>
            {currentCategory.name}
          </Typography>
          <Typography variant="h6" align="center">
            {currentCategory.practices[currentPracticeIndex].name}
          </Typography>
          {currentCategory.practices[currentPracticeIndex].questions.map(
            (question) => (
              <div key={question._id}>
                <Typography variant="body1" gutterBottom>
                  {question.question}
                </Typography>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Opciones</FormLabel>
                  <RadioGroup
                    row
                    value={
                      responses[`question${question._id}`] !== undefined
                        ? responses[`question${question._id}`]
                        : null
                    }
                    onChange={(e) =>
                      handleOptionChange(question._id, e.target.value)
                    }
                  >
                    {question.options &&
                      question.options.map((option) => (
                        <FormControlLabel
                          key={option._id}
                          value={
                            option.value !== undefined
                              ? option.value.toString()
                              : null
                          }
                          control={<Radio />}
                          label={option.text}
                        />
                      ))}
                  </RadioGroup>
                </FormControl>
              </div>
            )
          )}
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2, flex: 1 }}
              onClick={handlePreviousPractice}
              disabled={currentPracticeIndex === 0}
            >
              Práctica Anterior
            </Button>
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2, flex: 1 }}
              onClick={handleNextPractice}
              disabled={
                currentPracticeIndex === currentCategory.practices.length - 1
              }
            >
              Siguiente Práctica
            </Button>
          </div>
          {currentCategoryIndex > 0 && (
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                mt: 2,
              }}
              onClick={handlePreviousCategory}
            >
              Categoría Anterior
            </Button>
          )}
          {currentCategoryIndex < questionnaire.categories.length - 1 && (
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                mt: 2,
              }}
              onClick={handleNextCategory}
            >
              Siguiente Categoría
            </Button>
          )}
          {currentCategoryIndex === questionnaire.categories.length - 1 &&
            currentPracticeIndex === currentCategory.practices.length - 1 && (
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  mt: 2,
                }}
                onClick={handleSubmit}
              >
               {editMode ? "Guardar Cambios" : "Enviar Respuestas"}
              </Button>
            )}
        </Paper>
      )}
    </Container>
  );
};

export default Response;
