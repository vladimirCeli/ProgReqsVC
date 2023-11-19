import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import getPerson from "../../components/RequireIdentify";
import { projectsbypersonid, projectsbyid } from "../../Services/Fetch";
import CardProject from "../../components/Projects/CardProject";
import Modal from "../../components/Modal/DeleteConfirmationModal";
import useToast from "../../hooks/useToast";

const ProjectsList = () => {
  const { toast } = useToast();
  const { auth } = useAuth();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [projectToDeleteId, setProjectToDeleteId] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleDeleteConfirmation = (id) => {
    setProjectToDeleteId(id);
    setDeleteModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(projectsbyid + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        setDeleteModalOpen(false);
        loadProjects(user);
      } else {
        toast.error(data.message);
        setDeleteModalOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loadUser = async () => {
    const person = await getPerson(auth.username);
    setUser(person ?? null);
  };

  const loadProjects = async (id) => {
    const res = await fetch(projectsbypersonid + id);
    setProjects(await res.json());
  };

  useEffect(() => {
    loadUser();
  }, [auth.username]);

  useEffect(() => {
    if (user) {
      loadProjects(user);
    }
  }, [user]);
  return (
  <>
      <CardProject
        projects={projects}
        handleDelete={handleDeleteConfirmation}
        navigate={navigate}
      />

      <Modal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onDelete={() => handleDelete(projectToDeleteId)}
      />
    </>
  );
};

export default ProjectsList;
