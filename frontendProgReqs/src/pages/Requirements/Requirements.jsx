import { useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import {
  categoriessecurityApi,
  subcategoriesCategoriesApiId,
  requirementsecSubcategoriesApiId,
  projectsbyid,
  interequirementsApiId,
  requirementstoprojectsbyid,
  tasksApiIdRequirement,
  tasksApiIdCompleted,
  tasksWriteApi,
  requirementsCheck,
} from "../../Services/Fetch";
import Tasks from "../../components/Requirements/Tasks";
import ModalD from "../../components/Requirements/Modal";
import ViewModal from "../../components/Requirements/ViewModal";
import Carousel from "../../components/Requirements/Carousel";
import ModalSub from "../../components/Requirements/ModalSub";
import RequirementsFunctionals from "../../components/Requirements/RequirementsFunctionals";
import RequirementsNoFunctionals from "../../components/Requirements/RequirementsN";

const variants = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0 },
};

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link"],
    [{ color: [] }, { background: [] }],
    ["script"],
    [{ size: ["small", false, "large", "huge"] }],
    [{ align: [] }],
    ["clean"],
  ],
};

const formats = [
  "header",
  "font",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "link",
  "color",
  "background",
  "script",
  "size",
  "align",
];

export default function Requirements() {
  const [openModal, setOpenModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [securityRequirements, setSecurityRequirements] = useState([]);
  const [checkRequirements, setCheckRequirements] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);
  const [viewDescriptionOpen, setViewDescriptionOpen] = useState(false);
  const [editedDescription, setEditedDescription] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);
  const [requirements, setRequirements] = useState({});
  const [project, setProject] = useState({});

  const params = useParams();

  useEffect(() => {
    try {
      const fetchCategories = async () => {
        const resp = await fetch(categoriessecurityApi);
        const data = await resp.json();
        setCategories(data);
        //setIdCategories(data.map((c) => c.id));
      };
      fetchCategories();
    } catch (error) {
      console.error("Error al cargar las categorías:", error);
    }
    const checkRequirements = async (id) => {
      try {
        const resp = await fetch(requirementsCheck + id);
        const data = await resp.json();
        console.log("Estas son las respuestas");
        setCheckRequirements(data.isNotFuntional);
        console.log("Estas son las respuestas");
        console.log(data);
      } catch (error) {
        console.error("Error al cargar las respuestas:", error);
      }
    }
    if (params.id) {
      checkRequirements(params.id);
    }
  }, []);

  const loadSybCategories = async (id) => {
    try {
      const resp = await fetch(subcategoriesCategoriesApiId + id);
      const data = await resp.json();
      setSubcategories(data);
      console.log("Estas son las subcategorías");
      console.log(data);
    } catch (error) {
      console.error("Error al cargar las subcategorías:", error);
    }
  };

  const loadRequirementsSecurity = async (id) => {
    try {
      if (subcategories.length > 0) {
        const resp = await fetch(requirementsecSubcategoriesApiId + id);
        const data = await resp.json();
        setSecurityRequirements(data);
        console.log("Estos son los requisitos de seguridad");
        console.log(data);
      }
    } catch (error) {
      console.error("Error al cargar los requisitos de seguridad:", error);
    }
  };

  const saveSelections = (id, selectedSecurityRequirements) => {
    // Crear un objeto que contenga los IDs de los requisitos de seguridad seleccionados
    console.log("este es el id del requisitos" + params.id);
    console.log("Estas son las respuestas seleccionadas");
    console.log(selectedSecurityRequirements);
    const selections = {
      requirements_id: id, // Supongo que params.id contiene el ID de los requisitos normales
      requirements_security_id: selectedSecurityRequirements,
    };

    // Enviar la solicitud POST al servidor para guardar las selecciones
    fetch(interequirementsApiId, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(selections),
    })
      .then((response) => {
        if (response.ok) {
          console.log(
            "Selecciones guardadas exitosamente en la base de datos."
          );

          loadTasks(params.id);
          //closeModal();
          // Puedes redirigir al usuario o mostrar un mensaje de éxito aquí
        } else {
          console.error("Error al guardar selecciones en la base de datos.");
        }
      })
      .catch((error) =>
        console.error("Error al realizar la solicitud:", error)
      );
  };

  const loadProject = async (id) => {
    try {
      const resp = await fetch(projectsbyid + id);
      const data = await resp.json();
      setProject(
        await {
          name: data.name,
        }
      );
    } catch (error) {
      console.error("Error al cargar el proyecto:", error);
    }
  };

  useEffect(() => {
    const loadRequirements = async (id) => {
      try {
        const resp = await fetch(requirementstoprojectsbyid + id);
        const data = await resp.json();
        setRequirements(
          await {
            ident_requirement_id: data.ident_requirement_id,
            name: data.name,
            characteristicsr: data.characteristicsr,
            description: data.description,
            req_no_funtional: data.req_no_funtional,
            priority_req: data.priority_req,
            project_id: data.project_id,
          }
        );
        loadProject(data.project_id);
      } catch (error) {
        console.error("Error al cargar los requisitos:", error);
      }
    };
    if (params.id) {
      loadRequirements(params.id);
      loadProject(params.id);
    }
  }, [params.id]);

  const loadTasks = async (id) => {
    try {
      const resp = await fetch(tasksApiIdRequirement + id);
      const data = await resp.json();
      setTasks(data);
    } catch (error) {
      console.error("Error al cargar las tareas:", error);
    }
  };

  useEffect(() => {
    if (params.id) {
      -loadTasks(params.id);
    }
  }, [params.id]);

  const toggleCompleted = async (id) => {
    try {
      const currentTask = tasks.find((t) => t.id === id);
      if (currentTask) {
        const newCompletedState = !currentTask.completed;

        const response = await fetch(tasksApiIdCompleted + id, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ completed: newCompletedState }),
        });

        if (response.ok) {
          const updatedTask = await response.json();
          const updatedTaskId = updatedTask.id;
          const updatedTaskCompleted = updatedTask.completed;
          const updatedTasks = tasks.map((t) =>
            t.id === updatedTaskId
              ? { ...t, completed: updatedTaskCompleted }
              : t
          );
          setTasks(updatedTasks);
        } else {
          console.error("Error al actualizar la tarea en el servidor");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditDescription = (task) => {
    setSelectedTask(task);
    setEditedDescription(task.write_description);
    setOpen(true);
  };

  const handleViewDescription = (task) => {
    setSelectedTask(task);
    setEditedDescription(task.write_description);
    setViewDescriptionOpen(true);
  };

  const handleCloseViewDescription = () => {
    setViewDescriptionOpen(false);
  };

  const handleSaveDescription = async () => {
    try {
      if (selectedTask) {
        const response = await fetch(tasksWriteApi + selectedTask.id, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            write_description: editedDescription,
          }),
        });

        if (response.ok) {
          const updatedTask = { ...selectedTask };
          updatedTask.write_description = editedDescription;

          const updatedTasks = tasks.map((t) =>
            t.id === updatedTask.id ? updatedTask : t
          );
          setTasks(updatedTasks);
          setSelectedTask(null);
          setEditedDescription("");
          setOpen(false);
        } else {
          console.error("Error al guardar la descripción en el servidor");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedTask(null);
    setEditedDescription("");
  };

  return (
    <>
      <div className="">
        <div className="container mx-auto items-center text-center">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Requerimiento del Proyecto: {project.name}
          </h2>

          {
            checkRequirements ? (
              <RequirementsNoFunctionals 
                requirements={requirements}
              />
            ) : (
              <RequirementsFunctionals
                requirements={requirements}
              />
            )
          }

          <Carousel
            categories={categories}
            loadSybCategories={loadSybCategories}
            setOpenModal={setOpenModal}
          />
       

      <ModalSub
        subcategories={subcategories}
        open={openModal}
        setOpen={setOpenModal}
        loadRequirementsSecurity={loadRequirementsSecurity}
        requirements={requirements}
        securityRequirements={securityRequirements}
        saveSelections={saveSelections}
        idparam={params.id}
      />

      <Tasks
        tasks={tasks}
        toggleCompleted={toggleCompleted}
        handleEditDescription={handleEditDescription}
        handleViewDescription={handleViewDescription}
        variants={variants}
      />

      <ModalD
        open={open}
        handleClose={handleClose}
        handleSaveDescription={handleSaveDescription}
        editedDescription={editedDescription}
        setEditedDescription={setEditedDescription}
        modules={modules}
        formats={formats}
      />

      <ViewModal
        viewDescriptionOpen={viewDescriptionOpen}
        handleCloseViewDescription={handleCloseViewDescription}
        editedDescription={editedDescription}
      />
       </div>
      </div>
    </>
  );
}
