import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
} from "@mui/material";

const SubCategoryModal = ({
    isFormVisible,
    handleCancel,
    newSubcategories,
    setnewSubcategories,
    isEditing,
    createOrUpdateSubcategories,
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
    <Typography variant="h6" component="h4" gutterBottom>
      {isEditing ? "Editar subcategoria" : "Crear subcategoria"}
    </Typography>
    <TextField
      label="Nombre"
      name="name"
      value={newSubcategories.name}
      onChange={(e) =>
        setnewSubcategories({
          ...newSubcategories,
          name: e.target.value,
        })
      }
      sx={{ mb: 1, mr: 1 }}
    />
    
    <Button
      variant="contained"
      onClick={createOrUpdateSubcategories}
      sx={{ mb: 1, mr: 1 }}
    >
      {isEditing ? "Guardar cambios" : "Crear"}
    </Button>
    <Button variant="contained" onClick={handleCancel} sx={{ mb: 1 }}>
      Cancelar
    </Button>
    </Box>
  </Modal>
  );
};

export default SubCategoryModal;
