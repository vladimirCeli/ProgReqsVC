import { useState, useEffect } from "react";
import { categoriesApi, categoriesbyidApi } from "../../Services/Fetch";
import CategoryModal from "../../components/Categories/CategoryForm";
import CategoryTable from "../../components/Categories/CategoryTable";
import DeleteConfirmationModal from "../../components/Modal/DeleteConfirmationModal";
import useToast from "../../hooks/useToast";

const Categories = () => {
  const { toast } = useToast();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState({
    name: "",
    practices: [],
  });
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [open, setOpen] = useState(false);

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
          toast.success(data.success);
        } else {
          const data = await response.json();
          toast.error(data.error);
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
          toast.success(data.success);
        } else {
          const data = await response.json();
          toast.error(data.error);
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
        toast.success(data.success);
        setDeleteModalOpen(false);
      } else {
        const data = await response.json();
        toast.error(data.error);
        setDeleteModalOpen(false);
      }
      loadCategories();
    } catch (error) {
      console.error(error);
    }
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

  return (
    <div>
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-4">Categorías</h1>
        <div className="m-5">
          <button
            onClick={handleOpen}
            className="text-white font-bold py-2 px-4 rounded"
            style={{ backgroundColor: "#2c3e50" }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#465669")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#2c3e50")}
          >
            Nueva Categoria
          </button>
        </div>
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
      </div>
    </div>
  );
};

export default Categories;
