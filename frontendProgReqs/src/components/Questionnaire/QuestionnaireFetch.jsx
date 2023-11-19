import { questionnairesApi, questionnairesbyidApi } from "../../Services/Fetch";


export const fetchQuestionnaire = async (id, setQuestionnaire) => {
    try {
      const response = await fetch(questionnairesbyidApi + id);
      if (response.ok) {
        const data = await response.json();
        setQuestionnaire(data);
      } else {
        console.error("Error al obtener el cuestionario:", response.statusText);
      }
    } catch (error) {
      console.error("Error al obtener el cuestionario:", error);
    }
  };

export const saveQuestionnaire = async (questionnaire, editing, id, navigate, setLoading) => {
    try {
      if (editing) {
        const response = await fetch(questionnairesbyidApi + id, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(questionnaire),
        });
  
        if (response.ok) {
          const data = await response.json();
          navigate("/managequestionnaire");
          return { success: data.success };
        } else {
          const data = await response.json();
          setLoading(false);
          return { error: data.error };
        }
      } else {
        const response = await fetch(questionnairesApi, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(questionnaire),
        });
  
        if (response.ok) {
          const data = await response.json();
          navigate("/managequestionnaire");
          return { success: data.success };
        } else {
          const data = await response.json();
          setLoading(false);
          return { error: data.error };
        }
      }
    } catch (error) {
      console.error("Error al guardar el cuestionario:", error);
      return { error: "Error al guardar el cuestionario." };
    }
  };
  