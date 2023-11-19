import { useState, useEffect } from "react";
import { subsectionsApi, subsectionsApiId } from "../../Services/Fetch";
import ModalComponent from "../../components/Practice/PracticeForm";
import TableComponent from "../../components/Practice/PracticeTable";
import DeleteConfirmationModal from "../../components/Modal/DeleteConfirmationModal";
import useToast from "../../hooks/useToast";

const Questionnaire = () => {
  const { toast } = useToast();
  const [practices, setPractices] = useState([]);
  const [practice, setPractice] = useState({
    name: "",
    questions: [],
  });
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [open, setOpen] = useState(false);

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
          toast.success(data.success);
        } else {
          const data = await response.json();
          toast.error(data.error);
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
          toast.success(data.success);
        } else {
          const data = await response.json();
          toast.error(data.error);
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
        toast.success(data.success);
        setDeleteModalOpen(false);
      } else {
        const data = await response.json();
        toast.error(data.error);
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

  return (
    <div>
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold mb-4">Prácticas</h1>
      <div className="m-5">
      <button
       className="text-white font-bold py-2 px-4 rounded"
      onClick={handleOpen}
      style={{ backgroundColor: "#2c3e50" }}
      onMouseOver={(e) =>
        (e.target.style.backgroundColor = "#465669")
      }
      onMouseLeave={(e) =>
        (e.target.style.backgroundColor = "#2c3e50")
      }
      >
        Nueva Práctica
      </button>
      </div>
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
    </div>
    </div>
  );
};

export default Questionnaire;
