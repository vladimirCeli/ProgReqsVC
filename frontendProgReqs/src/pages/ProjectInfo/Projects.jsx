import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import Modal from "../../components/Modal/DeleteConfirmationModal";
import useToast from "../../hooks/useToast";

import {
  requirementstoprojects,
  requirementtoedit,
  projectsbyid,
  questionnairesPublished,
  getResponseByProjectIdApi
} from "../../Services/Fetch";

import ProjectsQuestionnaires from "../../components/ProjectInfo/ProjectsQuestionnaires";
import ProjectsInfo from "../../components/ProjectInfo/ProjectsInfo";
import RequirementsProjects from "../../components/ProjectInfo/ProjectsRequirements";

export default function Projects() {
  const { toast } = useToast();
  const [project, setProject] = useState({
    name: "",
    description: "",
    created_at: "",
    updated_at: "",
  });

  const [requirements, setRequirements] = useState([]);
  const [newRequirement, setNewRequirement] = useState({
    ident_requirement_id: "",
    name: "",
    characteristicsr: "",
    description: "",
    req_no_funtional: "",
    priority_req: "",
  });

  const [questionnaires, setQuestionnaires] = useState({
    name: "",
  });
  const [reqToDeleteId, setReqToDeleteId] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleDeleteConfirmation = (id) => {
    setReqToDeleteId(id);
    setDeleteModalOpen(true);
  };

  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate();
  const [errors, setErrors] = useState("");
  const params = useParams();

  const submitRequirements = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingId) {
        const response = await fetch(requirementtoedit + editingId, {
          method: "PUT",
          body: JSON.stringify(newRequirement),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (response.ok) {
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
        setEditingId(null);
      } else {
        const idproject = params.id;
        const requirementsWithProjectId = {
          ...newRequirement,
          project_id: idproject,
        };

        const response = await fetch(requirementstoprojects, {
          method: "POST",
          body: JSON.stringify(requirementsWithProjectId),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (response.ok) {
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      }
      setLoading(false);
      setNewRequirement({
        ident_requirement_id: "",
        name: "",
        characteristicsr: "",
        description: "",
        req_no_funtional: "",
        priority_req: "",
      });
      loadRequirements(params.id);
      handleClose();
    } catch (error) {
      console.error("Error al agregar los requisitos:", error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(requirementtoedit + id, {
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
      } else {
        toast.error(data.message);
        setDeleteModalOpen(false);
      }
      loadRequirements(params.id);
    } catch (error) {
      console.error("Error al eliminar el requisito:", error.message);
    }
  };

  const changeRequirements = (e) => {
    setNewRequirement({
      ...newRequirement,
      [e.target.name]: e.target.value,
    });
  };

  const loadRequirements = async (project_id) => {
    try {
      const response = await fetch(requirementtoedit + project_id);
      const data = await response.json();
      if (Array.isArray(data)) {
        setRequirements(data);
      } else {
        setErrors(data.message);
        setRequirements([]);
      }
    } catch (error) {
      console.error("Error al cargar los requisitos:", error);
    }
  };

  const handleEdit = (id) => {
    const requirementToEdit = requirements.find(
      (requirement) => requirement.id === id
    );
    if (requirementToEdit) {
      setEditingId(id);
      setNewRequirement(requirementToEdit);
      handleOpen();
    }
  };

  useEffect(() => {
    
    const loadQuestionnaire = async () => {
      const project_id = params.id;
    
      try {
        const response = await fetch(questionnairesPublished+project_id);
        const data = await response.json();
    
        const questionnairesStep1 = data.filter(q => q.steps === 1);
    
        if (questionnairesStep1.length > 0) {
          const hasResponsesStep1 = await checkResponses(project_id, questionnairesStep1);
    
          if (hasResponsesStep1) {
            const questionnairesStep1And2 = data.filter(q => q.steps === 1 || q.steps === 2);
            const hasResponsesStep2 = await checkResponses(project_id, questionnairesStep1And2);
    
            if (hasResponsesStep2) {
              const questionnairesAllSteps = data.filter(q => q.steps === 0 || q.steps === 1 || q.steps === 2);
              const questionnairesWithResponsesStep0 = await filterResponsesStep0(project_id, questionnairesAllSteps);
    
              setQuestionnaires(questionnairesWithResponsesStep0);
            } else {
              setQuestionnaires(questionnairesStep1And2);
            }
          } else {
            setQuestionnaires(questionnairesStep1);
          }
        } else {
          setQuestionnaires([]);
        }
      } catch (error) {
        console.error('Error al cargar cuestionarios:', error);
        // Manejar el error según tus necesidades
      }
    };
    
    const checkResponses = async (project_id, questionnaires) => {
      for (const questionnaire of questionnaires) {
        const hasResponses = await fetchAndCheckResponses(project_id, questionnaire._id);
        if (hasResponses) {
          return true;
        }
      }
      return false;
    };
    
    const fetchAndCheckResponses = async (project_id, questionnaire_id) => {
      const response = await fetch(getResponseByProjectIdApi+project_id+"/"+questionnaire_id);
      const responseData = await response.json();
      return responseData.length > 0;
    };
    
    const filterResponsesStep0 = async (project_id, questionnaires) => {
      return Promise.all(questionnaires.map(async (q) => {
        if (q.steps === 0) {
          const hasResponses = await fetchAndCheckResponses(project_id, q._id);
          return hasResponses ? q : null;
        }
        return q;
      })).then(filteredQuestionnaires => filteredQuestionnaires.filter(Boolean));
    };
    const loadProject = async (id) => {
      try {
        const response = await fetch(projectsbyid + id);

        if (response.ok) {
          setProject({
            ...project,
            ...(await response.json()),
          });
        } else {
          console.log("No se encontró la propiedad 'name' en el objeto JSON.");
        }
      } catch (error) {
        console.error("Error al cargar los proyectos:", error);
      }
    };
    if (params.id) {
      loadProject(params.id);
      loadRequirements(params.id);
      loadQuestionnaire();
    }
  }, []);

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    if (editingId !== null) {
      setEditingId(null);
      setNewRequirement({
        ident_requirement_id: "",
        name: "",
        characteristicsr: "",
        description: "",
        req_no_funtional: "",
        priority_req: "",
      });
    }
  };

  return (
    <div className="">
      <div className="container mx-auto">
        <ProjectsQuestionnaires
          questionnaires={questionnaires}
          paramsId={params.id}
          navigate={navigate}
        />

        <ProjectsInfo
          project={project}
          handleOpen={handleOpen}
          moment={moment}
          open={open}
          handleClose={handleClose}
          newRequirement={newRequirement}
          changeRequirements={changeRequirements}
          submitRequirements={submitRequirements}
          loading={loading}
          editingId={editingId}
        />

        <RequirementsProjects
          requirements={requirements}
          moment={moment}
          navigate={navigate}
          handleDelete={handleDeleteConfirmation}
          handleEdit={handleEdit}
          errors={errors}
        />
        <Modal
          open={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onDelete={() => handleDelete(reqToDeleteId)}
        />
      </div>
    </div>
  );
}
