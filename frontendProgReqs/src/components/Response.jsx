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
import useToast from "../hooks/useToast";

import {
  responseApi,
  responseApiId,
  questionnairesComplete,
} from "../Services/Fetch";

const Response = () => {
  const { toast } = useToast();
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

      const response = await fetch(responseApiId + id3, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data2 = await response.json();
      if (response.ok) {
        toast.success(data2.message);
        navigate(`/listresponses/${id1}/${id2}`);
      } else {
        toast.error(data2.message);
      }
    } else {

      const response = await fetch(responseApi, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data2 = await response.json();
      if (response.ok) {
        toast.success(data2.message);
        navigate(`/projects/${id2}`);
      } else {
        toast.error(data2.message);
      }
    }
  };

  const handleChange = (e) => {
    setResponseName(e.target.value);
  };

  if (!questionnaire) {
    return <div className="container mx-auto mt-10">Cargando...</div>;
  }

  const currentCategory = questionnaire.categories[currentCategoryIndex];

  return (

      <div className="container mx-auto px-4">
        <div className="container mx-auto mt-10 p-4 md:p-8 bg-white bg-opacity-75 rounded-lg shadow-lg">
          <h1 className="text-4xl text-center mb-4 text-blue-900">
            {editMode ? "Editar Respuesta" : "Responder Cuestionario"}:{" "}
            {questionnaire.name}
          </h1>

          <input
            type="text"
            placeholder="Nombre de Respuesta"
            required
            className="w-full border-2 border-gray-300 rounded-md p-2 mb-4 shadow-md transition-all duration-300 focus:outline-none focus:shadow-md"
            autoFocus
            value={responseName}
            onChange={handleChange}
          />

          {currentCategory && (
            <div className="p-4 mb-4 shadow-md rounded-md bg-gray-100">
              <h2 className="text-2xl text-center mb-2 text-blue-900">
                {currentCategory.name}
              </h2>
              <h3 className="text-xl text-center text-blue-800">
                {currentCategory.practices[currentPracticeIndex].name}
              </h3>
              {currentCategory.practices[currentPracticeIndex].questions.map(
                (question) => (
                  <div
                    key={question._id}
                    className="mb-4 shadow-md rounded-md p-4 bg-white"
                  >
                    <p className="text-lg mb-2 text-gray-800">
                      {question.question}
                    </p>
                    <div className="space-y-2">
                      {question.options &&
                        question.options.map((option) => (
                          <label
                            key={option._id}
                            className="block text-gray-800"
                          >
                            <input
                              type="radio"
                              value={option.value}
                              checked={
                                responses[`question${question._id}`] ===
                                option.value
                              }
                              onChange={() =>
                                handleOptionChange(question._id, option.value)
                              }
                              className="mr-2"
                            />
                            {option.text}
                          </label>
                        ))}
                    </div>
                  </div>
                )
              )}
              <div className="flex justify-between">
                <button
                  className={`text-white font-bold py-2 px-4 rounded mt-2 flex-1 ${
                    currentPracticeIndex === 0
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-900 hover:bg-blue-800"
                  }`}
                  onClick={handlePreviousPractice}
                  disabled={currentPracticeIndex === 0}
                >
                  Práctica Anterior
                </button>
                <button
                  className={`text-white font-bold py-2 px-4 rounded mt-2 flex-1 ${
                    currentPracticeIndex ===
                    currentCategory.practices.length - 1
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-900 hover:bg-blue-800"
                  }`}
                  onClick={handleNextPractice}
                  disabled={
                    currentPracticeIndex ===
                    currentCategory.practices.length - 1
                  }
                >
                  Siguiente Práctica
                </button>
              </div>

              {currentCategoryIndex > 0 && (
                <button
                  className="text-white font-bold py-2 px-4 rounded mt-2 w-full bg-blue-900 hover:bg-blue-800"
                  onClick={handlePreviousCategory}
                >
                  Categoría Anterior
                </button>
              )}
              {currentCategoryIndex < questionnaire.categories.length - 1 && (
                <button
                  className="text-white font-bold py-2 px-4 rounded mt-2 w-full bg-blue-900 hover:bg-blue-800"
                  onClick={handleNextCategory}
                >
                  Siguiente Categoría
                </button>
              )}
              {currentCategoryIndex === questionnaire.categories.length - 1 &&
                currentPracticeIndex ===
                  currentCategory.practices.length - 1 && (
                  <button
                    type="submit"
                    className="bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded mt-2 w-full"
                    onClick={handleSubmit}
                  >
                    {editMode ? "Guardar Cambios" : "Enviar Respuestas"}
                  </button>
                )}
            </div>
          )}
        </div>
      </div>
    
  );
};

export default Response;
