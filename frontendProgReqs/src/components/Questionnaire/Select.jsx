/* eslint-disable react/prop-types */

import Select from "../SelectQuestions";

const SelectQuestions = ({ questionnaire, setQuestionnaire }) => {
  const handleQuestionsChange = (newSelectedQuestions) => {
    setQuestionnaire({
      ...questionnaire,
      categories: newSelectedQuestions.map((questionId) => ({
        _id: questionId,
      })),
    });
  };

  return (
    <Select
      label="Categorías"
      campo="name"
      items={questionnaire.categories}
      endpoint="categorie"
      onChange={handleQuestionsChange}
      values={questionnaire.categories.map((q) => q._id)}
    />
  );
};

export default SelectQuestions;
