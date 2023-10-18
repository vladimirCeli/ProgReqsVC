import { useState, useEffect } from "react";
import { Button, Typography, Container, Snackbar, Alert } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";

import {
  subcategoriesApi,
  subcategoriesApiId,
  subcategoriesCategoriesApiId,
  categoriessecuritybyidApi,
} from "../../Services/Fetch";
import SubCategoryModal from "../../components/SubCategorieSecurity/SubCategorieSecurityForm";
import SubCategoryTable from "../../components/SubCategorieSecurity/SubCategorieSecurityTable";
import DeleteConfirmationModal from "../../components/Modal/DeleteConfirmationModal";

const Subcategories = () => {
  const [categorieRequirement, setcategorieRequirement] = useState("");
  const [Subcategories, setSubcategories] = useState([]);
  const [newSubcategories, setnewSubcategories] = useState({
    name: "",
  });
  const [editingSubcategoriesId, setEditingSubcategoriesId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [color, setColor] = useState(null);
  const [message, setMessage] = useState(null);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [subcategorieToDeleteId, setSubCategorieToDeleteId] = useState(null);

  const params = useParams();

  const navigate = useNavigate();

  const handleDeleteConfirmation = (id) => {
    setSubCategorieToDeleteId(id);
    setDeleteModalOpen(true);
  };

  useEffect(() => {
    // Cargar categoría al montar el componente
    fetchCategorieRequirement();
    // Cargar requerimientos al montar el componente
    fetchSubcategories();
  }, []);

  const fetchCategorieRequirement = async () => {
    try {
      const response = await fetch(categoriessecuritybyidApi + params.id);
      const data = await response.json();
      setcategorieRequirement(data.name);
    } catch (error) {
      console.error("Error al obtener la categoría de seguridad:", error);
    }
  };

  const fetchSubcategories = async () => {
    try {
      const response = await fetch(subcategoriesCategoriesApiId + params.id);
      const data = await response.json();

      setSubcategories(data);
    } catch (error) {
      console.error("Error al obtener las subcategorias de seguridad:", error);
    }
  };

  const handleCreateSubcategories = () => {
    setIsFormVisible(true);
    setIsEditing(false);
    resetForm();
  };

  const createSubcategories = async () => {
    try {
      const newSubcategories2 = {
        ...newSubcategories, // Convertir a enteros
        categories_requirements_id: params.id,
      };
      const response = await fetch(subcategoriesApi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newSubcategories2),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(data.success);
        setColor("success");
        setSnackbarOpen(true);
        setIsFormVisible(false);
        fetchSubcategories();
        resetForm();
      } else {
        const data = await response.json();
        setMessage(data.error);
        setColor("error");
        setSnackbarOpen(true);
        setIsFormVisible(false);
        fetchSubcategories();
        resetForm();
      }
    } catch (error) {
      console.error("Error al crear el requerimiento de seguridad:", error);
    }
  };

  const saveEditedSubcategories = async () => {
    try {
      const response = await fetch(
        subcategoriesApiId + editingSubcategoriesId,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newSubcategories),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setMessage(data.success);
        setColor("success");
        setSnackbarOpen(true);
        setIsFormVisible(false);
        fetchSubcategories();
        resetForm();
        setEditingSubcategoriesId(null); // Restablecer el ID de edición
      } else {
        const data = await response.json();
        setMessage(data.error);
        setColor("error");
        setSnackbarOpen(true);
        setIsFormVisible(false);
        fetchSubcategories();
        resetForm();
        setEditingSubcategoriesId(null); // Restablecer el ID de edición
      }
    } catch (error) {
      console.error("Error al editar el requerimiento de seguridad:", error);
    }
  };

  const handleEditSubcategories = (id) => {
    const SubcategoriesEdit = Subcategories.find(
      (Subcategories) => Subcategories.id === id
    );
    setnewSubcategories(SubcategoriesEdit);
    setEditingSubcategoriesId(id);
    setIsEditing(true);
    setIsFormVisible(true);
  };

  const handleCancel = () => {
    setIsFormVisible(false);
    resetForm();
  };

  const createOrUpdateSubcategories = () => {
    if (isEditing) {
      saveEditedSubcategories();
    } else {
      createSubcategories();
    }
  };

  const handleDeleteSubcategories = async (id) => {
    try {
      const response = await fetch(subcategoriesApiId + id, {
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
      fetchSubcategories();
    } catch (error) {
      console.error("Error al eliminar el requerimiento de seguridad:", error);
    }
  };

  const resetForm = () => {
    setnewSubcategories({
      name: "",
    });
    setEditingSubcategoriesId(null);
    setIsEditing(false);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: "20px" }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Subcategoria de la categoría: {categorieRequirement || "Cargando..."}
      </Typography>
      <Button
        variant="contained"
        onClick={handleCreateSubcategories}
        sx={{ mb: 2 }}
      >
        Crear nueva subcategoria
      </Button>

      <SubCategoryModal
        isFormVisible={isFormVisible}
        handleCancel={handleCancel}
        newSubcategories={newSubcategories}
        setnewSubcategories={setnewSubcategories}
        isEditing={isEditing}
        createOrUpdateSubcategories={createOrUpdateSubcategories}
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

      <SubCategoryTable
        Subcategories={Subcategories}
        handleEditSubcategories={handleEditSubcategories}
        handleDeleteSubcategories={handleDeleteConfirmation}
        navigate={navigate}
      />

      <DeleteConfirmationModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onDelete={() => handleDeleteSubcategories(subcategorieToDeleteId)}
      />
    </Container>
  );
};

export default Subcategories;
