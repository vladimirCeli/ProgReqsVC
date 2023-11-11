import { useEffect, useState } from "react";

import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";

import { questionnairesAdditional, questionnairesAdditionalProject  } from "../../Services/Fetch";

const ProjectsQuestionnaires = ({ questionnaires, paramsId, navigate }) => {
  
  const [additionalQuestionnaires, setAdditionalQuestionnaires] = useState([]);
  const [selectedAdditionalQuestionnaire, setSelectedAdditionalQuestionnaire] = useState(null);

  const loadAdditionalQuestionnaires = async () => {
    try {
      const response = await fetch(questionnairesAdditional);
      const data = await response.json();
      setAdditionalQuestionnaires(data);
    } catch (error) {
      console.error("Error al cargar cuestionarios adicionales:", error);
    }
  };

  useEffect(() => {
    loadAdditionalQuestionnaires();
  }, [questionnaires]);

  const handleSelectAdditionalQuestionnaire = async (selectedId) => {
    try {
      const response = await fetch(questionnairesAdditionalProject+paramsId, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ selectedId }),
      });

      if (response.ok) {
        setSelectedAdditionalQuestionnaire(selectedId);
        loadAdditionalQuestionnaires();
      } else {
        console.error("Error al seleccionar cuestionario adicional:", response.status);
      }
    } catch (error) {
      console.error("Error al seleccionar cuestionario adicional:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 text-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Lista de cuestionarios habilitados
      </h1>
      {questionnaires.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {questionnaires.map((project) => (
            <div key={project._id}>
              <div className="bg-white rounded shadow p-4 transition duration-300 ease-in-out transform hover:scale-105 text-center bg-opacity-75">
                <QuestionMarkCircleIcon
                  className="h-12 w-12 mx-auto mb-4"
                  style={{ color: "#2c3e50" }}
                />
                <h2 className="text-lg font-semibold mb-4 text-gray-900 whitespace-normal max-w-[24rem] lg:text-sm">
                  <span className="inline-block max-w-full truncate">
                    {project.name}
                  </span>
                </h2>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <button
                    className="w-full text-white py-2 rounded transition duration-300 ease-in-out flex items-center text-center justify-center"
                    onClick={() =>
                      navigate(`/response/${project._id}/${paramsId}`)
                    }
                    style={{ backgroundColor: "#2c3e50" }}
                    onMouseOver={(e) =>
                      (e.target.style.backgroundColor = "#465669")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "#2c3e50")
                    }
                  >
                    Iniciar
                  </button>
                  <button
                    className="w-full bg-indigo-900 text-white py-2 rounded hover:bg-indigo-800 transition duration-300 ease-in-out"
                    onClick={() =>
                      navigate(`/listresponses/${project._id}/${paramsId}`)
                    }
                  >
                    Respuestas
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-lg mb-4 text-white">
          No hay cuestionarios habilitados
        </p>
      )}
      {additionalQuestionnaires.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Seleccione un cuestionario adicional
          </h2>
          <select
            className="p-2 border border-gray-300 rounded"
            onChange={(e) => handleSelectAdditionalQuestionnaire(e.target.value)}
            value={selectedAdditionalQuestionnaire || ""}
          >
            <option value="">
              Seleccionar cuestionario adicional
            </option>
            {additionalQuestionnaires.map((additionalProject) => (
              <option key={additionalProject._id} value={additionalProject._id}>
                {additionalProject.name}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default ProjectsQuestionnaires;
