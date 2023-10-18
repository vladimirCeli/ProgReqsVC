import {
  Modal,
  Box,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";

import SelectItems from "../SelectOpt";

const ModalComponent = ({
  open,
  handleClose,
  practice,
  setPractice,
  loading,
  ChangePractice,
  submitPractice,
  practices,
  editingId,
  handleOpen,
}) => {
  return (
    <Modal
      disableBackdropClick={true.toString()}
      open={open}
      onClose={handleClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
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
        <h2 id="parent-modal-title">
          {editingId ? "Editar Práctica" : "Agregar Práctica"}
        </h2>
        <form onSubmit={submitPractice}>
          <TextField
            id="name"
            label="Nombre"
            name="name"
            value={practice.name}
            onChange={ChangePractice}
            required
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <SelectItems
            items={practices}
            values={practice.questions.map((q) => q._id)}
            endpoint="question/complete"
            onChange={(newSelectedQuestions) =>
              setPractice({
                ...practice,
                questions: newSelectedQuestions.map((questionId) => ({
                  _id: questionId,
                })),
              })
            }
            label="Preguntas disponibles"
            campo="question"
            selectedQuestions={practices
              .filter((p) => p._id !== editingId)
              .flatMap((p) => p.questions.map((q) => q._id))}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            startIcon={loading && <CircularProgress size={20} />}
            sx={{ mt: 3, mb: 2 }}
          >
            {editingId ? "Guardar" : "Agregar"}
          </Button>
        </form>
        {editingId && (
          <Button
            fullWidth
            variant="outlined"
            color="secondary"
            onClick={handleClose}
            sx={{ mt: 2 }}
          >
            Cancelar
          </Button>
        )}
      </Box>
    </Modal>
  );
};

export default ModalComponent;
