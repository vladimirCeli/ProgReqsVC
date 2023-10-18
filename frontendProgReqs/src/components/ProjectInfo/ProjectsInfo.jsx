import {
    Card,
    CardContent,
    Typography,
    CardActions,
    Button,
} from '@mui/material'

import RequirementModal from './RequirementFormM'

const ProjectsInfo = ({
    project,
    handleOpen,
    moment,
    open,
    handleClose,
    newRequirement,
    changeRequirements,
    submitRequirements,
    loading,
    editingId,
}) => {
    return (
        <>
        <Typography variant="h6" gutterBottom sx={{ mt: 2 }} align="center">
        Información del proyecto
      </Typography>

      <Card container sx={{ mt: 5 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {project.name}
          </Typography>
          <Typography
            variant="body1"
            gutterBottom
            sx={{ wordBreak: "break-word" }}
          >
            {project.description}
          </Typography>
          <Typography variant="body2" sx={{ mt: 2 }}>
            Proyecto creado el:{" "}
            {moment(project.created_at).format("DD/MM/YYYY")}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={handleOpen}>
            Agregar Requisitos
          </Button>
            <RequirementModal 
                 open={open}
                 handleClose={handleClose}
                 newRequirement={newRequirement}
                 changeRequirements={changeRequirements}
                 submitRequirements={submitRequirements}
                 loading={loading}
                 editingId={editingId}
            />
        </CardActions>
      </Card>
      </>
    )
}

export default ProjectsInfo