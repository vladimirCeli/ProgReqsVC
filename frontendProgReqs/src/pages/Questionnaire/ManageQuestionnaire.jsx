import {
  QuestionnairesSection,
} from "../../Components/Questionnaire/QuestionnaireSecctions";
import QuestionnairesList from "../../components/Questionnaire/questionnairesList";

const QuestionnairesManager = () => {
  return (
    <div className="relative">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-3xl font-bold text-black mb-4 text-center items-center">Gestión de Cuestionarios</h1>
      </div>
      <QuestionnairesSection />
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-3xl font-bold text-black mb-4 text-center items-center">Lista de cuestionarios</h1>
      </div>
      <QuestionnairesList />
    </div>
  );
};

export default QuestionnairesManager;
