import { useState, useEffect } from "react";
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
import useToast from "../../hooks/useToast";

const Subcategories = () => {
  const { toast } = useToast();
  const [categorieRequirement, setcategorieRequirement] = useState("");
  const [Subcategories, setSubcategories] = useState([]);
  const [newSubcategories, setnewSubcategories] = useState({
    name: "",
  });
  const [editingSubcategoriesId, setEditingSubcategoriesId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);

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
        toast.success(data.success);
        setIsFormVisible(false);
        fetchSubcategories();
        resetForm();
      } else {
        const data = await response.json();
        toast.error(data.error);
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
        toast.success(data.success);
        setIsFormVisible(false);
        fetchSubcategories();
        resetForm();
        setEditingSubcategoriesId(null); // Restablecer el ID de edición
      } else {
        const data = await response.json();
        toast.error(data.error);
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
        toast.success(data.success);
        setDeleteModalOpen(false);
      } else {
        const data = await response.json();
        toast.error(data.error);
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

  return (
    <div>
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-4">
          Subcategoría de la categoría: {categorieRequirement || "Cargando..."}
        </h1>
        <div className="m-5">
        <button
          className="text-white font-bold py-2 px-4 rounded"
          style={{ backgroundColor: "#2c3e50" }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#465669")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#2c3e50")}
          onClick={handleCreateSubcategories}
        >
          Nueva subcategoria
        </button>
        </div>

        <SubCategoryModal
          isFormVisible={isFormVisible}
          handleCancel={handleCancel}
          newSubcategories={newSubcategories}
          setnewSubcategories={setnewSubcategories}
          isEditing={isEditing}
          createOrUpdateSubcategories={createOrUpdateSubcategories}
        />

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
      </div>
    </div>
  );
};

export default Subcategories;
