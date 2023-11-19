import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { XCircleIcon } from "@heroicons/react/24/outline";
import SelectQuestions from "../../components/Questionnaire/Select";
import {
  fetchQuestionnaire,
  saveQuestionnaire,
} from "../../components/Questionnaire/QuestionnaireFetch";
import useToast from "../../hooks/useToast";

const Questionnaire = () => {
  const { toast } = useToast();
  const [questionnaire, setQuestionnaire] = useState({
    name: "",
    categories: [],
  });
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setEditing(true);
      fetchQuestionnaire(id, setQuestionnaire);
    }
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setQuestionnaire({
      ...questionnaire,
      [name]: value,
    });
  };

  const handleSaveQuestionnaire = async () => {
    setLoading(true);
    const result = await saveQuestionnaire(
      questionnaire,
      editing,
      id,
      navigate,
      setLoading
    );

    if (result.error) {
      toast.error(result.error);
    }
    if (result.success) {
      toast.success(result.success);
    }

  };

  return (
    <section className="flex items-center justify-center text-white md:p-44">
      <div className="w-96 bg-white rounded shadow-lg max-w-md p-8 space-y-6 bg-opacity-75 relative">
        <Link to="/managequestionnaire" className="absolute top-2 right-2">
          <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
            <XCircleIcon className="h-6 w-6" />
          </button>
        </Link>
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl mb-4 font-semibold text-center text-indigo-950">
              {editing ? "Editar cuestionario" : "Crear cuestionario"}
            </h1>
          </div>
          <form className="w-full space-y-4">
            <input
              type="text"
              placeholder="Nombre del cuestionario"
              className="p-3 rounded border w-full focus:outline-none focus:border-indigo-950 text-black"
              autoFocus
              name="name"
              value={questionnaire.name}
              onChange={handleInputChange}
              required
            />
             <SelectQuestions
              multiline
              rows={4}
              sx={{
                mb: 2,
              }}
              questionnaire={questionnaire}
              setQuestionnaire={setQuestionnaire}
            />
            <button
              type="submit"
              className="text-white font-bold py-3 rounded w-full transition duration-300 ease-in-out"
              disabled={loading}
              style={{ backgroundColor: "#2c3e50" }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#465669")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#2c3e50")}
              onClick={handleSaveQuestionnaire}
            >
              {editing ? "Guardar cambios" : "Guardar"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Questionnaire;