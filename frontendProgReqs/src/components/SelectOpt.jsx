/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
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
    <div className="w-full mb-2">
      {questions.length > 0 ? (
        questions.map((question) => {
          const isQuestionSelected = selectedQuestions.includes(question._id);
          return (
            !isQuestionSelected && ( // Mostrar solo preguntas no seleccionadas en otras prácticas
              <div key={question._id} className="mb-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={isQuestionChecked(question._id)}
                    onChange={() => handleQuestionChange(question._id)}
                    className="mr-2"
                  />
                  <span>{question[campo].toString()}</span>
                </label>
              </div>
            )
          );
        })
      ) : (
        <p>No hay {label}</p>
      )}
    </div>
  );
};

export default SelectQuestions;
