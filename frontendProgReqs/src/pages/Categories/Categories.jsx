import { useState, useEffect } from "react";
import { Typography, Button,
    Snackbar, 
    Alert, Container } from "@mui/material";
import { categoriesApi, categoriesbyidApi } from "../../Services/Fetch";
import CategoryModal from "../../components/Categories/CategoryForm";
import CategoryTable from "../../components/Categories/CategoryTable";
import DeleteConfirmationModal from "../../components/Modal/DeleteConfirmationModal";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState({
    name: "",
    practices: [],
  });
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [color, setColor] = useState(null);
  const [message, setMessage] = useState(null);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [categoryToDeleteId, setCategoryToDeleteId] = useState(null);

  const handleDeleteConfirmation = (id) => {
    setCategoryToDeleteId(id);
    setDeleteModalOpen(true);
  };

  const submitCategory = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingId) {
        const response = await fetch(categoriesbyidApi + editingId, {
          method: "PUT",
          body: JSON.stringify(category),
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
        const response = await fetch(categoriesApi, {
          method: "POST",
          body: JSON.stringify(category),
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
      setCategory({
        name: "",
        practices: [],
      });
      loadCategories();
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(categoriesbyidApi + id, {
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
      loadCategories();
    } catch (error) {
      console.error(error);
    }
  };

  const ChangeCategory = (e) => {
    setCategory({
      ...category,
      [e.target.name]: e.target.value,
    });
  };

  const loadCategories = async () => {
    try {
      const response = await fetch(categoriesApi);
      const data = await response.json();
      if (Array.isArray(data)) {
        setCategories(data);
      } else {
        setCategories([]);
      }
    } catch (error) {
      console.error(`Error al obtener categorías: ${error}`);
    }
  };

  const handleEdit = async (id) => {
    try {
      const response = await fetch(categoriesbyidApi + id);
      const data = await response.json();
      setCategory(data);
      setEditingId(id);
      handleOpen();
    } catch (error) {
      console.error(`Error al obtener categoría: ${error}`);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    if (editingId !== null) {
      setEditingId(null);
      setCategory({
        name: "",
        practices: [],
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: "20px" }}>
      <Button size="small" onClick={handleOpen}>
        {editingId ? "Editar Categoria" : "Agregar Categoria"}
      </Button>
      <CategoryModal
        open={open}
        handleClose={handleClose}
        category={category}
        setCategory={setCategory}
        loading={loading}
        submitCategory={submitCategory}
        categories={categories}
        editingId={editingId}
        handleOpen={handleOpen}
      />
      <Typography variant="h4">Categorías</Typography>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000} // Adjust as needed
        onClose={handleCloseSnackbar}
      >
        <Alert severity={color} onClose={handleCloseSnackbar}>
          {message}
        </Alert>
      </Snackbar>
      <CategoryTable
        categories={categories}
        handleEdit={handleEdit}
        handleDelete={handleDeleteConfirmation}
      />
       <DeleteConfirmationModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onDelete={() => handleDelete(categoryToDeleteId)}
      />
    </Container>
  );
};

export default Categories;
