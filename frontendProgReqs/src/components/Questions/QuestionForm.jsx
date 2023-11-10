/* eslint-disable react/prop-types */
import { TextField, Typography, Button, Modal, Box } from "@mui/material";

const QuestionForm = ({
  isModalOpen,
  newQuestion,
  setNewQuestion,
  isEditing,
  handleOptionChange,
  createOrUpdateQuestion,
  handleCancel,
}) => {
  return (
    <Modal
      open={isModalOpen}
      onClose={handleCancel}
      aria-labelledby="question-modal-title"
      aria-describedby="question-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          pt: 2,
          px: 4,
          pb: 3,
        }}
      >
        <h2 id="question-modal-title">
          {isEditing ? "Editar Pregunta" : "Nueva Pregunta"}
        </h2>
        <TextField
          label="Nueva Pregunta"
          variant="outlined"
          value={newQuestion.question}
          onChange={(e) =>
            setNewQuestion({ ...newQuestion, question: e.target.value })
          }
        />
        <div>
          <Typography variant="h6">Opciones</Typography>
          {newQuestion.options.map((option, index) => (
            <div key={index}>
              <TextField
                variant="filled"
                label={`Opción ${index + 1}`}
                fullWidth
                sx={{
                  mb: 2,
                }}
                value={option.text}
                onChange={(e) =>
                  handleOptionChange(index, "text", e.target.value)
                }
              />
            </div>
          ))}
        </div>
        <Button
          variant="outlined"
          color="primary"
          onClick={createOrUpdateQuestion}
        >
          {isEditing ? "Guardar" : "Crear"}
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleCancel}>
          Cancelar
        </Button>
      </Box>
    </Modal>
  );
};

export default QuestionForm;
