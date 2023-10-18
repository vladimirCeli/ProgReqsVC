import {
    Typography,
    Card,
    CardContent,
    Box,
    CardActions,
    Button,
} from '@mui/material'

const RequirementsProjects = ({ 
    requirements,
    moment,
    navigate,
    handleDelete,
    handleEdit,
    errors,
 }) => {
    return (
      <>
        <Typography variant="h6" gutterBottom sx={{ mt: 2 }} align="center">
        Requisitos
      </Typography>
      {requirements.length > 0 ? (
        requirements.map((requirement) => (
          <Card container sx={{ mt: 2 }} key={requirement.id}>
            <CardContent>
              <Box>
                <Typography variant="body1" gutterBottom>
                  {requirement.name}
                </Typography>
                <Typography variant="body2" sx={{ mt: 2 }}>
                  {requirement.description}
                </Typography>
                <Typography variant="body2" sx={{ mt: 2 }}>
                  Requisito creado el:{" "}
                  {moment(requirement.created_at).format("DD/MM/YYYY")}
                </Typography>
              </Box>
            </CardContent>
            <CardActions>
              <Button
                onClick={() =>
                  navigate(`/requirements/project/${requirement.id}`)
                }
              >
                Ver
              </Button>
              <Button onClick={() => handleEdit(requirement.id)}>Editar</Button>
              <Button onClick={() => handleDelete(requirement.id)}>
                Eliminar
              </Button>
            </CardActions>
          </Card>
        ))
      ) : errors ? (
        <Typography variant="h6" sx={{ mb: 2 }}>
          {errors}
        </Typography>
      ) : (
        <Typography variant="h6" sx={{ mb: 2 }}>
          No hay requisitos
        </Typography>
      )}
      </>
    )
}

export default RequirementsProjects
