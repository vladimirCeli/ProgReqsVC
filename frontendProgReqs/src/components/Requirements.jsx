import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Switch,
  Grid,
  Paper,
  CardContent,
  IconButton,
  Toolbar,
  Slide,
  Dialog,
  Button,
  Table,
  TableContainer,
  TableRow,
  TableCell,
  Container,
  Checkbox,
  FormControlLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import ExpandMore from "@mui/icons-material/ExpandMore";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { motion } from "framer-motion";

import { useParams } from "react-router-dom";
import {
  categoriessecurityApi,
  subcategoriesApi,
  requirementsecApi,
  projectsbyid,
  interequirementsApiId,
  requirementstoprojectsbyid,
  tasksApiIdRequirement,
  tasksApiIdCompleted,
  tasksWriteApi,
} from "../Services/Fetch";

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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Requirements() {
  const [categories, setCategories] = useState([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [securityRequirements, setSecurityRequirements] = useState([]);
  const [selectedSecurityRequirements, setSelectedSecurityRequirements] =
    useState([]);
  const [subcategoriesData, setSubcategoriesData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);
  const [viewDescriptionOpen, setViewDescriptionOpen] = useState(false);
  const [editedDescription, setEditedDescription] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);
  const [requirements, setRequirements] = useState({});
  const [project, setProject] = useState({});

  const params = useParams();

  useEffect(() => {
    // Cargar categorías desde la API (solo para presentación)
    fetch(categoriessecurityApi)
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error al cargar categorías:", error));

    // Cargar subcategorías desde la API
    fetch(subcategoriesApi)
      .then((response) => response.json())
      .then((data) => setSubcategoriesData(data))
      .catch((error) => console.error("Error al cargar subcategorías:", error));

    // Cargar requisitos de seguridad desde la API
    fetch(requirementsecApi)
      .then((response) => response.json())
      .then((data) => setSecurityRequirements(data))
      .catch((error) =>
        console.error("Error al cargar requisitos de seguridad:", error)
      );
  }, []);

  const handleSubcategoryChange = (subcategory) => {
    // Lógica para manejar el cambio de selección de subcategoría
    const subcategoryId = subcategory.id;

    if (selectedSubcategories.includes(subcategoryId)) {
      setSelectedSubcategories(
        selectedSubcategories.filter((id) => id !== subcategoryId)
      );
      // Deseleccionar automáticamente los requisitos de seguridad
      setSelectedSecurityRequirements(
        selectedSecurityRequirements.filter(
          (id) =>
            !securityRequirements.some(
              (req) =>
                req.subcategories_requirements_id === subcategoryId &&
                req.id === id
            )
        )
      );
    } else {
      setSelectedSubcategories([...selectedSubcategories, subcategoryId]);
      // Seleccionar automáticamente los requisitos de seguridad
      const newSelectedRequirements = securityRequirements
        .filter((req) => req.subcategories_requirements_id === subcategoryId)
        .map((req) => req.id);
      setSelectedSecurityRequirements([
        ...selectedSecurityRequirements,
        ...newSelectedRequirements,
      ]);
    }
  };

  const handleSecurityRequirementChange = (requirement) => {
    // Lógica para manejar el cambio de selección de requisito de seguridad
    const requirementId = requirement.id;

    if (selectedSecurityRequirements.includes(requirementId)) {
      setSelectedSecurityRequirements(
        selectedSecurityRequirements.filter((id) => id !== requirementId)
      );
    } else {
      setSelectedSecurityRequirements([
        ...selectedSecurityRequirements,
        requirementId,
      ]);
    }
  };

  const categoryAccordion = () => {
    if (categories.length === 0) {
      return null;
    }

    return (
      <Container>
        {categories.map((category) => (
          <Accordion key={category.id}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant="h5">{category.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>{subcategoryDropdown(category)}</AccordionDetails>
          </Accordion>
        ))}
      </Container>
    );
  };

  const subcategoryDropdown = (category) => {
    const subcategories = subcategoriesData.filter(
      (subcategory) => subcategory.categories_requirements_id === category.id
    );

    if (subcategories.length === 0) {
      return null;
    }

    return (
      <Container>
        {subcategories.map((subcategory) => (
          <motion.div
            key={subcategory.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedSubcategories.includes(subcategory.id)}
                  onChange={() => handleSubcategoryChange(subcategory)}
                />
              }
              label={subcategory.name}
            />
            {securityRequirementDropdown(subcategory)}
          </motion.div>
        ))}
      </Container>
    );
  };

  const securityRequirementDropdown = (subcategory) => {
    const requirements = securityRequirements.filter(
      (requirement) =>
        requirement.subcategories_requirements_id === subcategory.id
    );

    if (requirements.length === 0) {
      return null;
    }

    return (
      <Container>
        {requirements.map((requirement) => (
          <motion.div
            key={requirement.id}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedSecurityRequirements.includes(
                    requirement.id
                  )}
                  onChange={() => handleSecurityRequirementChange(requirement)}
                />
              }
              variant="body1"
              gutterBottom
              sx={{ wordBreak: "break-word" }}
              label={`${requirement.description}`}
            />
          </motion.div>
        ))}
      </Container>
    );
  };

  const saveSelections = () => {
    // Crear un objeto que contenga los IDs de los requisitos de seguridad seleccionados
    console.log("este es el id del requisitos" + params.id);
    console.log("Estas son las respuestas seleccionadas");
    console.log(selectedSecurityRequirements);
    const selections = {
      requirements_id: params.id, // Supongo que params.id contiene el ID de los requisitos normales
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
          closeModal();
          // Puedes redirigir al usuario o mostrar un mensaje de éxito aquí
        } else {
          console.error("Error al guardar selecciones en la base de datos.");
        }
      })
      .catch((error) =>
        console.error("Error al realizar la solicitud:", error)
      );
  };

  // Función para abrir el modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSubcategories([]);
    setSelectedSecurityRequirements([]);
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
      loadTasks(params.id);
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
    setViewDescriptionOpen(true); // Abre la ventana emergente de visualización de descripción
  };

  const handleCloseViewDescription = () => {
    setViewDescriptionOpen(false); // Cierra la ventana emergente de visualización de descripción
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
    <Container maxWidth="lg" style={{ marginTop: "20px" }}>
      <h4 className="font-bold text-lg mb-4 text-center items-center">
        Requerimiento del Proyecto: {project.name}
      </h4>
      <div className="container mx-auto bg-white p-4 rounded-lg shadow-lg text-center items-center">
        <div className="container mx-auto bg-gray-50 p-4 rounded-lg shadow-lg">
          <div className="max-w-sm mx-auto">
            <div className="w-full border-2 border-gray-800 mb-2">
              <table className="w-full">
                <tr className="border-b-2 border-gray-800">
                  <td className="p-2 border-r-2 border-gray-800 font-bold">
                    Identificación del Requerimiento
                  </td>
                  <td className="p-2 break-words">
                    {requirements.ident_requirement_id}
                  </td>
                </tr>
                <tr className="border-b-2 border-gray-800">
                  <td className="p-2 border-r-2 border-gray-800 font-bold">
                    Nombre del requerimiento
                  </td>
                  <td className="p-2 break-words">{requirements.name}</td>
                </tr>
                <tr className="border-b-2 border-gray-800">
                  <td className="p-2 border-r-2 border-gray-800 font-bold">
                    Características
                  </td>
                  <td className="p-2 break-words">
                    {requirements.characteristicsr}
                  </td>
                </tr>
                <tr className="border-b-2 border-gray-800">
                  <td className="p-2 border-r-2 border-gray-800 font-bold">
                    Descripción del requerimiento
                  </td>
                  <td className="p-2 break-words">
                    {requirements.description}
                  </td>
                </tr>
                <tr className="border-b-2 border-gray-800">
                  <td className="p-2 border-r-2 border-gray-800 font-bold">
                    Requerimiento no funcional
                  </td>
                  <td className="p-2 break-words">
                    {requirements.req_no_funtional}
                  </td>
                </tr>
                <tr className="border-b-2 border-gray-800">
                  <td className="p-2 border-r-2 border-gray-800 font-bold">
                    Prioridad del Requerimiento
                  </td>
                  <td className="p-2 break-words">
                    {requirements.priority_req}
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <button
            onClick={openModal}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center items-center"
          >
            Agregar Tareas de seguridad
          </button>
        </div>
      </div>
      {/**modal */}
      <div className="flex flex-col items-center w-full">
        {isModalOpen && (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div
                className="fixed inset-0 transition-opacity"
                aria-hidden="true"
              >
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Seleccione Seguridad
                  </h3>
                  <div className="mt-2">
                    <h4 className="text-xl font-semibold">ASVS</h4>
                    <p className="text-lg">
                      Seleccione los requisitos de seguridad
                    </p>
                    {categoryAccordion()}
                  </div>
                </div>
                <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    onClick={saveSelections}
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Guardar Selecciones
                  </button>
                  <button
                    onClick={closeModal}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/**fin modal */}
      <Box display="flex" flexDirection="column" alignItems="center" className="mt-5" >
        <h1 className="font-bold text-lg mb-4 text-center items-center">Lista de tareas</h1>
        <Typography variant="h6" sx={{ mb: 2 }}></Typography>
        <Grid container spacing={2}>
          {Array.isArray(tasks) && Object.keys(tasks).length > 0 ? (
            tasks.map((task) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={task.id}>
                <motion.div
                  key={task.id}
                  initial="hidden"
                  animate="visible"
                  variants={variants}
                >
                  <Paper
                    elevation={3}
                    style={{
                      borderRadius: "16px",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    <CardContent>
                      <Typography
                        variant="h5"
                        component="h2"
                        align="inherit"
                        noWrap
                      >
                        {task.name}
                      </Typography>
                      <Typography
                        variant="body1"
                        align="inherit"
                        gutterBottom
                        sx={{ wordBreak: "break-all" }}
                      >
                        {task.description}
                      </Typography>

                      <Typography variant="body1" align="inherit" noWrap>
                        CWE: {task.cwe}
                      </Typography>
                      <Typography variant="body1" align="inherit" noWrap>
                        NIST: {task.nist}
                      </Typography>
                      {task.write_description ? (
                        <>
                          <IconButton
                            variant="body1"
                            align="inherit"
                            noWrap
                            onClick={() => handleEditDescription(task)}
                          >
                            <Typography variant="body1" align="inherit" noWrap>
                              Editar Descripción
                            </Typography>
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            variant="body1"
                            align="inherit"
                            noWrap
                            onClick={() => handleViewDescription(task)}
                          >
                            <Typography variant="body1" align="inherit" noWrap>
                              Ver Descripción
                            </Typography>
                            <VisibilityIcon />
                          </IconButton>
                        </>
                      ) : (
                        <IconButton
                          variant="body1"
                          align="inherit"
                          noWrap
                          onClick={() => handleEditDescription(task)}
                        >
                          <Typography variant="body1" align="inherit" noWrap>
                            Descripción
                          </Typography>
                          <AddCircleIcon />
                        </IconButton>
                      )}
                      <Box mt={2} mb={1}>
                        <Switch
                          color="success"
                          checked={task.completed || false}
                          onChange={() => toggleCompleted(task.id)}
                          name="Completar"
                        />
                      </Box>
                    </CardContent>
                  </Paper>
                </motion.div>
              </Grid>
            ))
          ) : (
            <Typography variant="h6" sx={{ mb: 2 }}>
              No hay tareas
            </Typography>
          )}
        </Grid>
      </Box>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Descripción
          </Typography>
          <Button autoFocus color="inherit" onClick={handleSaveDescription}>
            Guardar
          </Button>
        </Toolbar>
        <Box p={2} style={{ padding: "16px" }}>
          <ReactQuill
            value={editedDescription}
            onChange={setEditedDescription}
            modules={modules}
            formats={formats}
            style={{
              minHeight: "150px",
              fontSize: "16px",
              border: "none",
              borderRadius: "4px",
            }}
            placeholder="Escribe una descripción..."
          />
        </Box>
      </Dialog>
      <Dialog
        fullScreen
        open={viewDescriptionOpen}
        onClose={handleCloseViewDescription}
        TransitionComponent={Transition}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleCloseViewDescription}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Ver Descripción
          </Typography>
        </Toolbar>
        <Box p={2} sx={{ wordBreak: "break-word" }}>
          <div
            dangerouslySetInnerHTML={{ __html: editedDescription }}
            style={{
              minHeight: "150px",
              fontSize: "16px",
              border: "none",
              borderRadius: "4px",
              padding: "8px",
              overflowY: "auto",
            }}
          />
        </Box>
      </Dialog>
    </Container>
  );
}
