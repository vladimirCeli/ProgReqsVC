import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
} from "@mui/material";

const CategoryModal = ({
    isFormVisible,
    handleCancel,
    newCategorieSecurity,
    setnewCategorieSecurity,
    isEditing,
    createOrUpdateQuestion,
}) => {
  return (
    <Modal
          open={isFormVisible}
          onClose={handleCancel}
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
            <Typography variant="h6">
              {isEditing ? "Editar" : "Crear"} Categoría de ASVS
            </Typography>
            <TextField
              label="Nombre"
              name="name"
              value={newCategorieSecurity.name}
              onChange={(e) =>
                setnewCategorieSecurity({
                  ...newCategorieSecurity,
                  name: e.target.value,
                })
              }
              margin="normal"
              variant="outlined"
              fullWidth
            />
            <Button variant="contained" onClick={createOrUpdateQuestion}>
              {isEditing ? "Guardar cambios" : "Crear"}
            </Button>
            <Button variant="contained" onClick={handleCancel}>
              Cancelar
            </Button>
          </Box>
        </Modal>
  );
};

export default CategoryModal;
