import { Grid, Card, CardContent, Typography, Button, TextField } from "@mui/material";

const ProjectForm = ({ editing, handleSubmit, handleChange, loading, project }) => {
    return (
        <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Grid item xs={3} md={6}>
          <Card sx={{ mt: 5 }}>
            <Typography variant="h6" align="center">
              {editing ? "Editar proyecto" : "Crear proyecto"}
            </Typography>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <TextField
                  variant="filled"
                  label="Ingresa el nombre de tu proyecto"
                  fullWidth
                  autoFocus
                  sx={{
                    mb: 2,
                  }}
                  name="name"
                  value={project.name}
                  onChange={handleChange}
                />
                <TextField
                  variant="filled"
                  label="Ingresa la descripción de tu proyecto"
                  fullWidth
                  multiline
                  rows={4}
                  sx={{
                    mb: 2,
                  }}
                  name="description"
                  value={project.description}
                  onChange={handleChange}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={loading}
                  sx={{
                    mt: 2,
                  }}
                >
                  {editing ? "Guardar cambios" : "Crear proyecto"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    )
}

export default ProjectForm