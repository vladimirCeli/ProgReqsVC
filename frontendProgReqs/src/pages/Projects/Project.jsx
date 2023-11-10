import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import RequireIdentify from "../../components/RequireIdentify";
import { projectspost, projectsbyid } from "../../Services/Fetch";
import ProjectForm from "../../components/Projects/ProjectsForm";
import useToast from "../../hooks/useToast";

const Project = () => {
  const { toast } = useToast();
  const { auth } = useAuth();
  const [user, setUser] = useState(null);
  const [project, setProject] = useState({
    name: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const loadProject = async (id) => {
      try {
        const response = await fetch(projectsbyid + id);
        if (response.ok) {
          setProject(await response.json());
        } else {
          navigate("/listsprojects");
        }
        setEditing(true);
      } catch (error) {
        console.error("Error al cargar los proyectos:");
      }
    };

    const loadUser = async () => {
      const person = await RequireIdentify(auth.username);
      console.log("PERSONA: " + person);
      if (person !== null) {
        setUser(person);
      } else {
        setUser(null);
      }
    };
    loadUser();

    if (params.id) {
      loadProject(params.id);
    }
  }, [auth.username, navigate, params.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    if (editing) {
      const response = await fetch(projectsbyid + params.id, {
        method: "PUT",
        body: JSON.stringify(project),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } else {
      if (user !== null) {
        const project2 = { ...project, person_id: user };
        const response = await fetch(projectspost, {
          method: "POST",
          body: JSON.stringify(project2),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (response.ok) {
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      } else {
        console.log("No se pudo obtener el ID de la persona.");
      }
    }
    setLoading(false);
    navigate("/listsprojects");
  };

  const handleChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  return (
    <ProjectForm
      editing={editing}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      loading={loading}
      project={project}
    />
  );
};

export default Project;
