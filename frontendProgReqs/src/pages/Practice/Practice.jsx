import { useState, useEffect } from "react";
import { Button, Container, Snackbar, Alert } from "@mui/material";

import { subsectionsApi, subsectionsApiId } from "../../Services/Fetch";
import ModalComponent from "../../components/Practice/PracticeForm";
import TableComponent from "../../components/Practice/PracticeTable";
import DeleteConfirmationModal from "../../components/Modal/DeleteConfirmationModal";

const Questionnaire = () => {
  const [practices, setPractices] = useState([]);
  const [practice, setPractice] = useState({
    name: "",
    questions: [],
  });
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [color, setColor] = useState(null);
  const [message, setMessage] = useState(null);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [practiceToDeleteId, setPracticeToDeleteId] = useState(null);

  const handleDeleteConfirmation = (id) => {
    setPracticeToDeleteId(id);
    setDeleteModalOpen(true);
  };

  const submitPractice = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingId) {
        const response = await fetch(subsectionsApiId + editingId, {
          method: "PUT",
          body: JSON.stringify(practice),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const data = await response.json();
          setMessage(data.success);
          setColor("success");
          setSnackbarOpen(true);
        } else {
          const data = await response.json();
          setMessage(data.error);
          setColor("error");
          setSnackbarOpen(true);
        }
        setEditingId(null);
      } else {
        const response = await fetch(subsectionsApi, {
          method: "POST",
          body: JSON.stringify(practice),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const data = await response.json();
          setMessage(data.success);
          setColor("success");
          setSnackbarOpen(true);
        } else {
          const data = await response.json();
          setMessage(data.error);
          setColor("error");
          setSnackbarOpen(true);
        }
      }
      setLoading(false);
      setPractice({
        name: "",
        questions: [],
      });
      loadPractices();
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(subsectionsApiId + id, {
        method: "DELETE",
      });
      if (response.ok) {
        const data = await response.json();
        setMessage(data.success);
        setColor("success");
        setSnackbarOpen(true);
        setDeleteModalOpen(false);
      } else {
        const data = await response.json();
        setMessage(data.error);
        setColor("error");
        setSnackbarOpen(true);
        setDeleteModalOpen(false);
      }
      loadPractices();
    } catch (error) {
      console.log(error);
    }
  };

  const ChangePractice = (e) => {
    setPractice({
      ...practice,
      [e.target.name]: e.target.value,
    });
  };

  const loadPractices = async () => {
    try {
      const res = await fetch(subsectionsApi);
      const data = await res.json();
      if (Array.isArray(data)) {
        setPractices(data);
      } else {
        setPractices([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (id) => {
    try {
      const res = await fetch(subsectionsApiId + id);
      const data = await res.json();
      setPractice(data);
      setEditingId(id);
      handleOpen();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadPractices();
  }, []);

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    if (editingId !== null) {
      setEditingId(null);
      setPractice({
        name: "",
        questions: [],
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: "20px" }}>
      <Button size="small" onClick={handleOpen}>
        {editingId ? "Editar Práctica" : "Agregar Práctica"}
      </Button>

      <ModalComponent
        open={open}
        handleClose={handleClose}
        practice={practice}
        setPractice={setPractice}
        loading={loading}
        ChangePractice={ChangePractice}
        submitPractice={submitPractice}
        practices={practices}
        editingId={editingId}
        handleOpen={handleOpen}
      />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000} // Adjust as needed
        onClose={handleCloseSnackbar}
      >
        <Alert severity={color} onClose={handleCloseSnackbar}>
          {message}
        </Alert>
      </Snackbar>

      <TableComponent
        practices={practices}
        handleEdit={handleEdit}
        handleDelete={handleDeleteConfirmation}
      />

      <DeleteConfirmationModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onDelete={() => handleDelete(practiceToDeleteId)}
      />
    </Container>
  );
};

export default Questionnaire;
