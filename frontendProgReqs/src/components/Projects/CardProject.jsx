import { Grid, Card, CardContent, Typography, Button } from "@mui/material";

const CardProject = ({ projects, handleDelete, navigate }) => {
    return (
        <Grid container spacing={2}>
        {Array.isArray(projects) && (Object.keys(projects).length > 0) ? (
        projects.map((project) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={project.id}>
            <Card key={project.id}>
              <CardContent>
                <Typography variant="h5" component="h2" align="inherit" noWrap>
                  {project.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  align="inherit"
                  noWrap
                >
                  {project.description}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  align="center"
                >
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                    onClick={() => navigate(`/projects/${project.id}`) }
                  >
                    Ver
                  </Button>
                  <Button
                    fullWidth
                    variant="contained"
                    color="secondary"
                    sx={{ mt: 2 }}
                    onClick={() => navigate(`/projects/${project.id}/edit`) }
                  >
                    Editar
                  </Button>
                  <Button
                    fullWidth
                    variant="contained"
                    color="error"
                    sx={{ mt: 2 }}
                    onClick={() => handleDelete(project.id)}
                  >
                    Eliminar
                  </Button>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        
        ))
        ) : (
          <Typography variant="h6" sx={{ mb: 2 }}>
            No hay proyectos
          </Typography>
        )}

      </Grid>
    )
}

export default CardProject