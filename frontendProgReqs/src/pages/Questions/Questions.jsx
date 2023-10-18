import  { useState, useEffect } from "react";
import { Button, Typography, Container, Snackbar, Alert } from "@mui/material";

import { questionApi, questionbyidApi } from "../../Services/Fetch";
import QuestionTable from "../../components/Questions/QuestionTable";
import QuestionForm from "../../components/Questions/QuestionForm";
import DeleteConfirmationModal from "../../components/Modal/DeleteConfirmationModal";

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({
    question: "",
    options: [
      { text: "", value: 0 },
      { text: "", value: 0.25 },
      { text: "", value: 0.5 },
      { text: "", value: 1 },
    ],
  });
  const [editingQuestionId, setEditingQuestionId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [message, setMessage] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [color, setColor] = useState(null);

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
        setMessage(successData.success);
        setColor("success");
        setSnackbarOpen(true);
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
        setMessage(successData.success);
        setColor("success");
        setSnackbarOpen(true);
        setIsModalOpen(false);
        fetchQuestions(currentPage);
        resetForm();
      } else {
        setIsModalOpen(false);
        fetchQuestions(currentPage);
        resetForm();
        const errorData = await response.json();
        setMessage(errorData.error);
        setColor("error");
        setSnackbarOpen(true);
        console.error("Error al editar la pregunta:", response.statusText);
      }
    } catch (error) {
      console.error("Error al editar la pregunta:", error);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
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
        setColor("success");
        setMessage(successData.success);
        setSnackbarOpen(true);
        fetchQuestions(currentPage);
        setDeleteModalOpen(false);
      } else {
        const errorData = await response.json();
        setColor("error");
        setMessage(errorData.error);
        setSnackbarOpen(true);
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
        { text: "", value: 0 },
        { text: "", value: 0.25 },
        { text: "", value: 0.5 },
        { text: "", value: 1 },
      ],
    });
    setEditingQuestionId(null);
    setIsEditing(false);
  };

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: "20px" }}>
      {" "}
      <Typography variant="h4">Preguntas</Typography>
      <Typography variant="subtitle1">
        Página {currentPage} de {totalPages}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleCreateQuestion}
      >
        Nuevo
      </Button>
      <QuestionForm
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        newQuestion={newQuestion}
        setNewQuestion={setNewQuestion}
        isEditing={isEditing}
        handleOptionChange={handleOptionChange}
        createOrUpdateQuestion={createOrUpdateQuestion}
      />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000} // Adjust as needed
        onClose={handleCloseSnackbar}
      >
        <Alert severity={color} onClose={handleCloseSnackbar}>
          {message}
        </Alert>
      </Snackbar>
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
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Anterior
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Siguiente
        </Button>
      </div>
    </Container>
  );
};

export default Questions;
