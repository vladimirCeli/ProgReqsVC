import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Radar } from "react-chartjs-2";
import { Box, Typography, CircularProgress } from "@mui/material";
import { responseApiId, questionnairesComplete } from "../Services/Fetch";
import axios from "axios";
import assessment from "../Calc/Calculator";
import SpiderGraph from "../Calc/PracticeGraf";
import { motion } from "framer-motion";
import { RadialLinearScale } from "chart.js";
import Chart from "chart.js/auto";

Chart.register(RadialLinearScale);

var dataENV = [];
var finalScore = [0, 0];
var percentageScore = 0;
const practiceRadar = new SpiderGraph();
practiceRadar.set_title_text("practice");

const GraphicsResults = () => {
  const { id1, id2, id3 } = useParams();
  const [questionnaire, setQuestionnaire] = useState(null);
  const [responses, setResponses] = useState({});
  const [showPrevious, setShowPrevious] = useState(false);
  const [model, setModel] = useState({});
  const [final, setFinal] = useState(0);
  const radarRef = useRef(null);
  const [loading, setLoading] = useState(true);

  const questionnaireId = id1;

  useEffect(() => {
    const loadQuestionnaire = async () => {
      try {
        const response = await axios.get(
          questionnairesComplete + questionnaireId
        );
        setQuestionnaire(response.data);
      } catch (e) {
        console.error("Error al obtener el cuestionario:", e);
      }
    };
    if (id3) {
      axios
        .get(responseApiId + id3)
        .then((response) => {
          const responseData = response.data;
          setResponses(responseData.questions || {});
          loadQuestionnaire();
        })
        .catch((error) => {
          console.error("Error al obtener la respuesta:", error);
        });
    } else {
      loadQuestionnaire();
    }
  }, [questionnaireId, id3]);

  useEffect(() => {
    setLoading(true);
    if (questionnaire) {
      const modelConfig = {};
      let currentQuestionIndex = 1;

      questionnaire.categories.forEach((category, categoryIndex) => {
        const categoryConfig = {
          totalScore: 0,
          practices: {},
        };
        category.practices.forEach((practice, practiceIndex) => {
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
      setModel(modelConfig);
    }

    const transformedObject = {};
    var cont = 0;
    for (const key in responses) {
      cont++;
      if (responses.hasOwnProperty(key)) {
        const newPropertyName = `question${cont}`;
        transformedObject[newPropertyName] = responses[key];
      }
    }
    dataENV[0] = transformedObject;

    for (let dataNum = 0; dataNum < dataENV.length; dataNum++) {
      var testCalc = new assessment(dataENV[dataNum], model);
      testCalc.computeResults();
      if (testCalc.overallScore) {
        finalScore[dataNum] = testCalc.overallScore
          ? testCalc.overallScore.toFixed(2)
          : 0;
        console.log("Final score: ", finalScore[dataNum]);

        practiceRadar.metaData.labels = testCalc.practiceNames;
        practiceRadar.metaData.datasets[dataNum].data = testCalc.practiceScores;

        percentageScore = parseFloat(
          ((finalScore[dataNum] / 3) * 100).toFixed(2)
        );

        console.log("Percentage score: ", percentageScore);

        console.log("Datos de la gráfica:", practiceRadar.metaData);
        console.log("Puntuación final:", final);
      }
    }
    console.log("Final score: ", finalScore);
    console.log("Percentage score: ", percentageScore);

    setFinal(percentageScore);
    //setLoading(false);
  }, [questionnaire, responses]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoading(false); // Establece loading en false después de un minuto
    }, 13000); // 1 minuto en milisegundos

    // Limpia el temporizador si el componente se desmonta antes del tiempo especificado
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <div>
          <CircularProgress />
        </div>
      </Box>
    );
  }

  return (
    <>
      <Box display="flex" flexDirection="column" alignItems="center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <Typography variant="h6" id="finalscore">
            {showPrevious
              ? `Tu puntuación general es: ${finalScore[0]}/3. Tu puntuación anterior fue: ${finalScore[1]}/3`
              : `Tu puntuación general es: ${finalScore[0]}/3`}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              borderRadius: "50%",
              width: "200px",
              height: "200px",
              position: "relative",
            }}
          >
            <Typography
              variant="h6"
              component="div"
              color="textPrimary"
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              {final}%
            </Typography>
            <CircularProgress
              variant="determinate"
              value={percentageScore}
              size={150}
              thickness={5}
              sx={{
                color: (theme) =>
                  percentageScore <= 25
                    ? "#ff6384"
                    : percentageScore <= 50
                    ? "#ff9f40"
                    : percentageScore <= 75
                    ? "#ffcd56"
                    : "#4bc0c0",
              }}
            />
          </Box>
        </motion.div>
      </Box>
      <div label="Practices" className="practices">
        <Box width={[1, 1 / 2]} p={3} className="practiceRadarBox">
          <h2 id="pracradargraph"> Madurez en la práctica </h2>
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
        </Box>
      </div>
    </>
  );
};

export default GraphicsResults;
