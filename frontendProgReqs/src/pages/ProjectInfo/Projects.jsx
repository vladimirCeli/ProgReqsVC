import { useState, useEffect } from "react";
import {
  Container
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";

import {
    requirementstoprojects,
    requirementtoedit,
    projectsbyid,
    questionnairesPublished,
  } from '../../Services/Fetch';

  import ProjectsQuestionnaires from '../../components/ProjectInfo/ProjectsQuestionnaires';
  import ProjectsInfo from '../../components/ProjectInfo/ProjectsInfo';
  import RequirementsProjects from '../../components/ProjectInfo/ProjectsRequirements';
 
  export default function Projects() {
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
          await fetch(requirementtoedit + editingId, {
            method: "PUT",
            body: JSON.stringify(newRequirement),
            headers: {
              "Content-Type": "application/json",
            },
          });
          setEditingId(null);
        } else {
          const idproject = params.id;
          const requirementsWithProjectId = {
            ...newRequirement,
            project_id: idproject,
          };
  
          await fetch(requirementstoprojects, {
            method: "POST",
            body: JSON.stringify(requirementsWithProjectId),
            headers: {
              "Content-Type": "application/json",
            },
          });
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
        await fetch(requirementtoedit + id, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
  
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
      const loadQuestionnaire = () => {
        fetch(questionnairesPublished)
          .then((res) => res.json())
          .then((data) => {
            setQuestionnaires(data);
          });
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
      <Container maxWidth="lg" style={{ marginTop: "20px" }}>
  
          <ProjectsQuestionnaires
            questionnaires={questionnaires}
            params={params}
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
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            errors={errors}
          />
      </Container>
    );
  }
  