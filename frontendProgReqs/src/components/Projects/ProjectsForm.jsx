/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { XCircleIcon } from "@heroicons/react/24/outline";

const ProjectForm = ({
  editing,
  handleSubmit,
  handleChange,
  loading,
  project,
}) => {
  return (
    <section className="flex items-center justify-center text-white md:p-44">
      <div className="w-96 bg-white rounded shadow-lg max-w-md p-8 space-y-6 bg-opacity-75 relative">
        <Link to="/listsprojects" className="absolute top-2 right-2">
          <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
            <XCircleIcon className="h-6 w-6" />
          </button>
        </Link>
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl mb-4 font-semibold text-center text-indigo-950">
              {editing ? "Editar proyecto" : "Crear proyecto"}
            </h1>
          </div>
          <form onSubmit={handleSubmit} className="w-full space-y-4">
            <input
              type="text"
              placeholder="Nombre del proyecto"
              className="p-3 rounded border w-full focus:outline-none focus:border-indigo-950 text-black"
              autoFocus
              name="name"
              value={project.name}
              onChange={handleChange}
              required
            />
            <textarea
              placeholder="Descripción del proyecto"
              className="p-3 rounded border w-full h-24 focus:outline-none focus:border-indigo-950 text-black"
              rows={4}
              name="description"
              value={project.description}
              onChange={handleChange}
              required
            />
            <button
              type="submit"
              className="text-white font-bold py-3 rounded w-full transition duration-300 ease-in-out"
              disabled={loading}
              style={{ backgroundColor: "#2c3e50" }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#465669")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#2c3e50")}
            >
              {editing ? "Guardar cambios" : "Guardar"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ProjectForm;
