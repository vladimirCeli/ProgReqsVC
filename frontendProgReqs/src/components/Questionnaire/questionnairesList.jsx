import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  questionnairesApi,
  questionnairesbyidApi,
  questionnairesEditPublished,
  questionnairesEditSteps,
} from "../../Services/Fetch";

import DeleteConfirmationModal from "../Modal/DeleteConfirmationModal";
import useToast from "../../hooks/useToast";

const QuestionnairesList = () => {
  const { toast } = useToast();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [categoryToDeleteId, setCategoryToDeleteId] = useState(null);
  const [selectedStepsMap, setSelectedStepsMap] = useState({});

  const handleDeleteConfirmation = (id) => {
    setCategoryToDeleteId(id);
    setDeleteModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(questionnairesbyidApi + id, {
        method: "DELETE",
      });
      loadProjects();
      setDeleteModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const [questionnaire, setQuestionnaire] = useState([]);
  const navigate = useNavigate();

  const loadProjects = async () => {
    const res = await fetch(questionnairesApi);
    setQuestionnaire(await res.json());
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleEditSteps = async (id, newStepsState) => {
    try {
      const response = await fetch(questionnairesEditSteps + id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ steps: newStepsState }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        const updatedQuestionnaire = data;
        const updatedQuestionnaireId = updatedQuestionnaire._id;
        const updatedQuestionnaireSteps = updatedQuestionnaire.steps;
  
        const updatedQuestionnaires = questionnaire.map((q) =>
          q._id === updatedQuestionnaireId
            ? { ...q, steps: updatedQuestionnaireSteps }
            : q
        );
  
        setQuestionnaire(updatedQuestionnaires);
      } else {
        toast.error(data.message);
        // Revertir la selección en caso de error
        setSelectedStepsMap((prevMap) => ({
          ...prevMap,
          [id]: questionnaire.find((q) => q._id === id).steps,
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const togglePublish = async (id) => {
    try {
      const currentQuestionnaire = questionnaire.find((q) => q._id === id);
      if (currentQuestionnaire) {
        const newPublishedState = !currentQuestionnaire.published;

        const response = await fetch(questionnairesEditPublished + id, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ published: newPublishedState }),
        });

        if (response.ok) {
          const updatedQuestionnaire = await response.json();
          const updatedQuestionnaireId = updatedQuestionnaire._id;
          const updatedQuestionnairePublished = updatedQuestionnaire.published;
          const updatedQuestionnaires = questionnaire.map((q) =>
            q._id === updatedQuestionnaireId
              ? { ...q, published: updatedQuestionnairePublished }
              : q
          );
          setQuestionnaire(updatedQuestionnaires);
        } else {
          console.error("Error al actualizar el cuestionario en el servidor");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectChange = (id, value) => {
    const updatedStepsMap = { ...selectedStepsMap, [id]: value };
    setSelectedStepsMap(updatedStepsMap);
    handleEditSteps(id, value);
  };

  return (
    <>
      <DeleteConfirmationModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onDelete={() => handleDelete(categoryToDeleteId)}
      />
      <div className="flex justify-center items-center flex-wrap space-x-4 space-y-4">
        {Array.isArray(questionnaire) &&
        Object.keys(questionnaire).length > 0 ? (
          questionnaire.map((project) => (
            <div
              key={project.id}
              className="flex flex-col bg-white rounded-lg shadow-lg w-full md:w-80 lg:w-96 p-4 space-y-4"
            >
              <h2 className="text-xl font-bold truncate">{project.name}</h2>
              <div className="flex items-center justify-center flex-wrap space-x-4">
                <button
                  className="text-orange-500 hover:text-orange-700 transition-colors duration-300 w-1/2 md:w-auto"
                  onClick={() => navigate(`/questionnaire/${project._id}/edit`)}
                >
                  Editar
                </button>
                <button
                  className="text-red-500 hover:text-red-700 transition-colors duration-300 w-1/2 md:w-auto"
                  onClick={() => handleDeleteConfirmation(project._id)}
                >
                  Eliminar
                </button>
                <div className="relative w-full md:w-auto">
                  <input
                    type="checkbox"
                    id={`toggle${project._id}`}
                    checked={project.published || false}
                    onChange={() => togglePublish(project._id)}
                    name="publicar"
                    className="hidden"
                  />
                  <label
                    htmlFor={`toggle${project._id}`}
                    className="cursor-pointer"
                  >
                    <div className="w-10 h-6 bg-gray-300 rounded-full p-1 flex items-center">
                      <div
                        className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                          project.published ? "translate-x-6" : "translate-x-0"
                        }`}
                      ></div>
                    </div>
                  </label>
                </div>
                <select
                  id={`steps${project._id}`}
                  className="border border-gray-300 rounded-md text-gray-600 h-10 w-1/2 md:w-auto pl-3 pr-8 bg-white hover:border-gray-400 focus:outline-none"
                  value={selectedStepsMap[project._id] || project.steps}
                  onChange={(e) =>
                    handleSelectChange(project._id, Number(e.target.value))
                  }
                >
                  <option value="0" disabled={project.steps === 0}>
                    {project.steps !== 0 ? "Seleccione" : "Seleccione"}
                  </option>
                  <option value="1" disabled={project.steps === 1}>
                    {project.steps !== 1 ? "1" : "1"}
                  </option>
                  <option value="2" disabled={project.steps === 2}>
                    {project.steps !== 2 ? "2" : "2"}
                  </option>
                </select>
              </div>
            </div>
          ))
        ) : (
          <p className="text-lg">No hay cuestionarios</p>
        )}
      </div>
    </>
  );
};

export default QuestionnairesList;
