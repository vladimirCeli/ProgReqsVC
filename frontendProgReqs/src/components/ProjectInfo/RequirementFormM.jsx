import {
    Modal,
    Box,
    TextField,
    Button,
    CircularProgress,
} from '@mui/material'

const RequirementModal = ({ 
    open,
    handleClose,
    newRequirement,
    changeRequirements,
    submitRequirements,
    loading,
    editingId,
 }) => {
    return (
        <Modal
            disablebackdropclick={true.toString()}
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
                {editingId ? "Editar Requisito" : "Agregar Requisito"}
              </h2>
              <p id="parent-modal-description">
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
              </p>
              <form onSubmit={submitRequirements}>
                <TextField
                  id="ident_requirement_id"
                  label="Identificación del requerimiento"
                  name="ident_requirement_id"
                  value={newRequirement.ident_requirement_id}
                  onChange={changeRequirements}
                  required
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="name"
                  label="Nombre"
                  name="name"
                  value={newRequirement.name}
                  onChange={changeRequirements}
                  required
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="characteristicsr"
                  label="Características"
                  name="characteristicsr"
                  value={newRequirement.characteristicsr}
                  onChange={changeRequirements}
                  required
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="description"
                  label="Descripción"
                  name="description"
                  value={newRequirement.description}
                  onChange={changeRequirements}
                  required
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="req_no_funtional"
                  label="Requerimiento no funcional"
                  name="req_no_funtional"
                  value={newRequirement.req_no_funtional}
                  onChange={changeRequirements}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="priority_req"
                  label="Prioridad del requerimiento"
                  name="priority_req"
                  value={newRequirement.priority_req}
                  onChange={changeRequirements}
                  required
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={loading}
                  startIcon={loading && <CircularProgress size={20} />}
                  sx={{ mt: 3, mb: 2 }}
                >
                  {editingId ? "Editar" : "Agregar"}
                </Button>
              </form>
            </Box>
          </Modal>
    )
}

export default RequirementModal