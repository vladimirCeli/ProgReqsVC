/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { baseURLapi } from "../Services/Fetch";

const SelectQuestions = ({ label, endpoint, campo, onChange, values }) => {
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
    <div className="mb-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="mt-1">
        {questions.length > 0 ? (
          questions.map((question) => (
            <div key={question._id} className="flex items-center">
              <input
                type="checkbox"
                id={question._id}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                checked={isQuestionChecked(question._id)}
                onChange={() => handleQuestionChange(question._id)}
              />
              <label htmlFor={question._id} className="ml-2 block text-sm text-gray-900">
                {question[campo].toString()}
              </label>
            </div>
          ))
        ) : (
          <p>No hay {label} disponibles</p>
        )}
      </div>
    </div>
  );
};

export default SelectQuestions;
