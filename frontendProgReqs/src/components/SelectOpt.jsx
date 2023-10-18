import { useState, useEffect } from "react";
import {
  FormControl,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from "@mui/material";

import { baseURLapi } from "../Services/Fetch";

const SelectQuestions = ({ label, endpoint, campo, onChange, values, selectedQuestions }) => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(baseURLapi + endpoint);
        if (response.ok) {
          const data = await response.json();
          setQuestions(data);
        } else {
          console.error(`Error al obtener ${label}: ${response.statusText}`);
        }
      } catch (error) {
        console.error(`Error al obtener ${label}: ${error}`);
      }
    };

    fetchQuestions();
  }, [endpoint, label]);

  const handleQuestionChange = (questionId) => {
    const updatedValues = values.includes(questionId)
      ? values.filter((id) => id !== questionId)
      : [...values, questionId];
    onChange(updatedValues);
  };

  const isQuestionChecked = (questionId) => values.includes(questionId);

  return (
    <FormControl fullWidth sx={{ mb: 2 }}>
      <FormGroup>
        {questions.length > 0 ? (
          questions.map((question) => {
            const isQuestionSelected = selectedQuestions.includes(question._id);
            return (
              !isQuestionSelected && ( // Mostrar solo preguntas no seleccionadas en otras prácticas
                <FormControlLabel
                  key={question._id}
                  control={
                    <Checkbox
                      checked={isQuestionChecked(question._id)}
                      onChange={() => handleQuestionChange(question._id)}
                    />
                  }
                  label={question[campo].toString()}
                />
              )
            );
          })
        ) : (
          <p>No hay {label}</p>
        )}
      </FormGroup>
    </FormControl>
  );
};

export default SelectQuestions;
