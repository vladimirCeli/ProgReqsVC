/* eslint-disable no-prototype-builtins */
import { useState, useEffect, useRef } from "react";
import moment from "moment";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useParams } from "react-router-dom";
import { Radar } from "react-chartjs-2";
import {
  responseApiId,
  questionnairesComplete,
  projectsbyid,
  projectsbyprogressid,
} from "../Services/Fetch";
import assessment from "../Calc/Calculator";
import SpiderGraph from "../Calc/PracticeGraf";
import { RadialLinearScale } from "chart.js";
import Chart from "chart.js/auto";

Chart.register(RadialLinearScale);

let finalScore = [0, 0];
let percentageScore = 0;
const practiceRadar = new SpiderGraph();
practiceRadar.set_title_text("practice");

const GraphicsResults = () => {
  const [projectProgress, setProjectProgress] = useState(null);
  const [requirements, setRequirements] = useState(null);
  const [project, setProject] = useState({
    name: "",
    description: "",
    created_at: "",
    updated_at: "",
  });
  const { id1, id2, id3 } = useParams();
  const [questionnaire, setQuestionnaire] = useState(null);
  const [responses, setResponses] = useState({});
  const [showPrevious] = useState(false);
  const [final, setFinal] = useState(0);
  const radarRef = useRef(null);
  const [finalScores, setFinalScores] = useState([0, 0]);

  const questionnaireId = id1;

  useEffect(() => {
    const loadProject = async (id) => {
      try {
        const response = await fetch(projectsbyid + id);
        if (response.ok) {
          const data = await response.json();
          setProject((prevProject) => ({ ...prevProject, ...data }));
        } else {
          console.log("No se encontró la propiedad 'name' en el objeto JSON.");
        }
      } catch (e) {
        console.error("Error al cargar los proyectos:", e);
      }
    };

    const fetchProjectProgress = async () => {
      try {
        const response = await fetch(projectsbyprogressid + id2);
        const data = await response.json();

        if (data && data.progress !== undefined) {
          const convertedNumber = parseFloat(data.progress);
          const convertedNumber2 = parseInt(data.totalRequirements);
          console.log(convertedNumber2);
          setRequirements(convertedNumber2);
          setProjectProgress(convertedNumber);
        } else {
          console.error("Formato de respuesta incorrecto:", data);
        }
      } catch (error) {
        console.error("Error al obtener el progreso del proyecto:", error);
      }
    };

    if (id2) {
      loadProject(id2);
      fetchProjectProgress();
    }
  }, [id2]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const questionnaireResponse = await fetch(
          questionnairesComplete + questionnaireId
        );
        const responseData = await fetch(responseApiId + id3);

        if (questionnaireResponse.ok) {
          const questionnaireData = await questionnaireResponse.json();
          setQuestionnaire(questionnaireData);
        } else {
          console.log("Error al obtener el cuestionario");
        }

        if (responseData.ok) {
          const responseJson = await responseData.json();
          setResponses(responseJson.questions || {});
        } else {
          console.log("Error al obtener las respuestas");
        }
      } catch (e) {
        console.error("Error al obtener los datos:", e);
      }
    };

    fetchData();
  }, []);

  const [radarData, setRadarData] = useState({
    labels: [],
    datasets: [
      {
        label: "",
        data: [],
        backgroundColor: "",
        borderColor: "",
        pointBackgroundColor: "",
        pointBorderColor: "",
        pointHoverBackgroundColor: "",
        pointHoverBorderColor: "",
      },
    ],
  });

  useEffect(() => {
    const calculateResults = () => {
      if (questionnaire && responses && questionnaire.categories) {
        const modelConfig = {};
        const transformedObject = {};
        let currentQuestionIndex = 1;

        questionnaire.categories.forEach((category) => {
          const categoryConfig = {
            totalScore: 0,
            practices: {},
          };
          category.practices.forEach((practice) => {
            const practiceConfig = {
              start: currentQuestionIndex,
              numQuestions: practice.questions.length,
              score: 0,
            };
            categoryConfig.practices[practice.name] = practiceConfig;
            currentQuestionIndex += practice.questions.length;
          });
          modelConfig[category.name] = categoryConfig;
        });

        let cont = 0;
        for (const key in responses) {
          cont++;
          if (responses.hasOwnProperty(key)) {
            const newPropertyName = `question${cont}`;
            transformedObject[newPropertyName] = responses[key];
          }
        }
        const dataENV = [transformedObject];

        if (dataENV && Object.keys(dataENV).length) {
          const testCalc = new assessment(dataENV[0], modelConfig);
          testCalc.computeResults();

          if (testCalc.overallScore !== null && !isNaN(testCalc.overallScore)) {
            finalScore[0] = testCalc.overallScore.toFixed(2);
            setFinalScores([finalScore[0], 0]);
            percentageScore = parseFloat(
              ((finalScore[0] / 3) * 100).toFixed(2)
            );

            // Actualizar el estado de la gráfica
            setRadarData({
              labels: testCalc.practiceNames,
              datasets: [
                {
                  label: "Evaluación actual",
                  data: testCalc.practiceScores,
                  backgroundColor: "rgba(30, 58, 138, 0.2)",
                  borderColor: "rgba(30, 58, 138)",
                  pointBackgroundColor: "rgba(30, 58, 132, 0.2)",
                  pointBorderColor: "#fff",
                  pointHoverBackgroundColor: "#fff",
                  pointHoverBorderColor: "rgba(30, 58, 132, 0.2)",
                },
              ],
            });
          } else {
            console.error("Error en el cálculo de resultados.");
          }
        }

        setFinal(percentageScore);
      }
    };

    calculateResults();
  }, [questionnaire, responses]);

  const handleGeneratePDF = async () => {
    const pdf = new jsPDF("p", "mm", "a4");
    const content = document.getElementById("pdf-content");

    if (content) {
      try {
        const canvas = await html2canvas(content, {
          scale: 2,
          logging: true,
          windowWidth: document.getElementById("pdf-content").scrollWidth,
          windowHeight: document.getElementById("pdf-content").scrollHeight,
        });

        const imgData = canvas.toDataURL("image/png");
        pdf.addImage(imgData, "PNG", 10, 10, 190, 277);
        pdf.save("resultados_encuesta_samm.pdf");
      } catch (error) {
        console.error("Error al generar PDF:", error);
      }
    }
  };

  return (
    <>
      <div className="bg-white py-2 sm:py-2" id="pdf-content">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl sm:text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Resultados de la encuesta SAMM
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Una encuesta SAMM evalúa su proyecto en cinco áreas clave:
              Gobernanza, Diseño, Implementación, Verificación y Operaciones.
              Esta vez, reciba puntuaciones específicas en cada dominio para una
              visión más clara de sus fortalezas y áreas de mejora. Con
              resultados detallados, obtenga un enfoque personalizado para
              impulsar el crecimiento y la eficiencia de su empresa o proyecto.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
            <div className="p-8 sm:p-10 lg:flex-auto">
              <h3 className="text-2xl font-bold tracking-tight text-gray-900">
                {project.name}
              </h3>
              <p className="mt-6 text-base leading-7 text-gray-600">
                {project.description}
              </p>
              <p className="mt-6 text-base leading-7 text-gray-600">
                Proyecto creado el:{" "}
                {moment(project.created_at).format("DD/MM/YYYY")}
              </p>
              <p className="mt-6 text-base leading-7 text-gray-600">
                {requirements !== null
                  ? `El proyecto tiene: ${requirements} requisitos`
                  : "El proyecto no tiene requisitos"}
              </p>
              <div className="mt-6">
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-indigo-900 bg-indigo-200">
                        Tareas Completadas
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold inline-block text-indigo-900">
                        {projectProgress !== null
                          ? `${projectProgress}%`
                          : "0%"}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="relative pt-1">
                      <div className="flex mb-2 items-center justify-between">
                        <div className="flex-1 flex items-center">
                          <div className="w-full bg-gray-200 rounded-full">
                            <div
                              className={`rounded-full bg-indigo-900 text-xs leading-none py-1 text-center text-white`}
                              style={{ width: `${projectProgress}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-10 flex items-center gap-x-4">
                <h4 className="flex-none text-sm font-semibold leading-6 text-indigo-900">
                  Madurez en la práctica
                </h4>
                <div className="h-px flex-auto bg-gray-100" />
              </div>

              {radarData.labels.length > 0 ? (
                <Radar
                  key={JSON.stringify(radarData)}
                  ref={radarRef}
                  data={radarData}
                  options={practiceRadar.layout_props}
                  className="practiceRadar"
                />
              ) : (
                <p>Los datos no están disponibles.</p>
              )}
            </div>
            <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0 h-full">
              <div className="rounded-2xl bg-blue-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
                <div className="mx-auto max-w-xs px-8">
                  <p className="text-base font-semibold text-gray-600">
                    {showPrevious
                      ? `Tu puntuación general es: ${finalScores[0]}/3. Tu puntuación anterior fue: ${finalScores[1]}/3`
                      : `Tu puntuación general es: ${finalScores[0]}/3`}
                  </p>
                  <p className="mt-6 flex items-baseline justify-center gap-x-2">
                    <span className="text-5xl font-bold tracking-tight text-gray-900">
                      {final}%
                    </span>
                  </p>
                  <button
                    onClick={handleGeneratePDF}
                    className="mt-10 block w-full rounded-md bg-indigo-900 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Generar PDF
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GraphicsResults;
