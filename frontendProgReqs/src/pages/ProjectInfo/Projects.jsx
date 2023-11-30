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
  getResponseByProjectIdApi,
  requirementsNotFunctional,
  projectsbyprogressid,
} from "../../Services/Fetch";

import ProjectsSteps from "../../components/ProjectInfo/ProjectsSteps";
import ProjectsQuestionnaires from "../../components/ProjectInfo/ProjectsQuestionnaires";
import ProjectsInfo from "../../components/ProjectInfo/ProjectsInfo";
import RequirementsProjects from "../../components/ProjectInfo/ProjectsRequirements";
import RequirementsNotFunctionalProjects from "../../components/ProjectInfo/ProjectsRequirementsNotFunctional";

export default function Projects() {
  const [projectProgress, setProjectProgress] = useState(null);
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

  const [requirementsNotFuntional, setRequirementsNotFuntional] = useState([]);
  const [newRequirementsNotFuntional, setNewRequirementsNotFuntional] =
    useState({
      ident_requirement_id: "",
      name: "",
      description: "",
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
  const [editingIdNotFunctionals, setEditingIdNotFunctionals] = useState(null);
  const navigate = useNavigate();
  const [errors, setErrors] = useState("");
  const params = useParams();
  const [hasResponsesSteps2Q, setHasResponsesSteps2Q] = useState(false);

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

  const submitRequirementsNotFunctionals = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingIdNotFunctionals) {
        const response = await fetch(
          requirementtoedit + editingIdNotFunctionals,
          {
            method: "PUT",
            body: JSON.stringify(newRequirementsNotFuntional),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        if (response.ok) {
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
        setEditingIdNotFunctionals(null);
      } else {
        const idproject = params.id;
        const requirementsWithProjectId = {
          ...newRequirementsNotFuntional,
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
      setNewRequirementsNotFuntional({
        ident_requirement_id: "",
        name: "",
        description: "",
        priority_req: "",
      });
      loadRequirementsNotFunctionals(params.id);
      handleCloseNotFunctionals();
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
      loadRequirementsNotFunctionals(params.id);
      fetchProjectProgress();
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

  const changeRequirementsNotFunctionals = (e) => {
    setNewRequirementsNotFuntional({
      ...newRequirementsNotFuntional,
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

  const loadRequirementsNotFunctionals = async (project_id) => {
    try {
      const response = await fetch(requirementsNotFunctional + project_id);
      const data = await response.json();
      if (Array.isArray(data)) {
        setRequirementsNotFuntional(data);
      } else {
        setErrors(data.message);
        setRequirementsNotFuntional([]);
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

  const handleEditNotFunctionals = (id) => {
    const requirementToEdit = requirementsNotFuntional.find(
      (requirement) => requirement.id === id
    );
    if (requirementToEdit) {
      setEditingIdNotFunctionals(id);
      setNewRequirementsNotFuntional(requirementToEdit);
      handleOpenNotFunctionals();
    }
  };

  const fetchProjectProgress = async () => {
    try {
      const response = await fetch(projectsbyprogressid + params.id);
      const data = await response.json();
  
      if (data && data.progress !== undefined) {
        const convertedNumber = parseFloat(data.progress);
        console.log("convertedNumber", convertedNumber);
        setProjectProgress(convertedNumber);
      } else {
        console.error("Formato de respuesta incorrecto:", data);
      }
    } catch (error) {
      console.error("Error al obtener el progreso del proyecto:", error);
    }
  };
  

  useEffect(() => {
    const loadQuestionnaire = async () => {
      const project_id = params.id;

      try {
        const response = await fetch(questionnairesPublished + project_id);
        const data = await response.json();

        const questionnairesStep1 = data.filter((q) => q.steps === 1);

        if (questionnairesStep1.length > 0) {
          const hasResponsesStep1 = await checkResponses(
            project_id,
            questionnairesStep1
          );

          let selectedQuestionnaires;

          if (hasResponsesStep1) {
            const questionnairesStep1And2 = data.filter(
              (q) => q.steps === 1 || q.steps === 2
            );
            await checkResponses(project_id, questionnairesStep1And2);
            selectedQuestionnaires = questionnairesStep1And2;

            const hasResponsesStep2 = await checkResponses(
              project_id,
              questionnairesStep1And2
            );

            if (hasResponsesStep2) {
              const questionnairesteps2 = data.filter((q) => q.steps === 2);
              const responsesallStep2 = await checkResponses(
                project_id,
                questionnairesteps2
              );
              if (responsesallStep2) {
                setHasResponsesSteps2Q(true);
              } else {
                setHasResponsesSteps2Q(false);
              }
            }

            if (hasResponsesStep2) {
              const questionnairesStep1And2And3 = data.filter(
                (q) => q.steps === 1 || q.steps === 2 || q.steps === 0
              );
              await checkResponses(project_id, questionnairesStep1And2And3);
              selectedQuestionnaires = questionnairesStep1And2And3;
            }
          } else {
            selectedQuestionnaires = questionnairesStep1;
          }
          console.log("selectedQuestionnaires", selectedQuestionnaires);
          setQuestionnaires(selectedQuestionnaires);
        } else {
          setQuestionnaires([]);
        }
      } catch (error) {
        console.error("Error al cargar cuestionarios:", error);
      }
    };

    const checkResponses = async (project_id, questionnaires) => {
      for (const questionnaire of questionnaires) {
        const hasResponses = await fetchAndCheckResponses(
          project_id,
          questionnaire._id
        );
        if (hasResponses) {
          return true;
        }
      }
      return false;
    };

    const fetchAndCheckResponses = async (project_id, questionnaire_id) => {
      const response = await fetch(
        getResponseByProjectIdApi + project_id + "/" + questionnaire_id
      );
      const responseData = await response.json();
      return responseData.length > 0;
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
      loadRequirementsNotFunctionals(params.id);
      loadQuestionnaire();
      fetchProjectProgress();
    }
  }, [params.id]);

  const [open, setOpen] = useState(false);

  const [openNotFunctional, setOpenNotFunctional] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleOpenNotFunctionals = () => {
    setOpenNotFunctional(true);
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

  const handleCloseNotFunctionals = () => {
    setOpenNotFunctional(false);
    if (editingIdNotFunctionals !== null) {
      setEditingIdNotFunctionals(null);
      setNewRequirementsNotFuntional({
        ident_requirement_id: "",
        name: "",
        description: "",
        priority_req: "",
      });
    }
  };

  return (
    <div className="">
      <div className="container mx-auto">

        <ProjectsSteps
          beforeImage={"../../../img/mdz1.png"} 
          afterImage={"../../../img/mdz2.png"}
        />

        <ProjectsQuestionnaires
          questionnaires={questionnaires}
          paramsId={params.id}
          navigate={navigate}
        />
        {hasResponsesSteps2Q ? (
          <>
            <div>
              {projectProgress ? (
                <div>
                  <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                      <div>
                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-indigo-900 bg-indigo-200">
                          {typeof projectProgress === "number" &&
                          !isNaN(projectProgress) ? (
                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-indigo-900 bg-indigo-200">
                              {projectProgress.toFixed(2)}%
                            </span>
                          ) : (
                            <p>
                              El progreso del proyecto no es un número válido.
                            </p>
                          )}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-semibold inline-block text-indigo-900">
                          {projectProgress === 100 ? "Completo" : "En progreso"}
                        </span>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="flex-grow overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-200">
                        <div
                          style={{ width: `${projectProgress}%` }}
                          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-900"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <p>Aún no hay requisitos completados...</p>
              )}
            </div>

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
              editingIdNotFunctionals={editingIdNotFunctionals}
              openNotFunctional={openNotFunctional}
              handleOpenNotFunctionals={handleOpenNotFunctionals}
              handleCloseNotFunctionals={handleCloseNotFunctionals}
              newRequirementsNotFuntional={newRequirementsNotFuntional}
              changeRequirementsNotFunctionals={
                changeRequirementsNotFunctionals
              }
              submitRequirementsNotFunctionals={
                submitRequirementsNotFunctionals
              }
            />

            <RequirementsProjects
              requirements={requirements}
              moment={moment}
              navigate={navigate}
              handleDelete={handleDeleteConfirmation}
              handleEdit={handleEdit}
              errors={errors}
            />

            <RequirementsNotFunctionalProjects
              requirements={requirementsNotFuntional}
              moment={moment}
              navigate={navigate}
              handleDelete={handleDeleteConfirmation}
              handleEdit={handleEditNotFunctionals}
              errors={errors}
            />

            <Modal
              open={deleteModalOpen}
              onClose={() => setDeleteModalOpen(false)}
              onDelete={() => handleDelete(reqToDeleteId)}
            />
          </>
        ) : (
          <p className="text-lg text-center text-gray-600 my-4">
            <span className="font-bold">¡Esperamos tus respuestas!</span>{" "}
            Completa los cuestionarios para continuar con el ingreso de los
            requisitos del proyecto {project.name}.
          </p>
        )}
      </div>
    </div>
  );
}
