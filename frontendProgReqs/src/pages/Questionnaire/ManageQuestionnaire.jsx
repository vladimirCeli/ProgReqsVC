import {
  Box,
  Container,
} from "@mui/material";
import {
  QuestionnairesSection,
} from "../../Components/Questionnaire/QuestionnaireSecctions";
import QuestionnairesList from "../../components/Questionnaire/questionnairesList";

const QuestionnairesManager = () => {
  return (
    <Container maxWidth="lg" style={{ marginTop: "20px" }}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <h1>Gestión de Cuestionarios</h1>
      </Box>
      <QuestionnairesSection />
      <QuestionnairesList />
    </Container>
  );
};

export default QuestionnairesManager;
