import { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
  Avatar,
} from "@mui/material";
import QuizIcon from "@mui/icons-material/Quiz";
import { useNavigate, useParams } from "react-router-dom";
import SelectQuestions from "../../components/Questionnaire/Select";
import {
  fetchQuestionnaire,
  saveQuestionnaire,
} from "../../components/Questionnaire/QuestionnaireFetch";
const Questionnaire = () => {
  const [questionnaire, setQuestionnaire] = useState({
    name: "",
    categories: [],
  });
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [color, setColor] = useState(null);
  const [message, setMessage] = useState(null);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setEditing(true);
      fetchQuestionnaire(id, setQuestionnaire);
    }
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setQuestionnaire({
      ...questionnaire,
      [name]: value,
    });
  };

  const handleSaveQuestionnaire = async () => {
    setLoading(true);
    const result = await saveQuestionnaire(
      questionnaire,
      editing,
      id,
      navigate,
      setLoading
    );

    if (result.error) {
      setColor("error");
      setMessage(result.error);
      setSnackbarOpen(true);
    }
  };

  const handleCancel = () => {
    navigate("/managequestionnaire");
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Grid item xs={3} md={6}>
        <Card sx={{ mt: 5 }}>
          <CardContent>
            <Avatar 
            sx={
              {
                mx: "auto",
                mb: 2,
                bgcolor: "#2E3B55",

              }
            }
            >
              <QuizIcon />
            </Avatar>

            <Typography variant="h6" align="center">
              {editing ? "Editar cuestionario" : "Crear cuestionario"}
            </Typography>

            <TextField
              variant="filled"
              name="name"
              label="Ingresa el nombre del cuestionario"
              required
              fullWidth
              autoFocus
              sx={{
                mb: 2,
              }}
              value={questionnaire.name}
              onChange={handleInputChange}
            />

            <Typography variant="h6" align="center">Categorías</Typography>

            

            <SelectQuestions
              multiline
              rows={4}
              sx={{
                mb: 2,
              }}
              questionnaire={questionnaire}
              setQuestionnaire={setQuestionnaire}
            />

            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveQuestionnaire}
              disabled={loading}
              sx={{
                mt: 2,
              }}
            >
              {loading ? <CircularProgress size={24} /> : "Guardar"}
            </Button>

            <Button
              variant="contained"
              color="secondary"
              onClick={handleCancel}
              disabled={loading}
              sx={{
                mt: 2,
              }}
            >
              Cancelar
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
    <Snackbar
    open={snackbarOpen}
    autoHideDuration={4000} // Adjust as needed
    onClose={handleCloseSnackbar}
  >
    <Alert severity={color} onClose={handleCloseSnackbar}>
      {message}
    </Alert>
  </Snackbar>
  </>
  );
};

export default Questionnaire;
