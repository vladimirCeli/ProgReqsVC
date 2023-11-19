import { useState, useEffect } from "react";
import { questionApi, questionbyidApi } from "../../Services/Fetch";
import QuestionTable from "../../components/Questions/QuestionTable";
import QuestionForm from "../../components/Questions/QuestionForm";
import DeleteConfirmationModal from "../../components/Modal/DeleteConfirmationModal";
import useToast from "../../hooks/useToast";

const Questions = () => {
  const { toast } = useToast();
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({
    question: "",
    options: [
      { text: "", value: 0, placeholder: "Tiene un valor de 0" },
      { text: "", value: 0.25, placeholder: "Tiene un valor de 0.25" },
      { text: "", value: 0.5, placeholder: "Tiene un valor de 0.5" },
      { text: "", value: 1, placeholder: "Tiene un valor de 1" },
    ],
  });
  const [editingQuestionId, setEditingQuestionId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [questionToDeleteId, setQuestionToDeleteId] = useState(null);

  useEffect(() => {
    // Cargar preguntas al montar el componente
    fetchQuestions(currentPage);
  }, [currentPage]);

  const handleDeleteConfirmation = (id) => {
    setQuestionToDeleteId(id);
    setDeleteModalOpen(true);
  };

  const fetchQuestions = async (page) => {
    try {
      const response = await fetch(`${questionApi}?page=${page}`);
      if (response.ok) {
        const data = await response.json();
        setQuestions(data.questions);
        setTotalPages(Math.ceil(data.totalQuestions / 5)); // Suponiendo 10 preguntas por página
      } else {
        console.error("Error al obtener las preguntas:", response.statusText);
      }
    } catch (error) {
      console.error("Error al obtener las preguntas:", error);
    }
  };

  const handleCreateQuestion = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const createNewQuestion = async () => {
    try {
      const response = await fetch(questionApi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newQuestion),
      });
      if (response.ok) {
        const successData = await response.json();
        toast.success(successData.success);
        setIsModalOpen(false);
        fetchQuestions(currentPage);
        resetForm();
      }
    } catch (error) {
      console.error("Error al crear la pregunta:", error);
    }
  };

  const saveEditedQuestion = async () => {
    try {
      const response = await fetch(questionbyidApi + editingQuestionId, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newQuestion),
      });

      if (response.ok) {
        const successData = await response.json();
        toast.success(successData.success);
        setIsModalOpen(false);
        fetchQuestions(currentPage);
        resetForm();
      } else {
        setIsModalOpen(false);
        fetchQuestions(currentPage);
        resetForm();
        const errorData = await response.json();
        toast.error(errorData.error);
        console.error("Error al editar la pregunta:", response.statusText);
      }
    } catch (error) {
      console.error("Error al editar la pregunta:", error);
    }
  };

  const handleEditQuestion = (questionId) => {
    const selectedQuestion = questions.find((q) => q._id === questionId);
    setNewQuestion(selectedQuestion);
    setEditingQuestionId(questionId);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const createOrUpdateQuestion = () => {
    if (isEditing) {
      saveEditedQuestion();
    } else {
      createNewQuestion();
    }
  };

  const handleDeleteQuestion = async (questionId) => {
    try {
      const response = await fetch(questionbyidApi + questionId, {
        method: "DELETE",
      });

      if (response.ok) {
        const successData = await response.json();
        toast.success(successData.success);
        fetchQuestions(currentPage);
        setDeleteModalOpen(false);
      } else {
        const errorData = await response.json();
        toast.error(errorData.error);
        fetchQuestions(currentPage);
        setDeleteModalOpen(false);
      }
    } catch (error) {
      console.error("Error al eliminar la pregunta:", error);
    }
  };

  const handleOptionChange = (index, key, value) => {
    const newOptions = [...newQuestion.options];
    newOptions[index][key] = value;
    setNewQuestion({ ...newQuestion, options: newOptions });
  };

  const resetForm = () => {
    setNewQuestion({
      question: "",
      options: [
        { text: "", value: 0, placeholder: "Tiene un valor de 0" },
        { text: "", value: 0.25, placeholder: "Tiene un valor de 0.25" },
        { text: "", value: 0.5, placeholder: "Tiene un valor de 0.5" },
        { text: "", value: 1, placeholder: "Tiene un valor de 1" },
      ],
    });
    setEditingQuestionId(null);
    setIsEditing(false);
  };

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-4">Preguntas</h1>
        <p className="text-lg mb-4">
          Página {currentPage} de {totalPages}
        </p>
        <div className="m-5">
          <button
            onClick={handleCreateQuestion}
            className="text-white font-bold py-2 px-4 rounded"
            style={{ backgroundColor: "#2c3e50" }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#465669")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#2c3e50")}
          >
            Nuevo
          </button>
        </div>
        <QuestionForm
          isModalOpen={isModalOpen}
          handleCancel={handleCancel}
          newQuestion={newQuestion}
          setNewQuestion={setNewQuestion}
          isEditing={isEditing}
          handleOptionChange={handleOptionChange}
          createOrUpdateQuestion={createOrUpdateQuestion}
        />
        <QuestionTable
          questions={questions}
          handleEditQuestion={handleEditQuestion}
          handleDeleteQuestion={handleDeleteConfirmation}
        />
        <DeleteConfirmationModal
          open={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onDelete={() => handleDeleteQuestion(questionToDeleteId)}
        />
        <div className="flex justify-center mt-4">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1 || totalPages === 0}
            className={` text-white font-bold py-2 px-4 rounded mt-2 flex-1 ${
              currentPage === 1 || totalPages === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-900 hover:bg-blue-800"
            }`}
          >
            Anterior
          </button>
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages || totalPages === 0 || currentPage >= totalPages}
            className={` text-white font-bold py-2 px-4 rounded mt-2 flex-1 ${
              currentPage === totalPages || totalPages === 0 || currentPage >= totalPages
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-900 hover:bg-blue-800"
            }`}
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
};

export default Questions;
