import { useState, useEffect } from "react";
import { Button, Typography, Container, Snackbar, Alert } from "@mui/material";

import useAuth from "../../Hooks/useAuth";
import getPerson from "../../components/RequireIdentify";
import CategorySecurityModal from "../../components/CategorieSecurity/CategorySecurityForm";
import CategorySecurityTable from "../../components/CategorieSecurity/CategorySecurityTable";
import {
  categoriessecurityApi,
  categoriessecuritybyidApi,
} from "../../Services/Fetch";
import DeleteConfirmationModal from "../../Components/Modal/DeleteConfirmationModal";

import {useNavigate} from "react-router-dom";

const Categoriesecurity = () => {
  const { auth } = useAuth();
  const [user, setUser] = useState(null);
  const [categoriesecurity, setcategoriesecurity] = useState([]);
  const [newCategorieSecurity, setnewCategorieSecurity] = useState({
    name: "",
  });
  const [editingcategoriesecurityId, setEditingcategoriesecurityId] =
    useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [color, setColor] = useState(null);
  const [message, setMessage] = useState(null);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [categorieToDeleteId, setCategorieToDeleteId] = useState(null);

  const navigate = useNavigate();

  const handleDeleteConfirmation = (id) => {
    setCategorieToDeleteId(id);
    setDeleteModalOpen(true);
  };

  useEffect(() => {
    const loadUser = async () => {
      const person = await getPerson(auth.username);
      if (person !== null) {
        setUser(person);
      } else {
        setUser(null);
      }
    };
    loadUser();
  }, [auth.username]);

  useEffect(() => {
    fetchcategoriesecurity();
  }, []);

  const fetchcategoriesecurity = async () => {
    try {
      const response = await fetch(categoriessecurityApi);
      if (response.ok) {
        const data = await response.json();
        setcategoriesecurity(data);
      } else {
        console.error(
          "Error al obtener los niveles de requerimientos:",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error al obtener los niveles de requerimientos:", error);
    }
  };

  const handleCreatecategoriesecurity = () => {
    setIsFormVisible(true);
    setIsEditing(false);
    resetForm();
  };

  const createcategoriesecurity = async () => {
    try {
      if (user !== null) {
        const newCategorieSecurity2 = {
          ...newCategorieSecurity,
          person_id: user,
        };
        const res = await fetch(categoriessecurityApi, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newCategorieSecurity2),
        });

        if (res.ok) {
          const data = await res.json();
          setMessage(data.success);
          setColor("success");
          setSnackbarOpen(true);
          setIsFormVisible(false);
          fetchcategoriesecurity();
          resetForm();
        } else {
          const data = await res.json();
          setMessage(data.error);
          setColor("error");
          setSnackbarOpen(true);
          setIsFormVisible(false);
          fetchcategoriesecurity();
          resetForm();
        }
      }
    } catch (error) {
      console.error("Error al crear el nivel de requerimientos:", error);
    }
  };

  const saveEditedcategoriesecurity = async () => {
    try {
      const res = await fetch(
        categoriessecuritybyidApi + editingcategoriesecurityId,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newCategorieSecurity),
        }
      );

      if (res.ok) {
        const data = await res.json();
        setMessage(data.success);
        setColor("success");
        setSnackbarOpen(true);
        setIsFormVisible(false);
        fetchcategoriesecurity();
        resetForm();
        setEditingcategoriesecurityId(null);
      } else {
        const data = await res.json();
        setMessage(data.error);
        setColor("error");
        setSnackbarOpen(true);
        setIsFormVisible(false);
        fetchcategoriesecurity();
        resetForm();
        setEditingcategoriesecurityId(null);
      }
    } catch (error) {
      console.error("Error al editar el nivel de requerimientos:", error);
    }
  };

  const handleEditcategoriesecurity = (id) => {
    const categoriesecurityToEdit = categoriesecurity.find(
      (categoriesecurity) => categoriesecurity.id === id
    );
    setnewCategorieSecurity(categoriesecurityToEdit);
    setEditingcategoriesecurityId(id);
    setIsEditing(true);
    setIsFormVisible(true);
  };

  const handleCancel = () => {
    setIsFormVisible(false);
    resetForm();
  };

  const createOrUpdateQuestion = () => {
    if (isEditing) {
      saveEditedcategoriesecurity();
    } else {
      createcategoriesecurity();
    }
  };

  const handleDeletecategoriesecurity = async (id) => {
    try {
      const res = await fetch(categoriessecuritybyidApi + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
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

      fetchcategoriesecurity();
    } catch (error) {
      console.error("Error al borrar el nivel de requerimientos:", error);
    }
  };

  const resetForm = () => {
    setnewCategorieSecurity({
      name: "",
    });
    setEditingcategoriesecurityId(null);
    setIsEditing(false);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: "20px" }}>
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Categorias de ASVS
      </Typography>
      <Button
        variant="contained"
        disabled={isFormVisible}
        onClick={handleCreatecategoriesecurity}
      >
        Crear
      </Button>

      <CategorySecurityModal
        isFormVisible={isFormVisible}
        handleCancel={handleCancel}
        newCategorieSecurity={newCategorieSecurity}
        setnewCategorieSecurity={setnewCategorieSecurity}
        isEditing={isEditing}
        createOrUpdateQuestion={createOrUpdateQuestion}
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

      <CategorySecurityTable
        categoriesecurity={categoriesecurity}
        handleEditcategoriesecurity={handleEditcategoriesecurity}
        handleDeletecategoriesecurity={handleDeleteConfirmation}
        navigate={navigate}
      />

      <DeleteConfirmationModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onDelete={() => handleDeletecategoriesecurity(categorieToDeleteId)}
      />
    </Container>
  );
};

export default Categoriesecurity;
