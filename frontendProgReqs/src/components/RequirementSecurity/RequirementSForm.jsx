import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";

const RequirementSModal = ({
  isFormVisible,
  handleCancel,
  newRequirementSecurity,
  setnewRequirementSecurity,
  isEditing,
  createOrUpdateRequirementSecurity,
}) => {
  const nivelOptions = [
    { label: "Nivel 1", value: 1 },
    { label: "Nivel 2", value: 2 },
    { label: "Nivel 3", value: 3 },
  ];
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
          {isEditing ? "Editar requerimiento" : "Crear requerimiento"}
        </Typography>
        <TextField
          label="Numeración"
          value={newRequirementSecurity.numeration}
          onChange={(e) =>
            setnewRequirementSecurity({
              ...newRequirementSecurity,
              numeration: e.target.value,
            })
          }
          sx={{ mb: 1, mr: 1 }}
        />
        <Select
          label="Nivel de requerimientos"
          value={newRequirementSecurity.level_requirements}
          onChange={(e) =>
            setnewRequirementSecurity({
              ...newRequirementSecurity,
              level_requirements: e.target.value,
            })
          }
          multiple // Habilita selección múltiple
          sx={{ mb: 1, mr: 1 }}
        >
          {nivelOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        <TextField
          label="Descripción"
          value={newRequirementSecurity.description}
          onChange={(e) =>
            setnewRequirementSecurity({
              ...newRequirementSecurity,
              description: e.target.value,
            })
          }
          sx={{ mb: 1, mr: 1 }}
        />
        <TextField
          label="CWE"
          value={newRequirementSecurity.cwe}
          onChange={(e) =>
            setnewRequirementSecurity({
              ...newRequirementSecurity,
              cwe: e.target.value,
            })
          }
          sx={{ mb: 1, mr: 1 }}
        />
        <TextField
          label="NIST"
          value={newRequirementSecurity.nist}
          onChange={(e) =>
            setnewRequirementSecurity({
              ...newRequirementSecurity,
              nist: e.target.value,
            })
          }
          sx={{ mb: 1, mr: 1 }}
        />
        <Button
          variant="contained"
          onClick={createOrUpdateRequirementSecurity}
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

export default RequirementSModal;
