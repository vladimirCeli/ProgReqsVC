import { useEffect, useState } from "react";
import { Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import getPerson from "../../components/RequireIdentify";
import { projectsbypersonid, projectsbyid } from "../../Services/Fetch";
import CardProject from "../../components/Projects/CardProject";

const ProjectsList = () => {
  const [user, setUser] = useState(null);
  const { auth } = useAuth();

  useEffect(() => {
    const loadUser = async () => {
      const person = await getPerson(auth.username);
      if (person !== null) {
        setUser(person);
      } else {
        setUser(null);
      }
    };
    loadUser();
  }, [auth.username]);

  const handleDelete = async (id) => {
    try {
      await fetch(projectsbyid + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      loadProjects(user);
    } catch (error) {
      console.log(error);
    }
  };

  const [projects, setProjects] = useState([]);

  const navigate = useNavigate();

  const loadProjects = async (id) => {
    const res = await fetch(projectsbypersonid + id);
    setProjects(await res.json());
  };
  useEffect(() => {
    if (user !== null) {
      loadProjects(user);
    }
  }, [user]);
  return (
    <Container maxWidth="lg" style={{ marginTop: "20px" }}>
      <h1>Lista de proyectos</h1>
      <Typography variant="h6" sx={{ mb: 2 }}></Typography>
      <CardProject
        projects={projects}
        handleDelete={handleDelete}
        navigate={navigate}
      />
    </Container>
  );
};

export default ProjectsList;
