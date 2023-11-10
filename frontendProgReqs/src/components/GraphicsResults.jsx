import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Radar } from "react-chartjs-2";
import { CircularProgress } from "@mui/material";
import { responseApiId, questionnairesComplete } from "../Services/Fetch";
import assessment from "../Calc/Calculator";
import SpiderGraph from "../Calc/PracticeGraf";
import { RadialLinearScale } from "chart.js";
import Chart from "chart.js/auto";

Chart.register(RadialLinearScale);

var dataENV = [];
let finalScore = [0, 0];
let percentageScore = 0;
var modelConfig = {};
const practiceRadar = new SpiderGraph();
practiceRadar.set_title_text("practice");

const GraphicsResults = () => {
  const { id1, id2, id3 } = useParams();
  const [questionnaire, setQuestionnaire] = useState(null);
  const [responses, setResponses] = useState({});
  const [showPrevious, setShowPrevious] = useState(false);
  const [final, setFinal] = useState(0);
  const radarRef = useRef(null);
  const [finalScores, setFinalScores] = useState([0, 0]);

  const questionnaireId = id1;

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

  useEffect(() => {
    if (questionnaire && responses) {

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
    
    const transformedObject = {};
    var cont = 0;
    for (const key in responses) {
      cont++;
      // eslint-disable-next-line no-prototype-builtins
      if (responses.hasOwnProperty(key)) {
        const newPropertyName = `question${cont}`;
        transformedObject[newPropertyName] = responses[key];
      }
    }
    dataENV[0] = transformedObject;
    if (dataENV && Object.keys(dataENV).length) {
      for (let dataNum = 0; dataNum < dataENV.length; dataNum++) {
        var testCalc = new assessment(dataENV[dataNum], modelConfig);
        testCalc.computeResults();
        practiceRadar.metaData.labels = testCalc.practiceNames;
        practiceRadar.metaData.datasets[dataNum].data = testCalc.practiceScores;
        if (testCalc.overallScore !== null) {
          finalScore[dataNum] = testCalc.overallScore.toFixed(2);
          setFinalScores([finalScore[dataNum], 0]);
        }
        percentageScore = parseFloat(
          ((finalScore[dataNum] / 3) * 100).toFixed(2)
        );
      }
    }

    setFinal(percentageScore);
  }
    //setLoading(false);
  }, [questionnaire, responses]);

  return (
<>
  <div className="flex flex-col items-center text-center justify-center mb-8">
      <h6 className="text-3xl font-bold text-white mb-4" id="finalscore">
        {showPrevious
          ? `Tu puntuación general es: ${finalScores[0]}/3. Tu puntuación anterior fue: ${finalScores[1]}/3`
          : `Tu puntuación general es: ${finalScores[0]}/3`}
      </h6>
      <div className="flex justify-center items-center flex-col shadow-md rounded-full w-48 h-48 relative bg-blue-200 bg-opacity-75">
        <h6 className="text-lg font-bold text-black absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">{final}%</h6>
        <CircularProgress
          variant="determinate"
          value={final}
          size={150}
          thickness={5}
          className={
            percentageScore <= 25
              ? "text-red-500"
              : percentageScore <= 50
              ? "text-yellow-500"
              : percentageScore <= 75
              ? "text-yellow-300"
              : "text-green-400"
          }
        />
      </div>
  </div>
  <div label="Practices" className="practices flex flex-col items-center justify-center text-center mt-8">
    <div className="w-full md:w-1/2 p-3 practiceRadarBox bg-blue-200 bg-opacity-75 rounded-lg shadow-xl">
      <h2 id="pracradargraph" className="text-3xl font-bold text-gray-800 mb-4"> Madurez en la práctica </h2>
      {practiceRadar.metaData.labels.length > 0 ? (
        <Radar
          key={JSON.stringify(practiceRadar.metaData)}
          ref={radarRef}
          data={practiceRadar.metaData}
          options={practiceRadar.layout_props}
          className="practiceRadar"
        />
      ) : (
        <p>Los datos no están disponibles.</p>
      )}
    </div>
  </div>
</>

  );
};

export default GraphicsResults;
