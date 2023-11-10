import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useToast from "../../hooks/useToast";
import ContainerEle from "../../components/ContainerEle";

import {
  responseApiId,
  questionnairesbyidApi,
  getResponseByProjectIdApi,
} from "../../Services/Fetch";

import BoxResponses from "../../components/ListResponses/BoxResponses";
import DeleteConfirmationModal from "../../components/Modal/DeleteConfirmationModal";

const ListResponses = () => {
  const { toast } = useToast();
  const { id1, id2 } = useParams();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [responseToDeleteId, setResponseToDeleteId] = useState(null);

  const handleDeleteConfirmation = (id) => {
    setResponseToDeleteId(id);
    setDeleteModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(responseApiId + id, {
        method: "DELETE",
      });
      if (res.ok) {
        const data = await res.json();
        toast.success(data.message);
        setDeleteModalOpen(false);
      } else {
        const data = await res.json();
        toast.error(data.message);
        setDeleteModalOpen(false);
      }
      loadResponses();
    } catch (error) {
      console.log(error);
    }
  };

  const [response, setResponse] = useState([]);
  const [questionnaire, setQuestionnaire] = useState([]);

  const navigate = useNavigate();

  const loadQuestionnaire = async () => {
    const res = await fetch(questionnairesbyidApi + id1);
    setQuestionnaire(await res.json());
  };

  const loadResponses = async () => {
    const res = await fetch(`${getResponseByProjectIdApi + id2}/${id1}`);
    setResponse(await res.json());
  };

  useEffect(() => {
    loadResponses();
    loadQuestionnaire();
  }, []);

  return (
    <div className="container mx-auto px-4 text-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Cuestionario: {questionnaire.name}
      </h1>

      <BoxResponses
        response={response}
        handleDelete={handleDeleteConfirmation}
        id1={id1}
        id2={id2}
        navigate={navigate}
      />

      <DeleteConfirmationModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onDelete={() => handleDelete(responseToDeleteId)}
      />
    </div>
  );
};

export default ListResponses;
