import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Box, Snackbar, Alert, Container } from "@mui/material";

import {
  responseApiId,
  questionnairesbyidApi,
  getResponseByProjectIdApi,
} from "../../Services/Fetch";

import BoxResponses from "../../components/ListResponses/BoxResponses";
import DeleteConfirmationModal from "../../components/Modal/DeleteConfirmationModal";

const ListResponses = () => {
  const { id1, id2 } = useParams();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [color, setColor] = useState(null);
  const [message, setMessage] = useState(null);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [responseToDeleteId, setResponseToDeleteId] = useState(null);

  const handleDeleteConfirmation = (id) => {
    setResponseToDeleteId(id);
    setDeleteModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(responseApiId + id, {
        method: "DELETE",
      });
      if (res.ok) {
        const data = await res.json();
        setMessage(data.success);
        setColor("success");
        setSnackbarOpen(true);
        setDeleteModalOpen(false);
      } else {
        const data = await res.json();
        setMessage(data.error);
        setColor("error");
        setSnackbarOpen(true);
        setDeleteModalOpen(false);
      }
      loadResponses();
    } catch (error) {
      console.log(error);
    }
  };

  const [response, setResponse] = useState([]);
  const [questionnaire, setQuestionnaire] = useState([]);

  const navigate = useNavigate();

  const loadQuestionnaire = async () => {
    const res = await fetch(questionnairesbyidApi + id1);
    setQuestionnaire(await res.json());
  };

  const loadResponses = async () => {
    const res = await fetch(`${getResponseByProjectIdApi + id2}/${id1}`);
    setResponse(await res.json());
  };

  useEffect(() => {
    loadResponses();
    loadQuestionnaire();
  }, []);

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: "20px" }}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <h1>Cuestionario: {questionnaire.name}</h1>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000} // Adjust as needed
        onClose={handleCloseSnackbar}
      >
        <Alert severity={color} onClose={handleCloseSnackbar}>
          {message}
        </Alert>
      </Snackbar>

      <BoxResponses
        response={response}
        handleDelete={handleDeleteConfirmation}
        id1={id1}
        id2={id2}
        navigate={navigate}
      />

      <DeleteConfirmationModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onDelete={() => handleDelete(responseToDeleteId)}
      />
    </Container>
  );
};

export default ListResponses;
