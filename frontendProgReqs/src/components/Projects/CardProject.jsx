/* eslint-disable react/prop-types */


const CardProject = ({ projects, handleDelete, navigate }) => {
  return (
      <div className="relative">
        <div className="container p-8 mx-auto">
          <div className="">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">
            Lista de proyectos
          </h1>
          {projects.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {projects.map((project) => (
                <div key={project.id}>
                  <div className="bg-white rounded shadow p-4 transition duration-300 ease-in-out transform hover:scale-105 bg-opacity-75">
                    <h2 className="text-lg font-semibold mb-2 truncate text-gray-900">
                      {project.name}
                    </h2>
                    <p className="text-sm text-gray-700 mb-4 truncate">
                      {project.description}
                    </p>
                    <div className="flex space-x-2">
                      <button
                        className="w-full text-white py-2 rounded transition duration-300 ease-in-out"
                        onClick={() => navigate(`/projects/${project.id}`)}
                        style={{ backgroundColor: "#2c3e50" }}
                        onMouseOver={(e) =>
                          (e.target.style.backgroundColor = "#465669")
                        }
                        onMouseLeave={(e) =>
                          (e.target.style.backgroundColor = "#2c3e50")
                        }
                      >
                        Ver
                      </button>

                      <button
                        className="w-full bg-yellow-600 text-white py-2 rounded hover:bg-yellow-700 transition duration-300 ease-in-out"
                        onClick={() => navigate(`/projects/${project.id}/edit`)}
                      >
                        Editar
                      </button>
                      <button
                        className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition duration-300 ease-in-out"
                        onClick={() => handleDelete(project.id)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-lg mb-4 text-white">No hay proyectos</p>
          )}
          </div>
      </div>
      </div>    
  );
};

export default CardProject;
