import {
  Modal,
  Box,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import SelectItems from "../SelectOpt";

const CategoryModal = ({
  open,
  handleClose,
  category,
  setCategory,
  loading,
  submitCategory,
  categories,
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
          {editingId ? "Editar Categoria" : "Agregar Categoria"}
        </h2>
        <form onSubmit={submitCategory}>
          <TextField
            id="name"
            label="Nombre"
            name="name"
            value={category.name}
            onChange={(e) => setCategory({ ...category, name: e.target.value })}
            required
            fullWidth
            margin="normal"
            variant="outlined"
          />

          <SelectItems
            items={categories}
            values={category.practices.map((p) => p._id)}
            endpoint="subsection"
            onChange={(newSelectedPractices) =>
              setCategory({
                ...category,
                practices: newSelectedPractices.map((practiceId) => ({
                  _id: practiceId,
                })),
              })
            }
            label="Prácticas"
            campo="name"
            selectedQuestions={categories
              .filter((c) => c._id !== editingId)
              .flatMap((c) => c.practices.map((p) => p._id))}
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

export default CategoryModal;
