import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import {
  subcategoriesApiId,
  requirementsecSubcategoriesApiId,
  requirementsecApi,
  requirementsecApiId,
} from "../../Services/Fetch";

import RequirementSModal from "../../components/RequirementSecurity/RequirementSForm";
import RequirementSTable from "../../components/RequirementSecurity/RequirementSTable";
import DeleteConfirmationModal from "../../components/Modal/DeleteConfirmationModal";
import useToast from "../../hooks/useToast";

const RequirementSecurity = () => {
  const { toast } = useToast();
  const [Subcategorie, setSubcategorie] = useState("");
  const [requirementsecurity, setrequirementsecurity] = useState([]);
  const [newRequirementSecurity, setnewRequirementSecurity] = useState({
    numeration: "",
    level_requirements: [],
    description: "",
    cwe: "",
    nist: "",
  });
  const [editingRequirementSecurityId, setEditingRequirementSecurityId] =
    useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [RequiremenSToDeleteId, setRequirementSToDeleteId] = useState(null);

  const params = useParams();

  const handleDeleteConfirmation = (id) => {
    setRequirementSToDeleteId(id);
    setDeleteModalOpen(true);
  };

  useEffect(() => {
    // Cargar categoría al montar el componente
    fetchSubcategorie();
    // Cargar requerimientos al montar el componente
    fetchRequirementSecurity();
  }, []);

  const fetchSubcategorie = async () => {
    try {
      const response = await fetch(subcategoriesApiId + params.id);
      const data = await response.json();
      console.log(data);
      console.log(data.name);
      setSubcategorie(data.name);
    } catch (error) {
      console.error("Error al obtener la categoría de requerimientos:", error);
    }
  };

  const fetchRequirementSecurity = async () => {
    try {
      const response = await fetch(
        requirementsecSubcategoriesApiId + params.id
      );
      const data = await response.json();

      setrequirementsecurity(data);
    } catch (error) {
      console.error("Error al obtener los requerimientos de seguridad:", error);
    }
  };

  const handleCreateRequirementSecurity = () => {
    setIsFormVisible(true);
    setIsEditing(false);
    resetForm();
  };

  const createRequirementSecurity = async () => {
    try {
      const newRequirementSecurity2 = {
        ...newRequirementSecurity,
        level_requirements:
          newRequirementSecurity.level_requirements.map(Number), // Convertir a enteros
        subcategories_requirements_id: params.id,
      };
      const response = await fetch(requirementsecApi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRequirementSecurity2),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success(data.success);
        setIsFormVisible(false);
        fetchRequirementSecurity();
        resetForm();
      } else {
        const data = await response.json();
        toast.error(data.error);
        setIsFormVisible(false);
        fetchRequirementSecurity();
        resetForm();
      }
    } catch (error) {
      console.error("Error al crear el requerimiento de seguridad:", error);
    }
  };

  const saveEditedRequirementSecurity = async () => {
    try {
      const response = await fetch(
        requirementsecApiId + editingRequirementSecurityId,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newRequirementSecurity),
        }
      );

      if (response.ok) {
        const data = await response.json();
        toast.success(data.success);
        setIsFormVisible(false);
        fetchRequirementSecurity();
        resetForm();
        setEditingRequirementSecurityId(null);
      } else {
        const data = await response.json();
        toast.error(data.error);
        setIsFormVisible(false);
        fetchRequirementSecurity();
        resetForm();
        setEditingRequirementSecurityId(null);
      }
    } catch (error) {
      console.error("Error al editar el requerimiento de seguridad:", error);
    }
  };

  const handleEditRequirementSecurity = (id) => {
    const requirementsecurityEdit = requirementsecurity.find(
      (requirementsecurity) => requirementsecurity.id === id
    );
    setnewRequirementSecurity(requirementsecurityEdit);
    setEditingRequirementSecurityId(id);
    setIsEditing(true);
    setIsFormVisible(true);
  };

  const handleCancel = () => {
    setIsFormVisible(false);
    resetForm();
  };

  const createOrUpdateRequirementSecurity = () => {
    if (isEditing) {
      saveEditedRequirementSecurity();
    } else {
      createRequirementSecurity();
    }
  };

  const handleDeleteRequirementSecurity = async (id) => {
    try {
      const response = await fetch(requirementsecApiId + id, {
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
      fetchRequirementSecurity();
    } catch (error) {
      console.error("Error al eliminar el requerimiento de seguridad:", error);
    }
  };

  const resetForm = () => {
    setnewRequirementSecurity({
      numeration: "",
      level_requirements: [],
      description: "",
      cwe: "",
      nist: "",
    });
    setEditingRequirementSecurityId(null);
    setIsEditing(false);
  };

  return (
    <div>
    <div className="container mx-auto">
    <h1 className="text-4xl font-bold mb-4">
        Requisitos de la Subcategoria: {Subcategorie || "Cargando..."}
      </h1>
      <div className="m-5">
      <button
        className="text-white font-bold py-2 px-4 rounded"
        style={{ backgroundColor: "#2c3e50" }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#465669")}
        onMouseLeave={(e) => (e.target.style.backgroundColor = "#2c3e50")}
        onClick={handleCreateRequirementSecurity}
      >
        Nuevo Requisito
      </button>
      </div>
      <RequirementSModal
        isFormVisible={isFormVisible}
        handleCancel={handleCancel}
        setnewRequirementSecurity={setnewRequirementSecurity}
        newRequirementSecurity={newRequirementSecurity}
        createOrUpdateRequirementSecurity={createOrUpdateRequirementSecurity}
        isEditing={isEditing}
      />

      <RequirementSTable
        requirementsecurity={requirementsecurity}
        handleEditRequirementSecurity={handleEditRequirementSecurity}
        handleDeleteRequirementSecurity={handleDeleteConfirmation}
      />

      <DeleteConfirmationModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onDelete={() => handleDeleteRequirementSecurity(RequiremenSToDeleteId)}
      />
    </div>
    </div>
  );
};

export default RequirementSecurity;
